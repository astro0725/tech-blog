module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {}
  User.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
          unique: true,
          primaryKey: true,
          autoIncrement: true
      },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
  }, {
    sequelize,
    modelName: 'User',
    tablename: 'user',
    timestamps: true,
  });
  User.associate = models => {
    User.hasMany(models.Session, { 
      foreignKey: 'user_id', 
    });
    User.hasMany(models.Post, {
      foreignKey: 'user_id',
      as: 'posts'
    });
    User.hasMany(models.Comment, {
      foreignKey: 'user_id',
      as: 'comments'
    });
    };
  return User;
};