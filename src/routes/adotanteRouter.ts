import express, { Request, Response, NextFunction } from "express"; // Importe os tipos do Express
import AdotanteController from "../controller/AdotanteController";
import AdotanteRepository from "../repositories/AdotanteRepository";
import { AppDataSource } from "../config/dataSource";
import AdotanteEntity from "../entities/AdotanteEntity";

const router = express.Router();

// Inicializar o repositório com a entidade correta
const adotanteRepository = new AdotanteRepository(
  AppDataSource.getRepository(AdotanteEntity)
);

// Inicializar o controlador
const adotanteController = new AdotanteController(adotanteRepository);

// Helper para tratar erros de forma consistente
const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Rotas
router.post(
  "/",
  asyncHandler((req: Request, res: Response) => adotanteController.criaAdotante(req, res))
);

router.get(
  "/",
  asyncHandler((req: Request, res: Response) => adotanteController.listaAdotantes(req, res))
);

router.put(
  "/:id",
  asyncHandler((req: Request, res: Response) => adotanteController.atualizaAdotante(req, res))
);

router.delete(
  "/:id",
  asyncHandler((req: Request, res: Response) => adotanteController.deletaAdotante(req, res))
);

router.patch(
  "/:id",
  asyncHandler((req: Request, res: Response) =>
    adotanteController.atualizaEnderecoAdotante(req, res)
  )
);

export default router;
