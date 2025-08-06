import { IAuthDocument } from "@muhammadjalil8481/jobber-shared";
import { Optional, ModelDefined, DataTypes, Model } from "sequelize";
import { sequelize } from "@auth/database/connection";
import { compare, hash } from "bcrypt";

interface AuthModelInstanceMethods extends Model {
  prototype: {
    comparePassword: (
      password: string,
      hashedPassword: string
    ) => Promise<boolean>;
  };
}

type AuthUserCreationAttributes = Optional<
  IAuthDocument,
  | "id"
  | "createdAt"
  | "updatedAt"
  | "passwordResetToken"
  | "passwordResetExpires"
>;

const AuthModel: ModelDefined<IAuthDocument, AuthUserCreationAttributes> &
  AuthModelInstanceMethods = sequelize.define(
  "users",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emailVerificationToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
    passwordResetToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    passwordResetExpires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    indexes: [
      {
        unique: true,
        fields: ["email"],
      },
      {
        unique: true,
        fields: ["username"],
      },
    ],
  }
) as ModelDefined<IAuthDocument, AuthUserCreationAttributes> &
  AuthModelInstanceMethods;

AuthModel.addHook("beforeCreate", async (auth: Model) => {
  const saltRounds = 10;
  const hashedPassword = await hash(auth.dataValues?.password!, saltRounds);
  auth.dataValues.password = hashedPassword;
});

AuthModel.prototype.comparePassword = async function (
  password: string,
  hashedPassword: string
) {
  return compare(password, hashedPassword);
};
export { AuthModel };
