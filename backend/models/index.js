const { Sequelize, DataTypes } = require("sequelize");
const config =
  require("../config/config")[process.env.NODE_ENV || "development"];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
  }
);

const PricingConfig = sequelize.define(
  "PricingConfig",
  {
    distance_base_price: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    distance_additional_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    time_multiplier_factor: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    waiting_charges: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    created_by: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    updated_by: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

const Log = sequelize.define(
  "Log",
  {
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    actor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

sequelize.sync({ force: false }).then(() => {
  console.log("Database synchronized");
});

module.exports = { PricingConfig, Log, sequelize };
