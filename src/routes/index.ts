import { Router, Request, Response } from "express";
import eventoRoutes from './eventoRoutes';

const routes = Router();

// Rotas de despesas
routes.use("/eventos", eventoRoutes);

export default routes;