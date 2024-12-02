import express from "express";
import PetController from "../controller/PetController";
import { AppDataSource } from "../config/dataSource";
import PetRepository from "../repositories/PetRepository";

const router = express.Router();

// Instanciar o repositório e o controlador
const petRepository = new PetRepository(
    AppDataSource.getRepository("PetEntity"),
    AppDataSource.getRepository("AdotanteEntity")
);
const petController = new PetController(petRepository);

// Ajustar as rotas para evitar problemas de contexto e tipo
router.post("/", async (req, res) => petController.criaPet(req, res));
router.get("/", async (req, res) => petController.listaPets(req, res));
router.put("/:id", async (req, res) => petController.atualizaPet(req, res));
router.delete("/:id", async (req, res) => petController.deletaPet(req, res));

// Corrigir a rota de adoção de pet
router.put("/:pet_id/:adotante_id", async (req, res) => {
  petController.adotaPet(req, res);
});
router.get("/filtro", async (req, res) => {
  petController.buscaPetPorCampoGenerico(req, res)
});

export default router;
