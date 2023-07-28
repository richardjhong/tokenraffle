<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->

[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">tokenRaffle</h3>

  <p align="center">
    A dApp for managing NFT based raffles
    <br />
    <a href="https://github.com/richardjhong/tokenraffle"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://tokenraffle-blockchain.vercel.app/">View Demo</a>
    ·
    <a href="https://sepolia.etherscan.io/address/0x7E3168A705fF4e9249d50017467b999f4a06D64F">View Contract</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This project started off with following along the YouTube tutorial listed in the <a href="#acknowledgments">Acknowledgments</a> section. I initially started off with using the Thirdweb SDK for both the frontend and backend; I then branched off with refactoring portions of the frontend with wagmi and viem libraries. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![Ethereum][Ethereum]][Ethereum-url]
- [![Next][Next.js]][Next-url]
- [![React][React.js]][React-url]
- [![TypeScript][TypeScript.js]][TypeScript-url]
- [![Thirdweb-SDK][Thirdweb-SDK]][Thirdweb-SDK-url]
- [![Chakra-UI][Chakra-UI]][Chakra-UI-url]
- [![Hardhat][Hardhat.js]][Hardhat-url]
- [![WalletConnect][WalletConnect]][WalletConnect-url]
- [![Wagmi][Wagmi]][Wagmi-url]
- [![Viem][Viem.sh]][Viem-url]
- [![Chainlink][Chainlink]][Chainlink-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these steps:

### Prerequisites

The frontend is built with a combination of thirdweb-react/dev and wagmi/viem libraries. The project also leverages WalletConnect and uses an API project key which can be created [here](https://cloud.walletconnect.com/app).

The project contract also uses Chainlink's VRF based on a subscription model which requires creating a subscription which can be done [here](https://vrf.chain.link/). Read the documentation and be sure to supply LINK as currency for the VRF requests. You can get free LINK [here](https://faucets.chain.link/).

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/richardjhong/tokenraffle.git
   ```
2. Install NPM packages within the backend directory
   ```sh
   cd backend && npm install
   ```
3. The backend is built with use of thirdweb sdk. As such, run the following command to begin deployment of an instance of the NFTTokenRaffle contract to the Sepolia network:

   ```js
   npx thirdweb@latest deploy
   ```

4. After running step 3, the CLI should show a link to continue the deployment on thirdweb. Here you will need to supply the entryCost and subscription ID for the VRF. The entryCost should be in wei units; here is a [link](https://eth-converter.com/) to convert ether to wei uints. 

5. Add the contract address as a consumer to the VRF subscription. 
  
6. Open a terminal window and change into the frontend directory. Within here, run the following command:
    ```sh
    npm install
    ```

7. Within the frontend directory, find the `frontend/const/addresses.ts` file. Change the contract addresses within NetworkOptions to the deployed address. 
    ```js
    export const RAFFLE_CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS_HERE";
    ```

8. Within the same frontend pointed directory, run the following command:
    ```sh
    npm run dev
    ```

9. Lastly open `http://localhost:3000` within a browser.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

<p align="center">Main Page</p>

[![Index Page][index-page]]()

<p align="center">Admin Page</p>

[![Admin Page][admin-page]]()

<br>

The main highlights of this project are:

* The deployer of the contract will have access to the admin page. In this page, the contract owner can change the entry cost of the raffle (a raffle cannot be in progress) as well as set the NFT to be raffled via its address and id (the contract must be considered the owner of the NFT that is being raffled rather than the contract owner). Once the contract owner starts the raffle, other wallets can start entering the raffle.

* Once the raffle has started, wallet owners can buy entries for the current raffle, assuming that the wallet has enough balance for the cost of entries (entries * entryCost).

* The contract deployer can end the raffle within the admin page. The contract deployer can then start the process of first getting a randomized number from the VRF. Once this is done, the contract deployer can select the winner.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

* [ ] Finish migrating to using [wagmi](https://wagmi.sh/) hooks over using thirdweb-react/dev
* [ ] Create NFTs with metadata (the project in its current state uses placeholder values as the NFTs used for testing do not have metadata).
* [ ] Create unit testing with hardhat within the backend including the use of mock VRF aggregators.
* [ ] Recreate project without use of Thirdweb SDK.


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Richard Hong - rhong24@gmail.com

Project Link: [https://github.com/richardjhong/tokenraffle](https://github.com/richardjhong/tokenraffle)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [How to build an NFT raffle blockchain/web3 app](https://www.youtube.com/watch?v=8-U-1mIl4sQ&ab_channel=thirdweb)
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[contributors-shield]: https://img.shields.io/github/contributors/richardjhong/tokenraffle.svg?style=for-the-badge
[contributors-url]: https://github.com/richardjhong/tokenraffle/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/richardjhong/tokenraffle.svg?style=for-the-badge
[forks-url]: https://github.com/richardjhong/tokenraffle/network/members
[stars-shield]: https://img.shields.io/github/stars/richardjhong/tokenraffle.svg?style=for-the-badge
[stars-url]: https://github.com/richardjhong/tokenraffle/stargazers
[issues-shield]: https://img.shields.io/github/issues/richardjhong/tokenraffle.svg?style=for-the-badge
[issues-url]: https://github.com/richardjhong/tokenraffle/issues
[license-shield]: https://img.shields.io/badge/License-MIT-yellow.svg
[license-url]: https://opensource.org/licenses/MIT
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[index-page]: ./assets/index_page.png
[admin-page]: ./assets/admin_page.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Ethereum]: https://img.shields.io/badge/ethereum-%23222222?style=for-the-badge&logo=ethereum
[Ethereum-url]: https://ethereum.org/en/
[Hardhat.js]: https://img.shields.io/badge/hardhat-js
[Hardhat-url]: https://hardhat.org/
[WalletConnect]: https://img.shields.io/badge/WalletConnect-%233B99FC?&logo=walletconnect
[WalletConnect-url]: https://walletconnect.com/
[TypeScript.js]: https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Wagmi]: https://img.shields.io/badge/wagmi-black
[Wagmi-url]: https://wagmi.sh/
[Chakra-UI]: https://img.shields.io/badge/Chakra_UI-%23319795
[Chakra-UI-URL]: https://chakra-ui.com/
[Viem.sh]: https://img.shields.io/badge/viem-sh?color=1E1E20
[Viem-url]: https://viem.sh/
[Thirdweb-SDK]: https://img.shields.io/badge/ThirdWeb-purple
[Thirdweb-SDK-url]: https://thirdweb.com/sdk
[Chainlink]: https://img.shields.io/badge/Chainlink-%23375BD2?logo=chainlink
[Chainlink-url]: https://chain.link/