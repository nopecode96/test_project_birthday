import { DataTypes, Model } from "sequelize";
import { SequelizeConnection } from "../services/sequelize";
import Province from "./province";

export default class City extends Model {
    declare id: number;
    declare name: string;
}

const sequelizeConnection = SequelizeConnection.getInstance();

City.init(
    {
        id: {
            field: "id",
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            field: 'name',
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: false,
        sequelize:  sequelizeConnection,
        tableName: "cities",
        modelName: "City",
    },
);

City.belongsTo(Province, {
    foreignKey: "provinceId",
});

Province.hasMany(City, {
    sourceKey: "id",
    foreignKey: "provinceId",
});

City.sync().then();
