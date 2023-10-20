# desafio-02-nestjs-grpc

## Como Rodar

Para executar este projeto, siga os seguintes passos:

1. Certifique-se de que você tem o Docker e o Docker Compose instalados em seu sistema.

2. Clone este repositório e navegue até o diretório raiz do projeto.

3. Abra um terminal e navegue até o diretório onde estão os arquivos de configuração do Docker Compose.

4. Execute o seguinte comando para iniciar os containers:

   ```bash
   docker-compose up
   ```
   Este comando irá construir e iniciar os containers com base nas configurações definidas no arquivo docker-compose.yml.

5. Aguarde até que o processo seja concluído. O Docker Compose irá criar e iniciar os containers para o Go e a aplicação NestJS.

Após a conclusão, os dois containers estarão em execução. A aplicação NestJS estará acessível na porta 3000. Você poderá acessar os endpoints da aplicação em http://localhost:3000.

o banco de dados padrão é SQLite em memória, o que significa que os dados serão perdidos quando os containers forem desligados. 


## Docker Images

* [NestJS](https://hub.docker.com/r/wendryo/desafio-02-grpc-nestjs)

* [Golang](https://hub.docker.com/r/wendryo/desafio-01-grpc-golang)
