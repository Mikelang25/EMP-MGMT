module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
    
      user_fname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      user_lname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      user_email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
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
  
    User.associate = function(models) {
      User.hasMany(models.Issue, {
        onDelete: "cascade"
      });
  
    };
    return User
  }
  