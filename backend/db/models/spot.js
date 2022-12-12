'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, {foreignKey: 'ownerId', as: "Owner"})
      Spot.hasMany(models.Booking, {foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true})
      Spot.hasMany(models.Review, {foreignKey: 'spotId',onDelete: 'CASCADE', hooks: true})
      Spot.hasMany(models.Image, {foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true, as: 'Images'})
    }
  }
  Spot.init({
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    city:{
    type: DataTypes.STRING,
    allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
    lng: {
      type: DataTypes.INTEGER,

    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tagA: {
      type: DataTypes.TEXT,
      allowNull: true,
      // defaultValue: [],
    },
    tagB: {
      type: DataTypes.TEXT,
      allowNull: true,
      // defaultValue: [],
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    previewImage:
    {
      type: DataTypes.TEXT
    },
    // image: {
    //   type: DataTypes.TEXT,
    //   allowNull:true
    // }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
