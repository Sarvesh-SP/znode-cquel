const { Model } = require('sequelize');
const { ACCESS, REFRESH, RESET_PASSWORD, VERIFY_EMAIL } = require('../config/tokens');

module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, {
        as: 'user',
        foreignKey: 'user_id',
      });
    }
  }
  Token.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM(ACCESS, REFRESH, RESET_PASSWORD, VERIFY_EMAIL),
        allowNull: false,
      },
      expires: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      blacklisted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Token',
      tableName: 'tokens',
    }
  );
  return Token;
};
