# TubeAlert
Este projeto é um bot de Discord que verifica periodicamente um canal do YouTube para novos vídeos e envia uma notificação a um canal específico do Discord quando um novo vídeo é encontrado.

# Funcionalidades
- Conecta-se ao Discord como um bot.
- Usa a API do YouTube para verificar novos vídeos em um canal específico.
- Envia uma mensagem ao canal do Discord quando um novo vídeo é detectado.
- Verifica por novos vídeos a cada hora usando o node-cron.

# Pré-requisitos
- Node.js
- NPM (Node Package Manager)
- Conta no Discord com um bot configurado
- Chave de API do YouTube Data v3

# Instalação
Clone o repositório para sua máquina local:
- git clone https://github.com/seu-usuario/nome-do-repositorio.git

Navegue até o diretório do projeto:
- cd nome-do-repositorio

Instale as dependências do projeto:
- npm install

Crie um arquivo .env na raiz do projeto e adicione suas variáveis de ambiente:
- DISCORD_TOKEN=seu-discord-token-aqui
- YOUTUBE_API_KEY=sua-chave-de-api-youtube-aqui

# Uso
Para iniciar o bot, use o seguinte comando:
-node seu-arquivo.js

Certifique-se de substituir seu-arquivo.js pelo nome do arquivo JavaScript que contém o código do bot.

# Contribuição
- Faça um fork do projeto.
- Crie uma branch para sua feature (git checkout -b feature/nova-feature).
- Commit suas mudanças (git commit -am 'Adiciona nova feature').
- Faça o push para a branch (git push origin feature/nova-feature).
- Crie um novo Pull Request.

# Licença
Este projeto está licenciado sob a Licença MIT.
