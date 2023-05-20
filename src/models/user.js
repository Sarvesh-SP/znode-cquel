const { Model, Op } = require('sequelize');
const { passwordGen, validatePassword } = require('../utils/user.util');
const { createJWTToken } = require('../utils/token.util');
const { roles } = require('../config/roles');

const PROTECTED_ATTR = ['password'];

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    /**
     * Check if email is taken
     * @param {string} email - The user's email
     * @param {UUIDV4} [excludedUserId] - The id of the user to be excluded
     * @returns {Promise<boolean>}
     */
    static async isEmailTaken(email, excludedUserId) {
      const user = await this.findOne({
        where: {
          email,
          id: {
            [Op.ne]: excludedUserId,
          },
        },
      });

      return !!user;
    }

    static associate({ Token }) {
      // define association here

      this.hasMany(Token, {
        foreignKey: 'user_id',
        as: 'tokens',
      });
    }

    toJSON() {
      const attributes = { ...this.get() };

      PROTECTED_ATTR.forEach((a) => delete attributes[a]);

      return attributes;
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM(roles),
        defaultValue: 'user',
      },
      profile: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      hooks: {
        beforeCreate: passwordGen,
        beforeUpdate: passwordGen,
      },
    }
  );

  // Method to generate token
  User.prototype.tokenGen = async function () {
    const user = this;
    const payload = { id: user.id };
    const token = createJWTToken(payload);

    // One:Many relation with Token table
    const userToken = await user.createToken({
      token,
    });

    return userToken;
  };

  /**
   * Compare Login Password
   * @param {string} password - The user's email
   * @param {UUIDV4} [excludedUserId] - The id of the user to be excluded
   * @returns {Promise<boolean>}
   */
  User.prototype.checkPassword = async function (password) {
    return validatePassword(password, this.password);
  };

  return User;
};
