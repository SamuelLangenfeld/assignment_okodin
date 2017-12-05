'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    let gender = num => (num % 2 === 0 ? 'male' : 'female');
    let married = num =>
      num % 3 === 0 ? 'single' : num % 3 === 1 ? 'dating' : 'married';
    let age = num => 20 * num;
    var profiles = [];
    for (let i = 0; i < 10; i++) {
      profiles.push({
        description: `Nice`,
        talents: `juggling`,
        favorites: `fake data`,
        why: `am god`,
        gender: gender(i),
        marital: married(i),
        height: '100 feet',
        body: 'like a god',
        kids: 'zero',
        occupation: 'god',
        age: age(i),
        userId: i + 1,
      });
    }
    return queryInterface.bulkInsert('Profiles', profiles);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {}, models.User);
  },
};