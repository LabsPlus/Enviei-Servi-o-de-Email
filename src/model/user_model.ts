import { DataTypes, Model } from "sequelize";
import { database } from "../data-source";
import { IUser } from "../interfaces/user/userInterface";

class User extends Model implements IUser{
  public id!: number;
  public name!: string;
  public company_name!: string;
  public email!: string;
  public email_recovery!: string;
  public password!: string;
  public cpf_cnpj!: string;
  public phone_number!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 45],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email_recovery: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf_cnpj: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
  },
  {
    sequelize: database,
    tableName: "user",
    modelName: "user",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    scopes: {
      defaultScope: {
        attributes: { exclude: ["created_at", "updated_at"] },
      },
    },
  }
);

export default User;
