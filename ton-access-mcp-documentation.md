# TON Access Model Context Protocol (MCP) Documentation

## Introduction

This document provides comprehensive documentation for the Model Context Protocol (MCP) developed for the `ton-access` library. The MCP is designed to help AI models understand and interact with the `ton-access` library, which provides decentralized RPC access to the TON blockchain.

## Purpose

The TON Access MCP serves as a bridge between AI models and the `ton-access` library, enabling models to:

1. Understand the structure and functionality of the library
2. Generate accurate code examples for developers
3. Provide helpful troubleshooting assistance
4. Explain complex concepts related to TON blockchain access

## MCP Components

The TON Access MCP consists of two main components:

1. **Design Document** (`ton-access-mcp-design.md`): A comprehensive overview of the library's purpose, components, and usage patterns.
2. **TypeScript Implementation** (`ton-access-mcp.ts`): A fully typed implementation that mirrors the original library's API with detailed documentation.

## API Reference

### Types and Interfaces

#### Network
```typescript
type Network = "mainnet" | "testnet";
```
Represents the available TON blockchain networks.

#### EdgeProtocol
```typescript
type EdgeProtocol = "toncenter-api-v2" | "ton-api-v4" | "adnl-proxy";
```
Represents the supported RPC protocols.

#### ProtocolFormat
```typescript
type ProtocolFormat = "default" | "json-rpc" | "rest";
```
Represents the format options for protocols.

#### TonAccessConfig
```typescript
interface TonAccessConfig {
  network?: Network;
  host?: string;
  accessVersion?: number;
  protocol?: ProtocolFormat;
}
```
Configuration interface for endpoint generation.

#### TonAccessNode
```typescript
interface TonAccessNode {
  NodeId: string;
  BackendName: string;
  Ip: string;
  Weight: number;
  Healthy: string;
  Mngr: {
    updated: string;
    health: Record<string, boolean>;
    successTS: number;
    errors: string[];
    code: number;
    text: string;
  };
}
```
Represents a node in the TON access network.

#### AdnlProxyEndpointResult
```typescript
interface AdnlProxyEndpointResult {
  endpoint: string;
  publicKey: string;
}
```
Result from ADNL proxy endpoint generation.

### Classes

#### TonAccessMCP

The main class that provides methods for generating endpoints.

##### Methods

- **getHttpEndpoint(config?: TonAccessConfig): Promise<string>**  
  Gets a single HTTP endpoint for TonCenter API v2.

- **getHttpEndpoints(config?: TonAccessConfig, single?: boolean): Promise<string[]>**  
  Gets multiple HTTP endpoints for TonCenter API v2.

- **getHttpV4Endpoint(config?: TonAccessConfig): Promise<string>**  
  Gets a single HTTP endpoint for TonHub API v4.

- **getHttpV4Endpoints(config?: TonAccessConfig, single?: boolean): Promise<string[]>**  
  Gets multiple HTTP endpoints for TonHub API v4.

- **getAdnlProxyEndpoint(): Promise<AdnlProxyEndpointResult>**  
  Gets ADNL proxy endpoint information.

- **getAdnlProxyEndpoints(): Promise<string[]>**  
  Gets multiple ADNL proxy endpoints.

### Standalone Functions

The MCP also provides standalone functions that mirror the original library's API:

- **getHttpEndpoint(config?: TonAccessConfig): Promise<string>**
- **getHttpEndpoints(config?: TonAccessConfig, single?: boolean): Promise<string[]>**
- **getHttpV4Endpoint(config?: TonAccessConfig): Promise<string>**
- **getHttpV4Endpoints(config?: TonAccessConfig, single?: boolean): Promise<string[]>**
- **getAdnlProxyEndpoint(): Promise<AdnlProxyEndpointResult>**
- **getAdnlProxyEndpoints(): Promise<string[]>**

## Usage Examples

### Basic Usage with TonClient

```typescript
import { getHttpEndpoint } from './ton-access-mcp';
import { TonClient, Address } from 'ton';

async function example() {
  const endpoint = await getHttpEndpoint(); // get the decentralized RPC endpoint
  const client = new TonClient({ endpoint }); // initialize ton library

  // make some query to mainnet
  const address = Address.parseFriendly("EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N").address;
  const balance = await client.getBalance(address);
  return balance;
}
```

### Using TonHub API v4

```typescript
import { TonClient4 } from 'ton';
import { getHttpV4Endpoint } from './ton-access-mcp';

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
import { getHttpEndpoint } from './ton-access-mcp';
import { TonClient } from 'ton';

async function example() {
  const endpoint = await getHttpEndpoint({
    network: "testnet" 
  });
  const client = new TonClient({ endpoint });
  
  // Now using testnet instead of mainnet
  // ...
}
```

### Using the TonAccessMCP Class

```typescript
import { TonAccessMCP } from './ton-access-mcp';
import { TonClient } from 'ton';

async function example() {
  const mcp = new TonAccessMCP();
  
  // Get endpoints for different protocols
  const v2Endpoint = await mcp.getHttpEndpoint();
  const v4Endpoint = await mcp.getHttpV4Endpoint();
  
  // Use with TonClient
  const client = new TonClient({ endpoint: v2Endpoint });
  
  // ...
}
```

## Error Handling

The MCP implements the same error handling as the original library:

```typescript
import { getHttpV4Endpoint } from './ton-access-mcp';

async function example() {
  try {
    // This will throw an error because json-rpc is not supported for V4 endpoints
    const endpoint = await getHttpV4Endpoint({
      protocol: "json-rpc"
    });
  } catch (error) {
    console.error("Error:", error.message);
    // Handle the error appropriately
  }
}
```

## Implementation Notes

The MCP implementation is designed to mirror the original library's API while providing detailed documentation and type definitions. It does not actually connect to the TON blockchain but provides placeholder URLs that demonstrate the expected format.

In a real-world scenario, you would replace the MCP with the actual `ton-access` library:

```typescript
// Using the MCP
import { getHttpEndpoint } from './ton-access-mcp';

// Using the actual library
import { getHttpEndpoint } from '@orbs-network/ton-access';
```

## Conclusion

This documentation provides a comprehensive guide to the TON Access Model Context Protocol. By using this MCP, AI models can better understand and interact with the `ton-access` library, providing more accurate and helpful assistance to developers working with the TON blockchain.
