const db = require('../data/dbConfig.js');

module.exports = {
    add,
    find,
    findBy,
    findById,
    update,
  remove,
  getStrains,
  getSavedStrains,
  saveStrain,
}
function get(id) {
  let query = db('actions')
}
function find() {
    return db('users').select('id', 'name', 'password', 'email');
  }
  
  function findBy(filter) {
    return db('users').where(filter);
  }
  
 async function add(user) {
    const [id] = await db('users').insert(user, 'id');
  
    return findById(id);
  }
  
  function findById(id) {
    return db('users').where({ id }).first();
  }
  function update(id, changes) {
    return db('users')
      .where('id', id)
      .update(changes)
      .then((count) => (count > 0 ? get(id) : null));
  }

  function remove(id) {
    return db('users').where('id', id).del();
  }

  function getStrains() {
    return db('strains');
}

function getStrainsByAilment() {

}
function saveStrain(strain ) {
  return db('saved_strains')
      .insert(strain,  'user_id')
      .then(ids=>{
        return findById(ids[0])
      })
      
}
function getSavedStrains(userId) {
  return db('users as u')
      .join('saved_strains as s','s.user' ,'=', 'u.id' )
      .select('s.strain')
      .where('s.user',  userId);
}
