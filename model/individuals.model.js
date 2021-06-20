module.exports = (sequelize, Sequelize) => {
    const Individual = sequelize.define("individual", {
        individual_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        gender: {
            type: Sequelize.STRING
        },
        date_of_birth: {
            type: Sequelize.DATE
        },
        place_of_birth: {
            type: Sequelize.STRING
        },
        individual_details: {
            type: Sequelize.STRING
        },
        date_of_death: {
            type: Sequelize.DATE
        }
    }, {
        timestamps: false
    });
    return Individual;
};