const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('');

class User extends Model {}

User.init({
    // model attributes
    email: {
      type: DataTypes.String,
      unique: true,
      allowNull: false,
    },

    password: {
      type: DataTypes.String,
      allowNull: false,
    },
    
    otp: {
      type: DataTypes.String,
    }
},
   {
    sequelize,
    modelName: 'User',
   },
);

console.log(User === sequelize.models.User);























