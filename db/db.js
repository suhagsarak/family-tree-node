const DB_CONFIG = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize =
  new Sequelize(
    DB_CONFIG.DB,
    DB_CONFIG.USER,
    DB_CONFIG.PASSWORD,
    {
      host: DB_CONFIG.HOST,
      dialect: DB_CONFIG.dialect,
      // operatorsAliases: false,
      pool: {
        max: DB_CONFIG.pool.max,
        min: DB_CONFIG.pool.min,
        acquire: DB_CONFIG.pool.acquire,
        idle: DB_CONFIG.pool.idle
      }
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.individuals = require("../model/individuals.model")(sequelize, Sequelize);
db.roles = require("../model/roles.model")(sequelize, Sequelize);
db.families = require("../model/families.model")(sequelize, Sequelize);
db.relations = require("../model/relations.model")(sequelize, Sequelize);

db.families.belongsTo(db.individuals, { foreignKey: 'family_head_id' });

db.relations.belongsTo(db.individuals, { foreignKey: 'individual_id_1' });
db.relations.belongsTo(db.individuals, { foreignKey: 'individual_id_2' });
db.relations.belongsTo(db.roles, { foreignKey: 'individual_1_role_code' });
db.relations.belongsTo(db.roles, { foreignKey: 'individual_2_role_code' });

module.exports = db;