module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "comment",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
      comment: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      freezeTableName: true
    }
  );

  Comment.associate = models => {
    Comment.belongsTo(models.user);
    Comment.belongsTo(models.post);
  };

  return Comment;
};
