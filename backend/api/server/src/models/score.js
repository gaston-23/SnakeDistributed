'use strict';
module.exports = (sequelize, DataTypes) => {
  const Score = sequelize.define('Score', {
    user_id: DataTypes.BIGINT,
    score: DataTypes.BIGINT,
  },
  {
    tableName: 'scores',
    freezeTableName: true,
    paranoid: true,
    underscored: true
  });

  Score.associate = function(models) {
    
    Score.hasOne(models.User, {
      foreignKey: 'user_id'
    });

  };

  Score.prototype.getResource = function() {
    
    let user;
    
    if (this.User) {
      user = this.User.getResource();
    }

    return {
      type: 'scores',
      id: this.id,
      attributes: {
        score: this.score,
        name: user.name
      }
    }
  }

  return Score;
};