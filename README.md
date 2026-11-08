# Refund — Gerenciador de Despesas

Aplicação web desenvolvida para cadastrar, organizar e acompanhar despesas de forma simples e intuitiva.

<kbd> </kbd> **Acesse o projeto:** [https://lazarom.dev/refund/](https://lazarom.dev/refund/)

O projeto permite registrar despesas por categoria, acompanhar a quantidade de lançamentos e visualizar automaticamente o valor total acumulado.

## Funcionalidades

- Cadastro de despesas com título, categoria e valor.
- Organização por categorias:
  - Alimentação
  - Hospedagem
  - Transporte
  - Serviços
  - Outros
- Formatação de valores no padrão monetário brasileiro (R$).
- Cálculo automático do total das despesas.
- Contagem de despesas cadastradas.
- Remoção individual de despesas.
- Persistência dos dados utilizando LocalStorage.
- Recuperação dos dados ao recarregar a página.
- Validação dos campos e dos registros armazenados.
- Tratamento de dados inválidos e falhas no armazenamento.

## Tecnologias utilizadas

- **HTML5:** estruturação da aplicação.
- **CSS3:** estilização e organização visual.
- **JavaScript:** lógica da aplicação, manipulação do DOM, validações e gerenciamento das despesas.
- **LocalStorage:** armazenamento dos dados no navegador.

## Como executar o projeto

1. Clone este repositório:

   ```bash
   git clone https://github.com/Lazaro277/refund.git
   ```

2. Acesse a pasta do projeto:

   ```bash
   cd refund
   ```

3. Abra o arquivo `index.html` no navegador.

Não é necessário configurar servidor ou banco de dados para executar a aplicação.

## Armazenamento de dados

As despesas são armazenadas no LocalStorage do navegador, permitindo que os registros permaneçam disponíveis após atualizar ou fechar a página.

A aplicação também realiza verificações dos dados recuperados para evitar que registros inválidos comprometam seu funcionamento.

## Objetivo do projeto

O objetivo foi praticar conceitos fundamentais do desenvolvimento web, principalmente manipulação do DOM, eventos, arrays, objetos, funções, validação de formulários e persistência de dados no navegador.

---

**Desenvolvido por [Lázaro Messias](https://www.linkedin.com/in/lazaro-messias)**

[GitHub](https://github.com/Lazaro277) · [LinkedIn](https://www.linkedin.com/in/lazaro-messias) · [Projeto publicado](https://lazarom.dev/refund/)
