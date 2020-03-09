module.exports = function (sequelize, DataTypes) {
    var Issue = sequelize.define('Issue', {
      employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      issue_short_descr: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      issue_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      issue_full_descr: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      confirm_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          len: [1]
        }
      }     
    })
  
    Issue.associate = function(models) {
      Issue.belongsTo(models.Employee, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Issue
  }
  