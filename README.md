# sunhat-demo

This repository serves as a tutorial and demonstration for [Sunhat](https://github.com/sun-protocol/sunhat), a Hardhat-based development environment for TRON and EVM-compatible smart contracts.

## Environment Setup

Before you begin, ensure you have the following prerequisites installed on your system.

*   **Node.js**: Version `22.14.0` or higher.
    > [Download Node.js](https://nodejs.org/en/download)

*   **pnpm**: Version `10.6.5` or higher.
    ```bash
    npm install -g pnpm
    ```

*   **Foundry**: A smart contract development toolchain.
    > [Foundry Installation Guide](https://book.getfoundry.sh/getting-started/installation)
    ```bash
    # Install Foundry
    curl -L https://foundry.paradigm.xyz | bash
    # Set Foundry to the nightly channel
    foundryup --install nightly
    ```

## Getting Started

### 1. Clone and Install Dependencies

First, clone this repository and install the necessary dependencies, including Hardhat and Sunhat.

```bash
# Clone the repository (replace with your URL)
git clone https://github.com/your-username/sunhat-demo.git
cd sunhat-demo

# Install dependencies
pnpm install
```

### 2. Configure Your Environment

Export you private key of the deployer account.

```env
# env
PRIVATE_KEY=YOUR_PRIVATE_KEY_HERE
```

## Hardhat Configuration (`hardhat.config.ts`)

The `hardhat.config.ts` file is the central place to manage your project's settings.

#### **Compiler Configuration**

You can configure multiple versions of the Solidity and Vyper compilers.

```typescript
// hardhat.config.ts
solidity: {
  compilers: [ // An array for different Solidity versions
    { version: "0.8.23", settings: { /* ... */ } },
    { version: "0.8.22", settings: { /* ... */ } },
  ]
},
vyper: {
  compilers: [ // An array for different Vyper versions
    { version: "0.2.8" },
    { version: "0.3.10" }
  ]
}
```

#### **Network Configuration**

Define the networks for deployment and testing. The configuration below includes TRON's Nile testnet, Sepolia, and a local node.

```typescript
// hardhat.config.ts
networks: {
  localhost: {
    live: false,
    saveDeployments: true,
    tags: ["local"],
    deploy: ['deploy/'],
  },
  tron: {
    url: "https://nile.trongrid.io/jsonrpc",
    tron: true, // Required for TRON networks
    deploy: ['deployTron/'],
    accounts: [`${process.env.PRIVATE_KEY}`],
  },
  sepolia: {
    url: "https://sepolia.drpc.org",
    tron: false,
    deploy: ['deploy/'],
    accounts: [`${process.env.PRIVATE_KEY}`],
  }
}
```

#### **Additional Sunhat Configuration**

-   **tronSolc Support**: Enable this if you are using the `tronSolc` compiler.
    ```typescript
    tronSolc: {
      enable: true,
    }
    ```

-   **Named Accounts**: Assign names to accounts for easy reference in scripts and tests.
    ```typescript
    namedAccounts: {
      deployer: {
        default: 0, // The first account is assigned as 'deployer'
      }
    }
    ```

## Core Commands

### Compile Contracts

Compile all source code in the `contracts/` directory.

```bash
pnpm compile
```

### Run Unit Tests

This project supports testing with both Hardhat and Foundry.

#### **Hardhat Tests**

Run the test files located in the `test/` directory.

```bash
npx hardhat test
```
or use the npm script:
```bash
npm run test
```

#### **Foundry Tests**

First, initialize Foundry within the project, then run the tests.

```bash
# Initialize Foundry
npm run init-foundry

# Run Foundry tests
npm run test-foundry
```

### Deploy Contracts

Deployment scripts are located in the `deploy/` (for EVM) and `deployTron/` (for TRON) directories.

To deploy, run the following command, specifying the target network:
```bash
npx hardhat deploy --network {network_name} --tags {tag_name}
```

Alternatively, you can use the predefined npm scripts:

```bash
# Deploy to the TRON network (as configured)
npm run deploy-tron

# Deploy to an EVM-compatible network (as configured)
npm run deploy
```

After a successful deployment, artifacts containing the contract address and ABI are saved to `deployments/{network_name}/{ContractName}.json`.
