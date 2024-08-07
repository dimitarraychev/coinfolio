# CoinFol.io - Stay Ahead In The Crypto Market

## Hosting

Available at [coinfol-io.web.app](https://coinfol-io.web.app/)

## Table of Content:

-   [About](#about)
-   [Preview](#preview)
-   [Technologies & Tools](#technologies-and-tools)
-   [Setup](#setup)
-   [Architecture](#architecture)
-   [Credits](#credits)
-   [License](#license)

## About

**CoinFol.io** can be categorized as a cryptocurrency market and portfolio tracking application/tool _available both for mobile and desktop_. Allowing users to get real-time price updates, in-depth market data and all the latest information on a wide variety of cryptocurrencies in both USD and EUR.

The _Portfolio Hub_ gives customers the abillity to create cryptocurrency portfolios with the current market prices or they can input a custom price if they bought at a previous moment. Afterwards they can track their portfolio/s movements, edit or remove them. Other users' creations can be explored and followed in the main Hub page which has inifite scrolling implemented.

## Preview

![Desktop](https://firebasestorage.googleapis.com/v0/b/coinfolio-109f2.appspot.com/o/coinfolio-preview.png?alt=media&token=1e9b7fbe-dacf-4b93-b8e6-41514b75b888)

## Technologies and Tools

[![Technologies & Tools](https://skillicons.dev/icons?i=react,js,html,css,vite,firebase)](https://skillicons.dev)

## Setup

1. **Clone the repository**:

    ```sh
    git clone https://github.com/dimitarraychev/coinfolio
    ```

2. **Open the project in VS Code**

3. **Install dependencies**:

    ```sh
    npm install
    ```

4. **Run the development server**:

    ```sh
    npm run dev
    ```

5. **Open your browser and navigate to: http://localhost:5173**

## Architecture

```sh
├── src/
│   ├── api/
│   │   └── Subfolders for each api with calls and hooks.
│   ├── assets/
│   │   └── Application assets.
│   ├── components/
│   │   ├── common
│   │   │    └── Reusable components.
│   │   └── layout
│   │        └── Main layout and layout components.
│   ├── constants/
│   │   └── Constant values used throughout the app.
│   ├── context/
│   │   └── Global state using React Context API.
│   ├── hooks/
│   │   └── Custom React hooks encapsulating reusable logic.
│   ├── pages/
│   │   └── Main components associated with routes.
│   └── utils/
│       └── Utilities and helpers with common tasks.
```

## Credits

[CoinGecko](https://www.coingecko.com/)

[FreecurrencyAPI](https://freecurrencyapi.com/)

## License

MIT license @ [Dimitar Raychev](https://draychev.web.app)
