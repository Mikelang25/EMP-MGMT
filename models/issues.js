module.exports = function (sequelize, DataTypes) {
    var Issue = sequelize.define('Issue', {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      issue_short_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      task_day: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      issue_description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1]
        }
      }
     
    })
  
    Issue.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      Issue.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Issue
  }
  