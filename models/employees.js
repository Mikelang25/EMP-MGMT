
module.exports = function (sequelize, DataTypes) {
    var Employee = sequelize.define('Employee', {
    
      emp_fname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      emp_lname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      emp_email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      emp_pay: {
        type: DataTypes.INTEGER,
        allowNull: false
      },      
      emp_hire_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      emp_photo: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "noimage.png"
      }
    })
  
    Employee.associate = function(models) {
      Employee.hasMany(models.Issue, {
        onDelete: "cascade"
      });
  
    };
    return Employee
  }
  