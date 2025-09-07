API para a adoção de animais, a FindAFriend API, utilizando SOLID e testes.

### Regras da aplicação

- [x] Deve ser possível cadastrar um pet;
- [ ] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade;
- [ ] Deve ser possível filtrar pets por suas características;
- [x] Deve ser possível visualizar detalhes de um pet para adoção;
- [x] Deve ser possível se cadastrar como uma ORG;
- [ ] Deve ser possível realizar login como uma ORG;
- [x] Deve ser possivel realizar login como usuário;
### Regras de negócio

- [ ] Para listar os pets, obrigatoriamente precisamos informar a cidade;
- [ ] Uma ORG precisa ter um endereço e um número de WhatsApp;
- [ ] Um pet deve estar ligado a uma ORG;
- [ ] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp;
- [ ] Todos os filtros, além da cidade, são opcionais;
- [ ] Somente usuários com ADMIN da org podem adicionar pet para adoção;
- [ ] Para uma ORG acessar a aplicação como admin, ela precisa estar logada;