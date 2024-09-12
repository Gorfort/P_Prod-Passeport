import { Sequelize, DataTypes } from "sequelize";
import { UserModel } from "../models/userModel.mjs";
import bcrypt from "bcrypt";
 
const sequelize = new Sequelize(
  "DB_Test1", // Nom de la DB qui doit exister
  "root", // Nom de l'utilisateur
  "root", // Mot de passe de l'utilisateur
  {
    host: "localhost",
    port: "6033",
    dialect: "mysql",
    logging: false,
  }
);
const User = UserModel(sequelize, DataTypes);
 
let initDb = () => {
  return sequelize
    .sync({ force: true }) // Force la synchro => donc supprime les données également
    .then((_) => {
      createUser("Alice", bcrypt.hashSync("alicespassword", 10));
      createUser("Bob", bcrypt.hashSync("bobspassword", 10));
      createUser("Charlie", bcrypt.hashSync("charliespassword", 10));
    });
};
 
export const createUser = (username, pwdHash) => {
  User.create({ username: username, password: pwdHash, admin: false });
};
 
export const getUser = async (username) => {
  return await User.findOne({
    where: {
      username: username,
    },
  });
};
 
initDb();