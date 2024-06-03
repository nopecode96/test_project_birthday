import { DataTypes, Model } from "sequelize";
import { SequelizeConnection } from "../services/sequelize";

export default class Province extends Model {
    declare id: number;
    declare name: string;
}

const sequelizeConnection = SequelizeConnection.getInstance();
Province.init(
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
        tableName: "provincies",
        modelName: "Province",
    },
)

Province.sync().then();


