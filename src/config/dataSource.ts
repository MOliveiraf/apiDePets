import { DataSource } from "typeorm";
import PetEntity from "../entities/PetEntity";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnderecoEntity from "../entities/Endereco"; // Certifique-se de importar a entidade

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./src/config/database.sqlite",
  entities: [PetEntity, AdotanteEntity, EnderecoEntity], // Adicione EnderecoEntity aqui
  synchronize: true,
});
