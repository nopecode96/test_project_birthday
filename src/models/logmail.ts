import { Model, DataTypes } from "sequelize";
import { SequelizeConnection } from "../services/sequelize";
import User from "./user";

export default class Logmail extends Model {
    declare id: number;
    declare email: string;
    declare message: string;
    declare type: string;
    declare status: string;
}

const sequelizeConnection = SequelizeConnection.getInstance();
Logmail.init(
    {
        id: {
            field: "id",
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
        },
        email: {
            field: 'email',
            type: DataTypes.STRING,
        },
        message: {
            field: 'message',
            type: DataTypes.TEXT,
        },
        type: {
            field: 'type',
            type: DataTypes.STRING,
        },
        status: {
            field: 'status',
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: false,
        sequelize:  sequelizeConnection,
        tableName: "logmail",
        modelName: "Logmail",
    },
)

Logmail.belongsTo(User, {
    foreignKey: "userId",
});

User.hasMany(Logmail, {
    sourceKey: "id",
    foreignKey: "userId",
});

Logmail.sync().then();
