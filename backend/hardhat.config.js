require("@matterlabs/hardhat-zksync-solc");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    zksolc: {
        version: "1.3.9",
        compilerSource: "binary",
        settings: {
            optimizer: {
                enabled: true,
            },
        },
    },
    networks: {
        zksync_testnet: {
            url: "https://zksync2-testnet.zksync.dev",
            ethNetwork: "goerli",
            chainId: 280,
            zksync: true,
        },
        zksync_mainnet: {
            url: "https://zksync2-mainnet.zksync.io/",
            ethNetwork: "mainnet",
            chainId: 324,
            zksync: true,
        },
        hardhat: {
            chainId: 1337,
        },
        running: {
            url: "http://localhost:8545",
            chainId: 1337,
        },
    },
    paths: {
        artifacts: "./artifacts-zk",
        cache: "./cache-zk",
        sources: "./contracts",
        tests: "./test",
    },
    solidity: {
        version: "0.8.13",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    defaultNetwork: "hardhat",
};
