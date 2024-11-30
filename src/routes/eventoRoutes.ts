import { Router } from "express";
import controller from "../controllers/EventoController";

const routes = Router();

routes.post("/", controller.create.bind(controller));    // Criar uma despesa
routes.get("/", controller.list.bind(controller));      // Listar todas as despesas
routes.put("/", controller.update.bind(controller));    // Atualizar uma despesa
routes.delete("/", controller.delete.bind(controller)); // Excluir uma despesa

export default routes