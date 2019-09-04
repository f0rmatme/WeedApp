module.exports = (sequelize, DataTypes) => {
  const Weed = sequelize.define(
    "weed",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      weedName: DataTypes.STRING,
      strain: DataTypes.STRING,
      thc: DataTypes.STRING,
      cbd: DataTypes.STRING,
      company: DataTypes.STRING,
      pictureUrl: DataTypes.STRING
    },
    {
      freezeTableName: true
    }
  );

  return Weed;
};
