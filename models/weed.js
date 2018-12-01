module.exports = (sequelize, DataTypes) => {
  const Weed = sequelize.define('weed', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      strain: DataTypes.STRING,
	  thc: DataTypes.DOUBLE,
	  cbd: DataTypes.DOUBLE,
	  company: DataTypes.STRING,
	  pictureUrl: DataTypes.STRING,
    },
    {
      freezeTableName: true,
    }
  );

  return Weed;
}