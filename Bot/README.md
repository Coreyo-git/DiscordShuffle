<!-- [![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url] -->

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">Discord Shuffle bot</h3>

  <p align="center">
    shuffles some people! hopefully..
  </p>
</div>

### Built With

-   [Discord.js](https://discord.js.org/#/)
-   [Sequelize](https://sequelize.org/)
-   [SQLite3](https://www.sqlite.org/index.html)

### Prerequisites

-   npm

    ```sh
     npm install npm@latest -g
    ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Get a free Discord bot Token at [Discord Dev portal](https://discord.com/developers/docs/getting-started)
2. Get the Guild and Client ID's from your discord client
3. Clone the repo

    ```sh
    git clone https://github.com/Coreyo-git/DiscordShuffle.git
    ```

4. Install NPM packages

    ```sh
    npm install
    ```

5. Enter your Tokens and keys within in `.env` or `.config` if you wish to change configurations
   .env JS config

    ```js
    TOKEN = "MSD23DF...";
    CLIENTID = "2234...";
    GUILDID = "1342...";
    ```

    .config JS config

    ```js
    const TOKEN = "MSD23DF...";
    const CLIENTID = "2234...";
    const GUILDID = "1342...";
    ```

6. Init DataBase with seed etc, run in Bot directory

    ```sh
    node ./dbInit.js
    ```

### Docker Setup

1. Change to the Discord bot project directory.

	```sh
	cd /Bot
	```

2. Build the docker container for the Discord bot.

    ```sh
    docker build -t discord-bot -f ./Dockerfile .
    ```


    Run the docker container.

    ```sh
	docker run -d discord-bot
	```
