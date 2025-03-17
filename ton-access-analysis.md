# TON Access Functionality Analysis

## Overview
TON Access is a TypeScript library that provides decentralized RPC access to the TON blockchain through a network of nodes. It enables clients to make HTTP queries to the TON blockchain without requiring API keys or running a backend.

## Core Components

### 1. Access Class (`index.ts`)
The main class that handles connection to TON nodes and endpoint generation.

Key functionality:
- Initializes connection to node manager
- Builds URLs for different protocols and networks
- Implements weighted random algorithm for load balancing
- Provides methods to get endpoints for different protocols

### 2. Node Management (`nodes.ts`)
Handles node discovery, health checking, and selection.

Key functionality:
- Fetches list of available nodes from a central manager
- Tracks node health status
- Filters nodes based on protocol and network
- Provides healthy nodes for specific protocol/network combinations

### 3. Protocol Support
Supports multiple RPC protocols:
- `toncenter-api-v2`: Main HTTP API for TON blockchain
- `ton-api-v4`: Alternative HTTP API with different capabilities
- `adnl-proxy`: Direct ADNL protocol access (coming soon)

### 4. Web Integration (`web.ts`)
Provides browser compatibility by exposing the library's functionality to the global window object.

## Key Workflows

### Endpoint Generation
1. Client requests an endpoint via `getHttpEndpoint()` or `getHttpV4Endpoint()`
2. Library initializes Access class and fetches node information
3. Library selects healthy nodes for the requested protocol and network
4. Library applies weighted random selection to choose a node
5. Library constructs and returns the endpoint URL

### URL Structure
Format: `https://{edge-host}/{node-id}/{url-version}/{network}/{protocol}/{suffix}`

Components:
- `edge-host`: Default is "ton.access.orbs.network"
- `node-id`: Identifier of the specific access node
- `url-version`: Version of the URL format
- `network`: "mainnet" or "testnet"
- `protocol`: "toncenter-api-v2", "ton-api-v4", or "adnl-proxy"
- `suffix`: Protocol-specific endpoint (e.g., "jsonRPC")

## Architecture Considerations

### Decentralization
- Uses multiple nodes to avoid single points of failure
- Implements load balancing across healthy nodes
- Provides fallback mechanisms if nodes are unavailable

### Health Checking
- Tracks node health status
- Filters out unhealthy nodes
- Handles stale health data (10-minute threshold)

### Configuration Options
- Network selection (mainnet/testnet)
- Protocol selection
- Custom host configuration
- Protocol-specific options (JSON-RPC vs REST)

## Integration Points for MCP

To create an MCP server for TON Access, we need to:

1. Implement an MCP server that exposes TON Access functionality
2. Create protocol handlers for different TON RPC protocols
3. Design resources that represent TON blockchain data
4. Implement tools for interacting with the TON blockchain
5. Create a transport layer for communication between MCP clients and the server
