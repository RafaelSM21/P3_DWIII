import { Request, Response, NextFunction } from "express";
import Evento from "../models/evento";

class EventoController {
    // Create
    public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { titulo, descricao, data, local, valor } = req.body;
        try {
            // Validação da data
            const eventDate = new Date(data);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Ajusta para comparação de data somente

            if (eventDate < today) {
                res.status(400).json({ error: "A data do evento deve ser hoje ou no futuro." });
                return;
            }

            const document = new Evento({ titulo, descricao, data, local, valor });
            const response = await document.save();
            res.json(response);
        } catch (error: any) {
            next(error); // Passa o erro para o middleware de tratamento de erros
        }
    }

    // List
    public async list(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const objects = await Evento.find().sort({ date: -1 });
            res.json(objects);
        } catch (error: any) {
            next(error);
        }
    }

    // Delete
    public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id: _id } = req.body;
        try {
            const object = await Evento.findByIdAndDelete(_id);
            if (object) {
                res.json({ message: "Despesa excluída com sucesso!" });
            } else {
                res.status(404).json({ message: "Registro inexistente!" });
            }
        } catch (error: any) {
            next(error);
        }
    }

    // Update
    
    public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id, titulo, descricao, data, local, valor } = req.body;
        try {
            // Validação da data
            const eventDate = new Date(data);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Ajusta para comparação de data somente

            if (eventDate < today) {
                res.status(400).json({ error: "A data do evento deve ser hoje ou no futuro." });
                return;
            }

            const document = await Evento.findById(id);
            if (!document) {
                res.status(404).json({ message: "Registro inexistente!" });
                return;
            }

            document.titulo = titulo;
            document.descricao = descricao;
            document.data = data;
            document.local = local;
            document.valor = valor;
            const response = await document.save();
            res.json(response);
        } catch (error: any) {
            next(error);
        }
    }
}

export default new EventoController();