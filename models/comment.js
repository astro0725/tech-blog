module.exports = (sequelize, DataTypes) => {
  class Comment extends sequelize.Sequelize.Model {}
  Comment.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    post_id: DataTypes.INTEGER, 
    user_id: DataTypes.INTEGER, 
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Comment',
    timestamps: true,
  });
  Comment.associate = models => {
    Comment.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
    Comment.belongsTo(models.Post, {
      foreignKey: 'post_id',
    });
  };
  return Comment;
};