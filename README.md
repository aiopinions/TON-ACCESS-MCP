# TON Access MCP Server

A production-ready Model Context Protocol (MCP) server implementation for the TON blockchain, built on top of the [ton-access](https://github.com/orbs-network/ton-access) library.

## What is MCP?

The [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) is an open protocol developed by Anthropic that standardizes how applications provide context to Large Language Models (LLMs). It follows a client-server architecture where LLM applications (hosts) connect to MCP servers that provide context, tools, and prompts to the LLMs.

## Features

- **Full MCP Implementation**: Implements the complete MCP specification for connecting AI assistants to the TON blockchain
- **Decentralized Access**: Uses multiple nodes for reliability and decentralization
- **Health Checking**: Automatically checks node health and selects healthy nodes
- **Load Balancing**: Uses weighted random algorithm to distribute requests
- **Multiple Networks**: Supports both mainnet and testnet
- **Multiple Protocols**: Supports different RPC protocols (TonCenter HTTP API v2, TonHub HTTP API v4)

## Installation

```bash
# Clone the repository
git clone https://github.com/your-org/ton-access-mcp.git
cd ton-access-mcp

# Install dependencies
npm install

# Build the project
npm run build

# Start the server
npm start
```

## Quick Start

```typescript
import { TonAccessMCPServer } from 'ton-access-mcp';

// Create and start the server
const server = new TonAccessMCPServer({
  port: 3000,
  host: 'localhost'
});

server.start().then(() => {
  console.log('TON Access MCP Server is running on http://localhost:3000');
});
```

## Available Tools

The TON Access MCP server provides the following tools:

- **ton.getBalance**: Get the balance of a TON wallet address
- **ton.getTransaction**: Get details of a TON blockchain transaction
- **ton.getBlock**: Get details of a TON blockchain block
- **ton.callGetter**: Call a getter method on a TON smart contract
- **ton.getMasterchainInfo**: Get current information about the TON masterchain
- **ton.getAccountState**: Get the current state of a TON account

## Documentation

For detailed documentation, see the [docs](./docs) directory.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Orbs Network](https://github.com/orbs-network) for the ton-access library
- [Anthropic](https://www.anthropic.com/) for the MCP specification
