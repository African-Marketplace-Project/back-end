
exports.up = function (knex) {
    return knex.schema.createTable('user', user => {
        user.increments();

        user
            .string('email', 128)
            .notNullable()
            .unique();

        user
            .string('username', 128)
            .notNullable();

        user.string('password', 128)



    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('user');
};