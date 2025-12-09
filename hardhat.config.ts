import * as dotenv from 'dotenv';
dotenv.config();

import { HardhatUserConfig } from '@sun-protocol/sunhat';
import '@nomicfoundation/hardhat-toolbox';
import '@nomiclabs/hardhat-vyper';
import '@sun-protocol/sunhat';
import '@nomicfoundation/hardhat-foundry';

const settings = {
  optimizer: {
    enabled: true, // enabled for optimizer
    runs: 999999, // runs time for optimizer run
  },
};

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      { version: '0.8.25', settings }, // current solc version 1
    ],
  },
  vyper: {
    compilers: [
      { version: '0.2.8' }, // current vyper compilers version 1
      { version: '0.3.10' }, // current vyper compilers version 2, you should set the same settings for all vyper compiler versions required .
    ],
  },
  // settings for different networks
  networks: {
    localhost: {
      live: false, // this network is not a live one
      saveDeployments: true, // save the deployments in the deployments folder
      tags: ['local'], // tag for this network
      deploy: ['deploy/'], // folder for deploy scripts
      // accounts: [`1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef`],
    },
    tron: {
      url: 'https://nile.trongrid.io/jsonrpc', // tron mainnet rpc url
      tron: true, // enable tron network
      deploy: ['deployTron/'], // folder for tron deploy scripts
      accounts: process.env.PRIVATE_KEY ? [`${process.env.PRIVATE_KEY}`] : [], // account private key for deploy
    },
    // sepolia: {
    //   url: "https://sepolia.drpc.org",
    //   tron: false,
    //   deploy: ['deploy/'],
    //   accounts: [`${process.env.PRIVATE_KEY}`],
    // }
  },
  tronSolc: {
    enable: true, // enable tron solc compiler
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
    },
  },
  llm: {
    defaultProvider: 'azure_openai',
    // promptTemplate:
    //   'As a world-class smart contract auditor, please perform a detailed security review of the following {language} code from the file "{contractName}". Focus especially on re-entrancy, integer overflows, and access control issues.',
    providers: {
      openai: {
        apiKey: `${process.env.OPENAI_API_KEY}`,
        model: 'gpt-4o',
      },
      azure_openai: {
        apiKey: `${process.env.OPENAI_API_KEY}`,
        endpoint: `${process.env.OPENAI_ENDPOINT}`,
        deploymentName: `${process.env.OPENAI_DEPLOYMENT}`,
        apiVersion: `${process.env.OPENAI_API_VERSION}`,
        model: 'gpt-4o',
      },
      gemini: {
        apiKey: `${process.env.GEMINI_API_KEY}`,
        model: 'gemini-2.5-pro',
      },
      qwen: {
        apiKey: `${process.env.QWEN_API_KEY}`,
        model: 'qwen-turbo',
        baseURL: `${process.env.QWEN_BASE_URL}`,
      },
      deepseek: {
        apiKey: `${process.env.DEEPSEEK_API_KEY}`,
        model: 'deepseek-coder',
        baseURL: `${process.env.DEEPSEEK_BASE_URL}`,
      },
    },
  },
};

export default config;
