module.exports = (sequelize, Sequelize) => {
    const Relation = sequelize.define("relation", {
        relation_code: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        individual_id_1: {
            type: Sequelize.INTEGER
        },
        individual_id_2: {
            type: Sequelize.INTEGER
        },
        individual_1_role_code: {
            type: Sequelize.INTEGER
        },
        individual_2_role_code: {
            type: Sequelize.INTEGER
        },
        relation_name: {
            type: Sequelize.STRING
        },
        relation_description: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    });
    return Relation;
};