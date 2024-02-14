module.exports = (sequelize, DataTypes) => {
  class Post extends sequelize.Sequelize.Model {}
  Post.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: DataTypes.INTEGER, 
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Post',
    timestamps: true,
  });
  Post.associate = models => {
    Post.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
    Post.hasMany(models.Comment, {
      foreignKey: 'post_id',
      as: 'comments'
    });
  };
  return Post;
};