
exports.up = function(knex) {
    return knex.schema.createTable('users', users => {
        users.increments();
    
        users.string('username', 100).notNullable().unique();
        users.string('password', 100).notNullable();
        users.string('name', 50).notNullable();
        users.string('email', 100).notNullable();
      });
    };
    
    exports.down = function(knex, Promise) {
      return knex.schema.dropTableIfExists('users');
    };
    