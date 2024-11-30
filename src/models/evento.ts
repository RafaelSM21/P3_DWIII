import mongoose from "mongoose";

const EventoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, "Título do evento é obrigatório."]
  },
  descricao: {
    type: String,
  },
  data: {
    type: Date,
    required: [true, "Horário do evento é obrigatório."]
  },
  local: {
    type: String,
    required: [true, "Local do evento é obrigatório."]
  },
  valor: {
    type: Number,
    required: [true, "Custo do evento é obrigatório."],
    min:[0, "O valor do evento não pode ser negativo"]
  }
});

const Evento = mongoose.model("Evento", EventoSchema);
export default Evento;