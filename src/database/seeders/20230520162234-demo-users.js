/* eslint-disable no-unused-vars */
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: uuidv4(),
          name: 'John Doe',
          email: 'john@gmail.com',
          password: 'defaultpassword',
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          name: 'Anon',
          email: 'anon@gmail.com',
          password: 'defaultpassword',
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {});
  },
};
