# HTTPmon

<p align="center">
  <img src="src/assets/images/Logotipo_httpmon_transparente.png" alt="Logo do HTTPmon" width="280" />
</p>

<p align="center">
  Códigos de status HTTP explicados com exemplos práticos e cenas de Pokémon.
</p>

O HTTPmon é um projeto educacional para explorar respostas HTTP. Os códigos são organizados por categoria, e cada página reúne uma explicação, um exemplo de requisição e resposta, causas comuns e uma mídia relacionada.

## Prévia

### Página inicial

As categorias de status são organizadas em seções, com cards que levam aos detalhes de cada código.

<p align="center">
  <img src="docs/images/home.png" alt="Página inicial do HTTPmon com a área de uso e os cards da categoria 1xx" width="100%" />
</p>

### Página de um status

Cada código usa o mesmo modelo de página e carrega as informações correspondentes ao status escolhido.

<p align="center">
  <img src="docs/images/status-404.png" alt="Página do status HTTP 404 Not Found, com mídia, significado e exemplo" width="100%" />
</p>

## Funcionalidades

- Navegação pelos status organizados nas categorias `1xx`, `2xx`, `3xx`, `4xx` e `5xx`.
- Página de detalhes reutilizável no formato `/status/:code`.
- Exemplos práticos, causas comuns e links para status relacionados.
- GIFs associados aos status e uma explicação da escolha de cada mídia.
- Layout responsivo para telas grandes e celulares.

## Executar localmente

É necessário ter Node.js e npm instalados.

```bash
npm install
npm run dev
```

Execute os comandos na pasta do projeto. O Vite exibirá no terminal o endereço local para abrir no navegador. Para abrir diretamente um status, use o endereço local seguido de `/status/` e do código. Por exemplo: `/status/404`.

## Scripts disponíveis

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento. |
| `npm run build` | Verifica os tipos e gera a versão de produção. |
| `npm run preview` | Abre localmente a versão de produção gerada. |
| `npm run lint` | Verifica problemas de código com Oxlint. |

## Tecnologias

- React e TypeScript
- Vite
- React Router
- Tailwind CSS
- React Icons

## Organização do projeto

- `src/pages/`: páginas inicial, de status e de erro.
- `src/components/`: cards, conteúdo de mídia e footer.
- `src/routes/`: rotas da aplicação.
- `src/services/httpStatuses.ts`: dados dos códigos e informações exibidas nas páginas.
- `src/types/`: tipos usados pelos dados de status.

As páginas individuais são montadas a partir do código da rota e dos dados locais. Assim, adicionar um status não exige criar uma página React separada para ele.

## Mídias

As animações são carregadas do Tenor e precisam de conexão com a internet para aparecer. O HTTPmon é um projeto educacional independente; Pokémon e seus personagens pertencem aos respectivos titulares.
