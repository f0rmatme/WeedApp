module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "post",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: DataTypes.INTEGER,
      weedId: DataTypes.INTEGER,
      content: DataTypes.STRING,
      tags: DataTypes.STRING
    },
    {
      freezeTableName: true
    }
  );

  Post.associate = models => {
    Post.belongsTo(models.user);
    Post.belongsTo(models.weed);
    Post.hasMany(models.comment);
    Post.hasMany(models.like);
  };

  return Post;
};
