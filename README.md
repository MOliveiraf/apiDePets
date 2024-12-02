# **API de Gerenciamento de Adoção de Pets**

## **Descrição do Projeto**
Esta API foi desenvolvida para gerenciar um sistema de adoção de pets, permitindo operações como:
- Cadastrar, listar, atualizar e excluir pets.
- Filtrar pets por características como porte e espécie.
- Registrar adotantes com informações pessoais e atualizar seus dados.
- Relacionar um adotante a um pet, simulando o processo de adoção.

O projeto utiliza **Node.js** com **TypeScript** para segurança de tipos, **SQLite** para persistência de dados e **TypeORM** como ORM para manipulação do banco de dados.

---

## **Tecnologias Utilizadas**
- **Node.js**: Plataforma para construção de APIs.
- **TypeScript**: Tipagem estática para maior segurança no desenvolvimento.
- **Express**: Framework para construção de APIs RESTful.
- **TypeORM**: ORM para manipulação do banco de dados.
- **SQLite**: Banco de dados relacional.
- **Insomnia**: Ferramenta para testar endpoints.

---

## **Estrutura do Projeto**
```plaintext
src/
  ├── config/
  │   ├── database.sqlite
  │   ├── dataSource.ts
  ├── controller/
  │   ├── AdotanteController.ts
  │   ├── PetController.ts
  ├── entities/
  │   ├── AdotanteEntity.ts
  │   ├── Endereco.ts
  │   ├── PetEntity.ts
  ├── enum/
  │   ├── EnumEspecie.ts
  │   ├── EnumPorte.ts
  ├── repositories/
  │   ├── interfaces/
  │   │   ├── InterfaceAdotanteRepository.ts
  │   │   ├── InterfacePetRepository.ts
  │   ├── AdotanteRepository.ts
  │   ├── PetRepository.ts
  ├── routes/
  │   ├── adotanteRouter.ts
  │   ├── index.ts
  │   ├── petRouter.ts
  ├── tipos/
  ├── app.ts
server.ts
