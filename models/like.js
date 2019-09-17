module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define(
    "like",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER
    },
    {
      freezeTableName: true
    }
  );

  Like.associate = models => {
    Like.belongsTo(models.post);
    Like.belongsTo(models.user);
  };

  return Like;
};
