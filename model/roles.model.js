module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("role", {
        role_code: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        role_name: {
            type: Sequelize.STRING
        },
        role_description: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    });
    return Role;
};