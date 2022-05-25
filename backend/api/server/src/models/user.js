'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    password: DataTypes.STRING
  },
  {
    tableName: 'users',
    freezeTableName: true,
    paranoid: true,
    underscored: true
  });

  User.associate = function(models) {
    
    
  };

  User.prototype.getResource = function() {
    
    return {
      type: 'users',
      id: this.id,
      name: this.name
    }
  }
  
  return User;
};