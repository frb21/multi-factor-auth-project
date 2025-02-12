//user schema
require('dotenv').config();
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('MFADB', 'francis', 'francisrey123', {
  host: process.env.DB_HOST || 'localhost',
  dialect: process.env.DB_DIALECT || 'mysql',
});

class User extends Model {}

User.init({
    // model attributes
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    otp: {
      type: DataTypes.STRING,
    }
},
   {
    sequelize,
    modelName: 'User',
   },
);

// check model if initialized correctly
console.log(User === sequelize.models.User);

// sync model with database, create table in the connected database
sequelize.sync()
      .then(() => console.log('User table created successfully'))
      .catch((err) => console.error('Error creating table:', err));





















