import { Request, Response } from "express";
import AdotanteRepository from "../repositories/AdotanteRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnderecoEntity from "../entities/Endereco";

export default class AdotanteController {
  constructor(private repository: AdotanteRepository) {}

  async criaAdotante(req: Request, res: Response): Promise<void> {
    console.log("Corpo da requisição recebido:", req.body);

    const { nome, celular, endereco, foto, senha } = req.body;

    if (!nome || !senha || !celular) {
      res.status(400).json({ erro: "Os campos nome, senha e celular são obrigatórios." });
      return;
    }

    const novoAdotante = new AdotanteEntity(
      nome,
      senha,
      celular,
      foto || "",
      endereco || undefined
    );

    console.log("Novo adotante criado:", novoAdotante);

    try {
      await this.repository.criaAdotante(novoAdotante);
      console.log("Adotante salvo com sucesso!");
      res.status(201).json(novoAdotante); // Envia a resposta
    } catch (error) {
      console.error("Erro ao salvar adotante:", error);
      res.status(500).json({ error: "Erro ao salvar o adotante." });
    }
  }

  async listaAdotantes(req: Request, res: Response): Promise<void> {
    try {
      console.log("Chamando listaAdotantes no repositório...");
      const listaDeAdotantes = await this.repository.listaAdotantes();
      console.log("Adotantes encontrados:", listaDeAdotantes);
      res.status(200).json(listaDeAdotantes);
    } catch (error) {
      console.error("Erro ao listar adotantes:", error);
      res.status(500).json({ error: "Erro ao listar adotantes." });
    }
  }

  async deletaAdotante(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const { success, message } = await this.repository.deletaAdotante(Number(id));
      if (!success) {
        res.status(404).json({ message });
        return;
      }
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar o adotante." });
    }
  }

  async atualizaEnderecoAdotante(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const { success, message } = await this.repository.atualizaEnderecoAdotante(
        Number(id),
        req.body as EnderecoEntity
      );
      if (!success) {
        res.status(404).json({ message });
        return;
      }
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar o endereço do adotante." });
    }
  }

  async atualizaAdotante(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
  
    try {
      const adotanteAtualizado = await this.repository.atualizaAdotante(
        Number(id),
        req.body as AdotanteEntity
      );
  
      if (!adotanteAtualizado.success) {
        res.status(404).json({ message: adotanteAtualizado.message });
        return;
      }
  
      res.status(200).json({ message: "Adotante atualizado com sucesso!" });
    } catch (error) {
      console.error("Erro ao atualizar adotante:", error);
      res.status(500).json({ error: "Erro ao atualizar adotante." });
    }
  }
}
