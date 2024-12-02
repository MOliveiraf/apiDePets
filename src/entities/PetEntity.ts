import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import EnumEspecie from "../enum/EnumEspecie";
import AdotanteEntity from "./AdotanteEntity";
import EnumPorte from "../enum/EnumPorte";

@Entity()
export default class PetEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nome: string;

    @Column({
        type: "varchar",
        enum: EnumEspecie,
    })
    especie: EnumEspecie;

    @Column({
        type: "varchar",
        nullable: true,
    })
    porte?: EnumPorte;

    @Column()
    dataDeNascimento: Date;

    @Column()
    adotado: boolean;

    @ManyToOne(() => AdotanteEntity, (adotante) => adotante.pets)
    adotante!: AdotanteEntity;

    constructor(
        nome: string,
        especie: EnumEspecie,
        dataDeNascimento: Date,
        adotado: boolean,
        porte?: EnumPorte, // Parâmetro obrigatório primeiro
    ) {
        this.porte = porte;
        this.nome = nome || "";
        this.especie = especie || EnumEspecie.CACHORRO;
        this.dataDeNascimento = dataDeNascimento || new Date();
        this.adotado = adotado || false;
    }
}
