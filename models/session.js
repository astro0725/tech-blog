module.exports = (sequelize, DataTypes) => {
  class Sessions extends sequelize.Sequelize.Model {}
  Sessions.init({
    sid: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    user_id: DataTypes.INTEGER, 
    expires: DataTypes.DATE,
    data: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Sessions',
    timestamps: true,
  });
  Sessions.associate = models => {
      Sessions.belongsTo(models.User, {
          foreignKey: 'user_id',
      });
    };
  return Sessions;
};