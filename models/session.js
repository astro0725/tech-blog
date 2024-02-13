module.exports = (sequelize, DataTypes) => {
  class Session extends sequelize.Sequelize.Model {}
  Session.init({
    sid: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    user_id: DataTypes.INTEGER, 
    expires: DataTypes.DATE,
    data: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Session',
    tablename: 'session',
    freezeTableName: true,
    timestamps: true,
  });
  Session.associate = models => {
      Session.belongsTo(models.User, {
          foreignKey: 'user_id',
      });
    };
  return Session;
};