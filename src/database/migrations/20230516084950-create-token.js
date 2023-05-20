const { ACCESS, REFRESH, RESET_PASSWORD, VERIFY_EMAIL } = require('../../config/tokens');
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('tokens', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id',
        },
      },
      type: {
        type: DataTypes.ENUM(ACCESS, REFRESH, RESET_PASSWORD, VERIFY_EMAIL),
      },
      expires: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      blacklisted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, _DataTypes) {
    await queryInterface.dropTable('tokens');
  },
};
