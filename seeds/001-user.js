const bcrypt = require("bcryptjs");


exports.seed = function (knex) {
  return knex('user').del()
    .then(function () {
      const hash = bcrypt.hashSync("password", 8); // password is "password"

      return knex('user').insert([
        { email: 'admin@email.com', password: hash, username: "Admin1" },
        { email: 'admin2@email.com', password: hash, username: "Admin2" },
        { email: 'admin3@email.com', password: hash, username: "Admin3" }
      ]);
    });
}