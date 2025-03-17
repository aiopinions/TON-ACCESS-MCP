/**
 * Model Context Protocol (MCP) for ton-access
 * 
 * This file implements a Model Context Protocol for the ton-access library,
 * which provides unthrottled anonymous RPC access to the TON blockchain
 * via a robust decentralized network of nodes.
 */

/**
 * Network types supported by ton-access
 */
export type Network = "mainnet" | "testnet";

/**
 * Protocol types supported by ton-access
 */
export type EdgeProtocol = "toncenter-api-v2" | "ton-api-v4" | "adnl-proxy";

/**
 * Protocol format options
 */
export type ProtocolFormat = "default" | "json-rpc" | "rest";

/**
 * Configuration interface for ton-access endpoints
 */
export interface TonAccessConfig {
  /** Network to connect to (default: "mainnet") */
  network?: Network;
  
  /** Host to use (default: "ton.access.orbs.network") */
  host?: string;
  
  /** Access version (default: 1) */
  accessVersion?: number;
  
  /** Protocol format (default: "default") */
  protocol?: ProtocolFormat;
}

/**
 * Node information interface
 */
export interface TonAccessNode {
  /** Unique identifier of the node */
  NodeId: string;
  
  /** Name of the backend */
  BackendName: string;
  
  /** IP address of the node */
  Ip: string;
  
  /** Weight for load balancing */
  Weight: number;
  
  /** Health status ("1" for healthy, "0" for unhealthy) */
  Healthy: string;
  
  /** Manager information */
  Mngr: {
    /** Last update timestamp */
    updated: string;
    
    /** Health status for different protocol-network combinations */
    health: Record<string, boolean>;
    
    /** Last successful timestamp */
    successTS: number;
    
    /** Error messages */
    errors: string[];
    
    /** Status code */
    code: number;
    
    /** Status text */
    text: string;
  };
}

/**
 * Result from ADNL proxy endpoint
 */
export interface AdnlProxyEndpointResult {
  /** Endpoint URL */
  endpoint: string;
  
  /** Public key for the endpoint */
  publicKey: string;
}

/**
 * Class representing the ton-access MCP
 */
export class TonAccessMCP {
  /**
   * Get a single HTTP endpoint for TonCenter API v2
   * 
   * @param config - Optional configuration
   * @returns Promise resolving to endpoint URL
   * @example
   * ```typescript
   * import { TonAccessMCP } from './ton-access-mcp';
   * import { TonClient } from 'ton';
   * 
   * async function example() {
   *   const mcp = new TonAccessMCP();
   *   const endpoint = await mcp.getHttpEndpoint();
   *   const client = new TonClient({ endpoint });
   *   // Use client to interact with TON blockchain
   * }
   * ```
   */
  async getHttpEndpoint(config?: TonAccessConfig): Promise<string> {
    // In a real implementation, this would call the actual ton-access library
    // For MCP purposes, we're providing the interface and documentation
    
    // Example implementation (not functional):
    // const access = new Access();
    // await access.init();
    // const endpoints = access.buildUrls(
    //   config?.network || "mainnet",
    //   "toncenter-api-v2",
    //   config?.protocol === "rest" ? "" : "jsonRPC",
    //   true
    // );
    // return endpoints[0];
    
    // For MCP demonstration, return a placeholder
    const network = config?.network || "mainnet";
    const protocol = config?.protocol === "rest" ? "" : "jsonRPC";
    const host = config?.host || "ton.access.orbs.network";
    const version = config?.accessVersion || 1;
    
    return `https://${host}/[node-id]/${version}/${network}/toncenter-api-v2/${protocol}`;
  }
  
  /**
   * Get multiple HTTP endpoints for TonCenter API v2
   * 
   * @param config - Optional configuration
   * @param single - Whether to return only a single endpoint
   * @returns Promise resolving to array of endpoint URLs
   * @example
   * ```typescript
   * import { TonAccessMCP } from './ton-access-mcp';
   * 
   * async function example() {
   *   const mcp = new TonAccessMCP();
   *   const endpoints = await mcp.getHttpEndpoints();
   *   // Use endpoints for custom load balancing
   * }
   * ```
   */
  async getHttpEndpoints(config?: TonAccessConfig, single?: boolean): Promise<string[]> {
    if (single) {
      const endpoint = await this.getHttpEndpoint(config);
      return [endpoint];
    }
    
    // For MCP demonstration, return placeholders
    const network = config?.network || "mainnet";
    const protocol = config?.protocol === "rest" ? "" : "jsonRPC";
    const host = config?.host || "ton.access.orbs.network";
    const version = config?.accessVersion || 1;
    
    return [
      `https://${host}/node1/${version}/${network}/toncenter-api-v2/${protocol}`,
      `https://${host}/node2/${version}/${network}/toncenter-api-v2/${protocol}`,
      `https://${host}/node3/${version}/${network}/toncenter-api-v2/${protocol}`
    ];
  }
  
