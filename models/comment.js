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
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Post',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Comment',
    tablename: 'comment',
    freezeTableName: true,
    timestamps: true,
  });
  Comment.associate = models => {
    Comment.belongsTo(models.User, {
      foreignKey: 'user_id',
    });
    Comment.belongsTo(models.Post, {
      foreignKey: 'post_id',
    });
  };
  return Comment;
};