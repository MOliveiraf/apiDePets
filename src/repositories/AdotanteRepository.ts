import { Repository } from "typeorm";
import AdotanteEntity from "../entities/AdotanteEntity";
import InterfaceAdotanteRepository from "./interfaces/InterfaceAdotanteRepository";
import EnderecoEntity from "../entities/Endereco";

export default class AdotanteRepository implements InterfaceAdotanteRepository {
  constructor(private repository: Repository<AdotanteEntity>) {}

  // Lista todos os adotantes
  async listaAdotantes(): Promise<AdotanteEntity[]> {
    try {
      console.log("Buscando adotantes no banco de dados...");
      const adotantes = await this.repository.find();
      console.log("Adotantes retornados do banco:", adotantes);
      return adotantes;
    } catch (error) {
      console.error("Erro ao listar adotantes no repositório:", error);
      throw new Error("Erro ao listar adotantes.");
    }
  }

  // Atualiza informações de um adotante
  async atualizaAdotante(
    id: number,
    adotante: AdotanteEntity
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const adotanteExistente = await this.repository.findOne({ where: { id } });

      if (!adotanteExistente) {
        return { success: false, message: "Adotante não encontrado." };
      }

      Object.assign(adotanteExistente, adotante);
      await this.repository.save(adotanteExistente);

      return { success: true };
    } catch (error) {
      console.error("Erro ao atualizar adotante:", error);
      return { success: false, message: "Erro ao atualizar adotante." };
    }
  }

  // Deleta um adotante
  async deletaAdotante(id: number): Promise<{ success: boolean; message?: string }> {
    try {
      const adotante = await this.repository.findOne({ where: { id } });

      if (!adotante) {
        return { success: false, message: "Adotante não encontrado." };
      }

      await this.repository.remove(adotante);
      return { success: true };
    } catch (error) {
      console.error("Erro ao deletar adotante:", error);
      return { success: false, message: "Erro ao deletar adotante." };
    }
  }

  // Cria um novo adotante
  async criaAdotante(adotante: AdotanteEntity): Promise<void> {
    try {
      await this.repository.save(adotante);
      console.log("Adotante salvo no banco de dados:", adotante);
    } catch (error) {
      console.error("Erro ao salvar no banco de dados:", error);
      throw new Error("Erro ao salvar no banco de dados.");
    }
  }

  // Atualiza o endereço de um adotante
  async atualizaEnderecoAdotante(
    idAdotante: number,
    endereco: EnderecoEntity
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const adotante = await this.repository.findOne({ where: { id: idAdotante } });

      if (!adotante) {
        return { success: false, message: "Adotante não encontrado." };
      }

      adotante.endereco = endereco; // Atualiza o endereço
      await this.repository.save(adotante);
      return { success: true };
    } catch (error) {
      console.error("Erro ao atualizar endereço:", error);
      return { success: false, message: "Erro ao atualizar endereço." };
    }
  }
}
