const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Appointment = sequelize.define('Appointment', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    doctorId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'doctors',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    patientId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'patients',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            isDate: true,
        },
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    reason: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('scheduled', 'completed', 'canceled', 'no-show'),
        defaultValue: 'scheduled',
        allowNull: false,
    },
}, {
    timestamps: true,
    tableName: 'appointments',
});

module.exports = Appointment;