  /**
   * Get a single HTTP endpoint for TonHub API v4
   * 
   * @param config - Optional configuration
   * @returns Promise resolving to endpoint URL
   * @example
   * ```typescript
   * import { TonAccessMCP } from './ton-access-mcp';
   * import { TonClient4 } from 'ton';
   * 
   * async function example() {
   *   const mcp = new TonAccessMCP();
   *   const endpoint = await mcp.getHttpV4Endpoint();
   *   const client = new TonClient4({ endpoint });
   *   // Use client to interact with TON blockchain
   * }
   * ```
   */
  async getHttpV4Endpoint(config?: TonAccessConfig): Promise<string> {
    // Check if json-rpc protocol is specified, which is not supported
    if (config?.protocol === "json-rpc") {
      throw new Error("config.protocol json-rpc is not supported for getTonApiV4Endpoints");
    }
    
    // For MCP demonstration, return a placeholder
    const network = config?.network || "mainnet";
    const host = config?.host || "ton.access.orbs.network";
    const version = config?.accessVersion || 1;
    
    return `https://${host}/[node-id]/${version}/${network}/ton-api-v4`;
  }
  
  /**
   * Get multiple HTTP endpoints for TonHub API v4
   * 
   * @param config - Optional configuration
   * @param single - Whether to return only a single endpoint
   * @returns Promise resolving to array of endpoint URLs
   * @example
   * ```typescript
   * import { TonAccessMCP } from './ton-access-mcp';
   * 
   * async function example() {
   *   const mcp = new TonAccessMCP();
   *   const endpoints = await mcp.getHttpV4Endpoints();
   *   // Use endpoints for custom load balancing
   * }
   * ```
   */
  async getHttpV4Endpoints(config?: TonAccessConfig, single?: boolean): Promise<string[]> {
    // Check if json-rpc protocol is specified, which is not supported
    if (config?.protocol === "json-rpc") {
      throw new Error("config.protocol json-rpc is not supported for getTonApiV4Endpoints");
    }
    
    if (single) {
      const endpoint = await this.getHttpV4Endpoint(config);
      return [endpoint];
    }
    
    // For MCP demonstration, return placeholders
    const network = config?.network || "mainnet";
    const host = config?.host || "ton.access.orbs.network";
    const version = config?.accessVersion || 1;
    
    return [
      `https://${host}/node1/${version}/${network}/ton-api-v4`,
      `https://${host}/node2/${version}/${network}/ton-api-v4`,
      `https://${host}/node3/${version}/${network}/ton-api-v4`
    ];
  }
  
  /**
   * Get ADNL proxy endpoint information
   * 
   * @returns Promise resolving to endpoint and public key
   * @example
   * ```typescript
   * import { TonAccessMCP } from './ton-access-mcp';
   * import { LiteClient, LiteSingleEngine } from 'ton-lite-client';
   * 
   * async function example() {
   *   const mcp = new TonAccessMCP();
   *   const { endpoint, publicKey } = await mcp.getAdnlProxyEndpoint();
   *   const engine = new LiteSingleEngine({ host: endpoint, publicKey });
   *   const client = new LiteClient({ engine });
   *   // Use client to interact with TON blockchain
   * }
   * ```
   */
  async getAdnlProxyEndpoint(): Promise<AdnlProxyEndpointResult> {
    // For MCP demonstration, return placeholders
    return {
      endpoint: "ws://[node-ip]:30001",
      publicKey: "sample-public-key"
    };
  }
  
  /**
   * Get multiple ADNL proxy endpoints
   * 
   * @returns Promise resolving to array of endpoint URLs
   */
  async getAdnlProxyEndpoints(): Promise<string[]> {
    // For MCP demonstration, return placeholders
    return [
      "ws://node1-ip:30001",
      "ws://node2-ip:30001",
      "ws://node3-ip:30001"
    ];
  }
}

// Export standalone functions that mirror the original library's API
/**
 * Get a single HTTP endpoint for TonCenter API v2
 * 
 * @param config - Optional configuration
 * @returns Promise resolving to endpoint URL
 */
export async function getHttpEndpoint(config?: TonAccessConfig): Promise<string> {
  const mcp = new TonAccessMCP();
  return mcp.getHttpEndpoint(config);
}

/**
 * Get multiple HTTP endpoints for TonCenter API v2
 * 
 * @param config - Optional configuration
 * @param single - Whether to return only a single endpoint
 * @returns Promise resolving to array of endpoint URLs
 */
export async function getHttpEndpoints(config?: TonAccessConfig, single?: boolean): Promise<string[]> {
  const mcp = new TonAccessMCP();
  return mcp.getHttpEndpoints(config, single);
}

/**
 * Get a single HTTP endpoint for TonHub API v4
 * 
 * @param config - Optional configuration
 * @returns Promise resolving to endpoint URL
 */
export async function getHttpV4Endpoint(config?: TonAccessConfig): Promise<string> {
  const mcp = new TonAccessMCP();
  return mcp.getHttpV4Endpoint(config);
}

/**
 * Get multiple HTTP endpoints for TonHub API v4
 * 
 * @param config - Optional configuration
 * @param single - Whether to return only a single endpoint
 * @returns Promise resolving to array of endpoint URLs
 */
export async function getHttpV4Endpoints(config?: TonAccessConfig, single?: boolean): Promise<string[]> {
  const mcp = new TonAccessMCP();
  return mcp.getHttpV4Endpoints(config, single);
}

/**
 * Get ADNL proxy endpoint information
 * 
 * @returns Promise resolving to endpoint and public key
 */
export async function getAdnlProxyEndpoint(): Promise<AdnlProxyEndpointResult> {
  const mcp = new TonAccessMCP();
  return mcp.getAdnlProxyEndpoint();
}

/**
 * Get multiple ADNL proxy endpoints
 * 
 * @returns Promise resolving to array of endpoint URLs
 */
export async function getAdnlProxyEndpoints(): Promise<string[]> {
  const mcp = new TonAccessMCP();
  return mcp.getAdnlProxyEndpoints();
}
