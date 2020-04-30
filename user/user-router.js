const router = require('express').Router();
const Users = require('../auth/auth-model.js');
const authenticate = require('../auth/authenticate-middleware.js');

router.get('/:id',  (req,res) => {
    const id = req.params.id;
   
  try{
    Users.findById(id).then(response => res.send(response));
  } catch{
    res.status(500).json({message: 'an error has occurred'})
  }
})
router.get('/:id/strains',  (req,res)  =>{
  
    let id = req.params.id;
        
    try{Users.getSavedStrains(id)
        .then(strain =>  {  res.status(200).send(strain)})}
     catch{res.status(500).json({message: 'error'})};
        
})

router.post('/:id/strains', authenticate, (req,res) =>{
    
    try{
        const id = req.params.id;
    const strain = Users.saveStrain({
        user: id,
        strain: '{}'
    });
  return  res.status(200).json(strain)
} catch{
  return  res.status(500).json({message: 'an error has occurred'})
}
})

router.put('/:id', authenticate, (req,res) => {
   
    try{
        const id = req.params.id;
        const user = Users.update(id, {
            name: req.body.name,
            password: req.body.password,
            email: req.body.email
        });
        res.status(200).json(user)
    } catch {
        res.status(500).json({ message: 'an error has occurred'})
    }
})

router.delete('/:id', async (req, res) =>{
    try{
        const id = req.params.id;
        const deleteUser =  await Users.remove(id); 
        if (deleteUser) res.status(200).json({ message: "user deleted"})
    } catch{
      return  res.status(500).json({ message: 'an error has occurred'})
    }
})


module.exports = router;