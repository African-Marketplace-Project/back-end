exports.up = function (knex) {
    return knex.schema.createTable('product', item => {
        item.increments();

        item.string('name', 128)
            .notNullable()

        item.string('description', 1500)

        item.string('city', 50)
            .notNullable()

        item.float('price')
            .notNullable()

        item.integer('user_id')
            .notNullable()
            .unsigned()
            .references('id') //references the id column in the user table
            .inTable('user')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('product');
};
