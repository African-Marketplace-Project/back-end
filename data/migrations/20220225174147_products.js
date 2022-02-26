exports.up = function (knex) {
    return knex.schema.createTable('product', product => {
        product.increments();

        product.string('name', 128)
            .notNullable()

        product.string('description', 500)

        product.string('city', 50)
            .notNullable()

        product.float('price')
            .notNullable()

        product.integer('user_id')
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
