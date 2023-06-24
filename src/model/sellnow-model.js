import sequelize from '../config/connection.js';
import { DataTypes }  from 'sequelize';  
const SellNow= sequelize.define('SellNow', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false
    },
    generation: {
      type: DataTypes.STRING,
       allowNull: false
    },
    productType: {
      type: DataTypes.STRING,
       allowNull: false
    },
    touchScreen: {
      type: DataTypes.STRING,
       allowNull: false
    },
    screenSize: {
      type: DataTypes.STRING,
      allowNull: false
    },
    graphicsCardModel: {
      type: DataTypes.STRING,
        allowNull: false
    },
    ram: {
      type: DataTypes.STRING,
       allowNull: false
    },
    hddCapacity: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ssdCapacity: {
      type: DataTypes.STRING,
      allowNull: true
    },
    message : {
      type: DataTypes.TEXT,
      allowNull: false
    },
    laptopImage: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
        
  }, {
    tableName: 'sellNow',
  });
export default SellNow;