module.exports = (sequelize, Sequelize) => {
    const Family = sequelize.define("family", {
        family_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        family_head_id: {
            type: Sequelize.INTEGER
        },
        familly_name: {
            type: Sequelize.STRING
        },
        familly_description: {
            type: Sequelize.STRING
        },
        familly_date_from: {
            type: Sequelize.DATE
        },
        familly_date_to: {
            type: Sequelize.DATE
        },
        familly_details: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    });
    return Family;
};
