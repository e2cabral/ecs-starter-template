# Guia de Contribuição


Bem-vindo ao guia de contribuição para o projeto **ecs-starter-template**! Agradecemos seu interesse em contribuir para o nosso projeto. Este documento fornece diretrizes para ajudá-lo a contribuir de maneira eficaz.

## Índice

- [Código de Conduta](#código-de-conduta)
- [Como Contribuir](#como-contribuir)
    - [Relatando Bugs](#relatando-bugs)
    - [Sugerindo Melhorias](#sugerindo-melhorias)
    - [Enviando Pull Requests](#enviando-pull-requests)
- [Ambiente de Desenvolvimento](#ambiente-de-desenvolvimento)
- [Padrões de Código](#padrões-de-código)
- [Processo de Revisão](#processo-de-revisão)
- [Versionamento](#versionamento)

## Código de Conduta

Nosso projeto adota um código de conduta que esperamos que todos os participantes sigam. Por favor, leia-o antes de contribuir.

- Seja respeitoso e inclusivo
- Aceite críticas construtivas
- Foque no que é melhor para a comunidade
- Demonstre empatia com outros membros da comunidade

## Como Contribuir

### Relatando Bugs

Bugs são rastreados como issues no GitHub. Ao criar uma issue para reportar um bug, inclua:

- Um título claro e descritivo
- Passos detalhados para reproduzir o bug
- O comportamento esperado e o que você observou
- Versões relevantes do software
- Quaisquer outras informações que possam ajudar a resolver o problema

### Sugerindo Melhorias

Sugestões de melhorias também são bem-vindas. Para sugerir uma melhoria:

- Use um título claro e descritivo
- Forneça uma descrição detalhada da melhoria sugerida
- Explique por que essa melhoria seria útil para o projeto
- Se possível, inclua exemplos de código ou mockups

### Enviando Pull Requests

1. Faça um fork do repositório
2. Clone seu fork localmente: `git clone https://github.com/e2cabral/ecs-starter-template`
3. Crie uma branch para sua feature: `git checkout -b feature/nome-da-feature`
4. Faça suas alterações e commit: `git commit -m "Descrição da alteração"`
5. Envie para o GitHub: `git push origin feature/nome-da-feature`
6. Abra um Pull Request contra a branch principal do projeto

## Ambiente de Desenvolvimento

Para configurar seu ambiente de desenvolvimento:

1. Certifique-se de ter Node.js (versão compatível com o projeto) instalado
2. Instale as dependências: `npm install`
3. Execute em modo de desenvolvimento: `npm run dev`

Scripts úteis:
- `npm run build` - Compila o projeto usando TypeScript
- `npm run dev` - Inicia o servidor em modo de desenvolvimento com hot-reload
- `npm run start:dev` - Inicia o servidor em ambiente de desenvolvimento
- `npm run start:prod` - Inicia o servidor em ambiente de produção
- `npm run build:fast` - Compilação rápida usando SWC
- `npm run debug` - Inicia o servidor com suporte à depuração

## Padrões de Código

Este projeto utiliza:

- **TypeScript** para tipagem estática
- **ESLint** para linting
- **Prettier** para formatação de código

Antes de enviar seu código, certifique-se de que:

1. Ele segue as convenções de estilo do projeto
2. Todos os testes passam
3. Seu código está bem documentado

## Processo de Revisão

Todos os Pull Requests passarão por revisão de código. Durante a revisão:

1. Os mantenedores verificarão se as alterações seguem as diretrizes do projeto
2. Poderão sugerir melhorias ou solicitar alterações
3. Uma vez aprovado, um mantenedor fará o merge do seu Pull Request

## Versionamento

Este projeto segue o [Versionamento Semântico](https://semver.org/lang/pt-BR/):

- Versão MAJOR: alterações incompatíveis com versões anteriores
- Versão MINOR: adição de funcionalidades com compatibilidade
- Versão PATCH: correções de bugs com compatibilidade

Usamos scripts para gerenciar o versionamento:
- `npm run version:patch` - Incrementa a versão de patch
- `npm run version:minor` - Incrementa a versão minor
- `npm run version:major` - Incrementa a versão major

---

Agradecemos suas contribuições para tornar este projeto melhor!