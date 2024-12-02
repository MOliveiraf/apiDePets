import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import InterfacePetRepository from "./interfaces/InterfacePetRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnumPorte from "../enum/EnumPorte";

export default class PetRepository implements InterfacePetRepository {
    private petRepository: Repository<PetEntity>;
    private adotanteRepository: Repository<AdotanteEntity>;

    constructor(
        petRepository: Repository<PetEntity>,
        adotanteRepository: Repository<AdotanteEntity>) {
        this.petRepository = petRepository;
        this.adotanteRepository = adotanteRepository;
    }
   

    async criaPet(pet: PetEntity): Promise<void> {
        await this.petRepository.save(pet);
    }

    async listaPet(): Promise<PetEntity[]> {
        return await this.petRepository.find();
    }

    async atualizaPet(
        id: number,
        newData: PetEntity
    ): Promise<{ success: boolean; message?: string }> {
        try {
            const petToUpdate = await this.petRepository.findOne({ where: { id } });

            if (!petToUpdate) {
                return { success: false, message: "Pet não encontrado" };
            }

            Object.assign(petToUpdate, newData);

            await this.petRepository.save(petToUpdate);

            return { success: true };
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: "Ocorreu um erro ao tentar atualizar o pet.",
            };
        }
    }

    async deletaPet(id: number): Promise<{ success: boolean; message?: string }> {
        try {
            const petToRemove = await this.petRepository.findOne({ where: { id } });

            if (!petToRemove) {
                return { success: false, message: "Pet não encontrado" };
            }

            await this.petRepository.remove(petToRemove);

            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: "Ocorreu um erro ao tentar excluir o pet.",
            };
        }
    }

    async adotaPet(
        idPet: number,
        idAdotante: number
      ): Promise<{ success: boolean; message?: string }> {
        const pet = await this.petRepository.findOne({ where: { id: idPet } });
        if (!pet) {
          return { success: false, message: "Pet não encontrado" };
        }
      
        const adotante = await this.adotanteRepository.findOne({
          where: { id: idAdotante },
        });
        if (!adotante) {
          return { success: false, message: "Adotante não encontrado" };
        }
      
        // Atualizar o status de adoção do pet e associá-lo ao adotante
        try {
          pet.adotado = true;
          pet.adotante = adotante; // Supondo que você tenha uma relação configurada na entidade
          await this.petRepository.save(pet);
      
          return { success: true, message: "Pet adotado com sucesso!" };
        } catch (error) {
          console.error("Erro ao adotar pet:", error);
          return { success: false, message: "Erro ao salvar a adoção no banco de dados." };
        }
      }
    
    async buscaPetPorCampoGenerico<Tipo extends keyof PetEntity>(
        campo: Tipo, 
        valor: PetEntity[Tipo]
    ): Promise<PetEntity[]> {
        const pets = await this.petRepository.find({ where: { [campo]: valor } });
        return pets;
    }
}
