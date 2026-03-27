import prisma from "../services/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET = "123456";

export const register = async (req, res) => {
  const { email, password } = req.body;

  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    return res.status(400).json({ message: "Usuário já existe" });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hash,
    },
  });

  res.json(user);
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado" });
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(401).json({ message: "Senha inválida" });
  }

  const token = jwt.sign({ id: user.id }, SECRET, {
    expiresIn: "1d",
  });

  res.json({ token });
};