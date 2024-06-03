import {DataTypes, Model} from "sequelize";
import {SequelizeConnection} from "../services/sequelize";
import City from "./city";

export default class User extends Model {
    declare id: number;
    declare email: string;
    declare firstName: string;
    declare lastName: string;
    declare birthdate: Date;
}
const sequelizeConnection = SequelizeConnection.getInstance();
User.init(
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
        firstName: {
            field: 'first_name',
            type: DataTypes.STRING,
        },
        lastName: {
            field: 'last_name',
            type: DataTypes.STRING,
        },
        birthdate: {
            field: 'birthdate',
            type: DataTypes.DATE,
        },
    },
    {
        timestamps: false,
        sequelize:  sequelizeConnection,
        tableName: "users",
        modelName: "User",
    },
);

User.belongsTo(City, {
    foreignKey: "cityId",
});

City.hasMany(User, {
    sourceKey: "id",
    foreignKey: "cityId",
});

User.sync().then();
