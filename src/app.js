import express from "express";
import cors from "cors";
import authRoutes from "./routers/routes.js";
import testRoutes from "./routers/test.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/test", testRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});