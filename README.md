# NEXO Studio — site de portfólio

Site estático (HTML, CSS e JavaScript puros), sem build e sem dependências.

## Rodar localmente
Os caminhos usam `/` (raiz), então abra por um servidor local, não clicando no arquivo:

    cd nexo-studio
    python3 -m http.server 8000
    # abra http://localhost:8000

## Publicar na Vercel
1. Suba esta pasta para um repositório no GitHub.
2. Em vercel.com, clique em "Add New → Project" e importe o repositório.
3. Framework Preset: "Other". Deixe Build Command e Output Directory em branco.
4. Clique em Deploy.
5. Em Settings → Domains, adicione seu domínio.

## Domínio
O endereço atual (`meu-site-lime-tau.vercel.app`) está em index.html (canonical, og:url, og:image e JSON-LD), robots.txt e sitemap.xml. Se trocar de domínio, atualize esses 3 arquivos.

## Capturas de tela do portfólio
As imagens dos 3 projetos estão em `assets/projetos/` (formato webp, proporção 2:1). Para trocar uma, salve a nova com o mesmo nome. Se um arquivo sumir, o card mostra uma capa com o nome do projeto.

## Pendências
- Confirmar com as clientes que podem aparecer no portfólio.
- O contato usa o Instagram pessoal (@_juao46). Quando criar o perfil da NEXO Studio, troque o link em index.html (contato, rodapé e JSON-LD).

## Estrutura
    index.html        página única
    404.html          página de erro
    css/style.css     estilos
    js/main.js        menu, animações e formulário
    assets/           logo original, favicon e imagem de compartilhamento
    robots.txt, sitemap.xml, vercel.json
