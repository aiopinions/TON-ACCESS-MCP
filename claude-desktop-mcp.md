# TON Access Model Context Protocol for Claude Desktop

## Overview

This document provides a specialized Model Context Protocol (MCP) for the `ton-access` library, formatted specifically for Claude Desktop. The protocol is designed to help Claude understand and assist with queries related to the TON blockchain access library.

## Library Purpose

The `ton-access` library provides unthrottled anonymous RPC access to the TON blockchain via a decentralized network of nodes operated by Orbs Network. It allows dApp clients to make HTTP queries directly from the browser to the TON blockchain without requiring API keys or backend services.

## Key Concepts

### Endpoint Types
- **TonCenter HTTP API v2**: Standard JSON-RPC interface for TON blockchain
- **TonHub HTTP API v4**: Alternative API with different method signatures
- **ADNL Proxy**: Direct access to TON nodes (coming soon)

### Networks
- **Mainnet**: Production TON blockchain network
- **Testnet**: Test TON blockchain network for development

### Node Management
- Automatic health checking of nodes
- Weighted random load balancing across healthy nodes
- Stale period detection (10 minutes)

## Core Functions

### getHttpEndpoint
```typescript
async function getHttpEndpoint(config?: {
  network?: "mainnet" | "testnet";
  host?: string;
  accessVersion?: number;
  protocol?: "default" | "json-rpc" | "rest";
}): Promise<string>
```

Returns a single endpoint URL for TonCenter HTTP API v2. This is the most commonly used function.

### getHttpV4Endpoint
```typescript
async function getHttpV4Endpoint(config?: {
  network?: "mainnet" | "testnet";
  host?: string;
  accessVersion?: number;
  protocol?: "default" | "json-rpc" | "rest";
}): Promise<string>
```

Returns a single endpoint URL for TonHub HTTP API v4.

### getAdnlProxyEndpoint
```typescript
async function getAdnlProxyEndpoint(): Promise<{
  endpoint: string;
  publicKey: string;
}>
```

Returns endpoint information for Raw ADNL Proxy (coming soon).

## URL Structure

Client endpoint URL format: 
```
https://{edge-host}/{node-id}/{url-version}/{network}/{protocol}/{suffix}
```

- `edge-host`: Default is "ton.access.orbs.network"
- `node-id`: ID recognizer of the access-node
- `url-version`: Version number (default: 1)
- `network`: "mainnet" or "testnet"
- `protocol`: "toncenter-api-v2", "ton-api-v4", or "adnl-proxy"
- `suffix`: Endpoint-specific suffix (e.g., "jsonRPC" or "")

## Common Usage Patterns

### Basic Usage with TonClient
```typescript
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient, Address } from "ton";

const endpoint = await getHttpEndpoint(); // get the decentralized RPC endpoint
const client = new TonClient({ endpoint }); // initialize ton library

// make some query to mainnet
const address = Address.parseFriendly("EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N").address;
const balance = await client.getBalance(address);
```

### Using TonWeb
```typescript
import { getHttpEndpoint } from "@orbs-network/ton-access";
import TonWeb from "tonweb";

const endpoint = await getHttpEndpoint(); // get the decentralized RPC endpoint
const tonweb = new TonWeb(new TonWeb.HttpProvider(endpoint)); // initialize tonweb library

// make some query to mainnet
const balance = await tonweb.getBalance("EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N");
```

### Using TonHub API v4
```typescript
import { TonClient4 } from "ton";
import { getHttpV4Endpoint } from "@orbs-network/ton-access";

const endpoint = await getHttpV4Endpoint(); // get the decentralized RPC endpoint
const client4 = new TonClient4({ endpoint }); // initialize ton library

// make some query to mainnet
const latestBlock = await client4.getLastBlock();
const latestBlockNumber = latestBlock.last.seqno;
```

### Using Testnet
```typescript
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient } from "ton";

const endpoint = await getHttpEndpoint({
  network: "testnet" 
});
const client = new TonClient({ endpoint });
// Now using testnet instead of mainnet
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

## Best Practices

1. **Error Handling**: Always implement proper error handling when using the library functions
2. **Configuration Reuse**: Store and reuse the endpoint rather than generating a new one for each call
3. **Network Selection**: Be explicit about which network you're using in production code
4. **Protocol Selection**: Choose the appropriate protocol based on your specific needs
5. **Caching**: Consider implementing caching for frequently accessed data

## Internal Implementation Details

The library works by:
1. Fetching a list of available nodes from the Orbs Network
2. Filtering out unhealthy nodes
3. Selecting nodes based on weighted random algorithm
4. Building endpoint URLs with the correct format
5. Providing these endpoints to the developer for use with TON clients

The node health is determined by:
- Regular health checks performed by the Orbs Network
- Stale period detection (10 minutes)
- Protocol-specific health status

## Response Format for Claude

When responding to questions about ton-access, Claude should:

1. Identify the specific endpoint function needed based on the user's requirements
2. Provide complete code examples with proper imports and error handling
3. Explain the purpose of each part of the code
4. Mention relevant configuration options when applicable
5. Include information about potential errors and how to handle them
6. Suggest best practices for production use

## Example Response Template

When asked about using ton-access, Claude can use this template:

```
To access the TON blockchain using the ton-access library, you'll need to:

1. Install the package:
   ```bash
   npm install @orbs-network/ton-access
   ```

2. Import the necessary functions:
   ```typescript
   import { getHttpEndpoint } from "@orbs-network/ton-access";
   import { TonClient } from "ton";
   ```

3. Get an endpoint and initialize the client:
   ```typescript
   const endpoint = await getHttpEndpoint(); // Connects to mainnet by default
   const client = new TonClient({ endpoint });
   ```

4. Make your blockchain queries:
   ```typescript
   // Example: Get account balance
   const balance = await client.getBalance("EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N");
   console.log(balance);
   ```

5. Add error handling:
   ```typescript
   try {
     const endpoint = await getHttpEndpoint();
     // ...
   } catch (error) {
     console.error("Error accessing TON blockchain:", error.message);
   }
   ```

The ton-access library provides decentralized access to TON blockchain without requiring API keys or backend services.
```
