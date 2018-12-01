module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comment', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: false
      },
    },
    {
      freezeTableName: true,
    }
  );

  Comment.associate = (models) => {
	Comment.belongsTo(models.post, {
		foreignKey: 'postId',
		constraints: false
	});
	Comment.belongsTo(models.user, {
		foreignKey: 'userId',
		constraints: false
	});
  };

  return Comment;
}