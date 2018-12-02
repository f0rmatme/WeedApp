module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('post', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
    },
    {
      freezeTableName: true,
    }
  );

  Post.associate = (models) => {
    Post.belongsTo(models.user);
	Post.belongsTo(models.weed, {
		foreignKey: 'weedId',
		constraints: false
	});
  };

  return Post;
}