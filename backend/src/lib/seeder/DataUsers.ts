import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@thundermiracle.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Daniel",
    email: "daniel@thundermiracle.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Jane",
    email: "jane@thundermiracle.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
