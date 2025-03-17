# Model Context Protocol (MCP) for ton-access

## Overview

This document outlines the Model Context Protocol (MCP) for the `ton-access` library, which provides unthrottled anonymous RPC access to the TON blockchain via a robust decentralized network of nodes. The MCP is designed to help AI models understand the structure, functionality, and usage patterns of the library to provide better assistance to developers working with TON blockchain.

## Library Purpose

The `ton-access` library serves as a client-side solution for accessing the TON blockchain through a decentralized network of nodes. It eliminates the need for API keys and backend services, allowing dApp clients to make HTTP queries directly from the browser to the TON blockchain.

## Key Components

### 1. Endpoint Types

The library supports multiple RPC protocols for TON blockchain access:

- **TonCenter HTTP API v2**: Replaces the `https://toncenter.com/api/v2/jsonRPC` endpoint
- **TonHub HTTP API v4**: Replaces the `https://mainnet-v4.tonhubapi.com` endpoint
- **Raw ADNL Proxy**: (Coming soon) Direct access to TON nodes

### 2. Network Selection

The library supports different TON networks:

- **Mainnet**: Production TON blockchain network (default)
- **Testnet**: Test TON blockchain network

### 3. Node Management

- **Node Health Checking**: Monitors node health and filters out unhealthy nodes
- **Weighted Random Load Balancing**: Distributes requests across healthy nodes

### 4. URL Structure

Client endpoint URL format: `https://{edge-host}/{node-id}/{url-version}/{network}/{protocol}/{suffix}`

- `edge-host`: Default is "ton.access.orbs.network"
- `node-id`: ID recognizer of the access-node
- `url-version`: Version number, increases if edge/gateway logic changes
- `network`: "mainnet" or "testnet"
- `protocol`: "toncenter-api-v2", "ton-api-v4", or "adnl-proxy"
- `suffix`: Explicit endpoint per each protocol (e.g., "getMasterchainInfo")

## Core Classes and Functions

### Classes

1. **Access**
   - Main class for managing access to TON blockchain
   - Handles node selection and URL building

2. **Nodes**
   - Manages the collection of available nodes
   - Filters healthy nodes for specific protocols and networks

### Key Functions

1. **getHttpEndpoint(config?: Config): Promise<string>**
   - Returns a single endpoint URL for TonCenter HTTP API v2
   - Supports configuration for network and protocol

2. **getHttpEndpoints(config?: Config, single?: boolean): Promise<string[]>**
   - Returns multiple endpoint URLs for TonCenter HTTP API v2
   - Useful for implementing custom load balancing

3. **getHttpV4Endpoint(config?: Config): Promise<string>**
   - Returns a single endpoint URL for TonHub HTTP API v4
   - Supports configuration for network

4. **getHttpV4Endpoints(config?: Config, single?: boolean): Promise<string[]>**
   - Returns multiple endpoint URLs for TonHub HTTP API v4
   - Useful for implementing custom load balancing

5. **getAdnlProxyEndpoint(): Promise<{endpoint: string, publicKey: string}>** (Coming soon)
   - Returns endpoint information for Raw ADNL Proxy

### Configuration Interface

```typescript
interface Config {
  network?: "mainnet" | "testnet"; // default: mainnet
  host?: string; // default: "ton.access.orbs.network"
  accessVersion?: number; // default: 1
  protocol?: "default" | "json-rpc" | "rest"; // default: "default"
}
```

## Usage Patterns

### Basic Usage with TonClient

```typescript
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient, Address } from "ton";

async function example() {
  const endpoint = await getHttpEndpoint(); // get the decentralized RPC endpoint
  const client = new TonClient({ endpoint }); // initialize ton library

  // make some query to mainnet
  const address = Address.parseFriendly("EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N").address;
  const balance = await client.getBalance(address);
  return balance;
}
```

### Basic Usage with TonWeb

```typescript
import { getHttpEndpoint } from "@orbs-network/ton-access";
import TonWeb from "tonweb";

async function example() {
  const endpoint = await getHttpEndpoint(); // get the decentralized RPC endpoint
  const tonweb = new TonWeb(new TonWeb.HttpProvider(endpoint)); // initialize tonweb library

  // make some query to mainnet
  const balance = await tonweb.getBalance("EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N");
  return balance;
}
```

### Using TonHub API v4

```typescript
import { TonClient4 } from "ton";
import { getHttpV4Endpoint } from "@orbs-network/ton-access";

async function example() {
  const endpoint = await getHttpV4Endpoint(); // get the decentralized RPC endpoint
  const client4 = new TonClient4({ endpoint }); // initialize ton library

  // make some query to mainnet
  const latestBlock = await client4.getLastBlock();
  const latestBlockNumber = latestBlock.last.seqno;
  return latestBlockNumber;
}
```

### Using Testnet

```typescript
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient } from "ton";

async function example() {
  const endpoint = await getHttpEndpoint({
    network: "testnet" 
  });
  const client = new TonClient({ endpoint });
  
  // Now using testnet instead of mainnet
  // ...
}
```

### Browser Usage with HTML Script

```html
<script src="https://cdn.jsdelivr.net/gh/orbs-network/ton-access@2.2.2/dist/index.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/toncenter/tonweb/dist/tonweb.js"></script>
<script>
    document.addEventListener("DOMContentLoaded", function () {
        TonAccess.getHttpEndpoint().then((endpoint) => { // get the decentralized RPC endpoint
            const tonweb = new TonWeb(new TonWeb.HttpProvider(endpoint)); // initialize tonweb library
            // make some query to mainnet
            tonweb.getBalance("EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N").then((balance) => {
                console.log(balance);
            });
        });
    });
</script>
```

## Common Errors and Solutions

1. **No healthy nodes available**
   - Error: `no healthy nodes for {protonet}`
   - Solution: Check network connectivity or try again later

2. **All nodes stale**
   - Error: `all nodes manager's data are stale`
   - Solution: Check network connectivity or try again later

3. **Protocol not supported**
   - Error: `config.protocol json-rpc is not supported for getTonApiV4Endpoints`
   - Solution: Use a different protocol or endpoint function

4. **Fetch exception**
   - Error: `exception in fetch({nodesUrl}): {e}`
   - Solution: Check network connectivity or URL validity

## Best Practices

1. **Error Handling**: Always implement proper error handling when using the library functions, as network issues or node unavailability can occur.

2. **Configuration Reuse**: When making multiple calls, store and reuse the endpoint rather than generating a new one for each call.

3. **Network Selection**: Be explicit about which network you're using in production code to avoid accidental testnet usage.

4. **Protocol Selection**: Choose the appropriate protocol based on your specific needs:
   - Use TonCenter HTTP API v2 for general-purpose access
   - Use TonHub HTTP API v4 for specific TonHub features
   - Use Raw ADNL Proxy for direct node access (when available)

5. **Caching**: Consider implementing caching for frequently accessed data to reduce load on the TON network.

## Integration with Other Libraries

The ton-access library is designed to work seamlessly with:

1. **ton.js**: Official TON SDK for JavaScript/TypeScript
2. **tonweb.js**: Alternative TON SDK
3. **ton-lite-client**: For direct ADNL access

## Conclusion

This Model Context Protocol provides a comprehensive understanding of the ton-access library's structure, functionality, and usage patterns. By following this protocol, AI models can provide more accurate and helpful assistance to developers working with the TON blockchain through the ton-access library.
