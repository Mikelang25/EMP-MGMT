module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        user_pw: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      user_un: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      }
    })

    return User
  }
  