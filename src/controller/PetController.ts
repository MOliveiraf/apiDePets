import { Request, Response } from "express";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";
import EnumPorte from "../enum/EnumPorte";

export default class PetController {
    constructor(private repository: PetRepository) {}

    async criaPet(req: Request, res: Response): Promise<void> {
        const { adotado, especie, nome, dataDeNascimento, porte } = req.body;

        if (
            adotado === undefined ||
            !especie ||
            !nome ||
            !dataDeNascimento
        ) {
            res.status(400).json({ erro: "Todos os campos são obrigatórios." });
            return;
        }

        if (!Object.values(EnumEspecie).includes(especie)) {
            res.status(400).json({ error: "Espécie inválida" });
            return;
        }
        if (porte && !(porte in EnumPorte)) {
            res.status(400).json({ error: "Porte inválido" });
            return;
        }

        try {
            const novoPet = new PetEntity(
                nome,
                especie,
                new Date(dataDeNascimento),
                adotado,
                porte // Inclua o porte aqui
            );

            const petCriado = await this.repository.criaPet(novoPet);
            res.status(201).json({
                message: "Pet criado com sucesso!",
                pet: petCriado,
            });
        } catch (error) {
            res.status(500).json({ error: "Erro ao criar o pet." });
        }
    }

    async listaPets(req: Request, res: Response): Promise<void> {
        try {
            const listaDePets = await this.repository.listaPet();
    
            // Reordenar as propriedades dos objetos
            const petsReordenados = listaDePets.map((pet) => ({
                id: pet.id, // Coloca o id primeiro
                nome: pet.nome,
                especie: pet.especie,
                porte: pet.porte, // Inclua o porte aqui
                dataDeNascimento: pet.dataDeNascimento,
                adotado: pet.adotado,
            }));
    
            res.status(200).json(petsReordenados);
        } catch (error) {
            res.status(500).json({ error: "Erro ao listar os pets." });
        }
    }

    async atualizaPet(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const { success, message } = await this.repository.atualizaPet(
                Number(id),
                req.body as PetEntity
            );

            if (!success) {
                res.status(404).json({ message });
                return;
            }

            res.status(200).json({
                message: "Pet atualizado com sucesso!",
            });
        } catch (error) {
            res.status(500).json({ error: "Erro ao atualizar o pet." });
        }
    }

    async deletaPet(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const { success, message } = await this.repository.deletaPet(Number(id));

            if (!success) {
                res.status(404).json({ message });
                return;
            }

            res.status(200).json({
                message: "Pet deletado com sucesso!",
            });
        } catch (error) {
            res.status(500).json({ error: "Erro ao deletar o pet." });
        }
    }

    async adotaPet(req: Request, res: Response) {
        const { pet_id, adotante_id } = req.params;

        const { success, message } = await this.repository.adotaPet(
            Number(pet_id), 
            Number(adotante_id)
        );

        if (!success) {
            return res.status(404).json({ message });
        }
        return res.sendStatus(204);
    }

    async buscaPetPorCampoGenerico(req: Request, res: Response) {
        const { campo, valor } = req.query;
        const listaDePets = await this.repository.buscaPetPorCampoGenerico(
            campo as keyof PetEntity,
            valor as string
        );
        return res.status(200).json(listaDePets);
    }
}
