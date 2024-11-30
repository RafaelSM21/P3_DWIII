import express from "express";
import dotenv from "dotenv";
import connect from "./models/connection";
import routes from "./routes/eventoRoutes";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));

connect();

app.use("/eventos", routes);

app.use("*", (_, res) => {
    res.status(404).json({ error: "Rota desconhecida" });
});

app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}`);
});