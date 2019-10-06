module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    bio: DataTypes.STRING,
    profilepic: DataTypes.STRING
  }, {
    freezeTableName: true,
    });

  //Might use Bcrypt later if we really wanna use actual passwords and not google oauth

  User.associate = (models) => {
    User.hasMany(models.post);
    User.hasMany(models.friend);
  };

  return User;
}
