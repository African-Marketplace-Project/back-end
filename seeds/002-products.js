
exports.seed = function (knex) {
  return knex('product').del()
    .then(function () {
      return knex('product').insert([
        { name: "necklace", description: 'Handmade necklace created by the artist in her home studio, using locally sourced beads.', city: " Africa ",  "price": 15.00, "user_id": 1 },
        { name: "Earrings", description: 'Handmade earrings, each piece is unique and uses locally sourced materials', city: " Africa", "price": 25.00, "user_id": 2 },
        { name: "Shawl", description: 'Handknit shawl, made using 100% sheeps wool from a local farm.', city: "Africa", "price": 15.00 , "user_id": 3 }
      ]);
    });
};
