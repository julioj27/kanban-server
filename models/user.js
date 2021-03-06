'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Organization);
      User.hasMany(models.Task);
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Name is required`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: `Email has been registered`
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Email must be fill with valid format'
        },
        notEmpty: {
          args: true,
          msg: `Email is required`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Password is required`
        }
      }
    },
    OrganizationId: {
      type: DataTypes.INTEGER
    }
  }, {
    hooks: {
      beforeCreate: (user) => {
        user.password = hashPassword(user.password);
        user.OrganizationId = 1;
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};