const config = require("config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  config.get('db'),
  config.get('user'),
  config.get('password'),
  {
    host: config.get('host'),
    dialect: config.get('dialect'),
    // operatorsAliases: false,
    pool: {
      max: config.get('pool.max'),
      min: config.get('pool.min'),
      acquire: config.get('pool.acquire'),
      idle: config.get('pool.idle')
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