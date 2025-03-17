// Test file for ton-access-mcp validation
import { 
  TonAccessMCP, 
  getHttpEndpoint, 
  getHttpEndpoints, 
  getHttpV4Endpoint, 
  getHttpV4Endpoints,
  getAdnlProxyEndpoint,
  getAdnlProxyEndpoints,
  TonAccessConfig
} from './ton-access-mcp';

/**
 * Test function to validate the MCP implementation
 */
async function validateMCP() {
  console.log('Starting ton-access-mcp validation...');
  
  // Test TonAccessMCP class
  console.log('\nTesting TonAccessMCP class:');
  const mcp = new TonAccessMCP();
  
  // Test getHttpEndpoint with default config
  try {
    const endpoint = await mcp.getHttpEndpoint();
    console.log('✅ getHttpEndpoint (default):', endpoint);
  } catch (error) {
    console.error('❌ getHttpEndpoint (default) failed:', error.message);
  }
  
  // Test getHttpEndpoint with custom config
  try {
    const config: TonAccessConfig = {
      network: 'testnet',
      protocol: 'rest'
    };
    const endpoint = await mcp.getHttpEndpoint(config);
    console.log('✅ getHttpEndpoint (custom):', endpoint);
  } catch (error) {
    console.error('❌ getHttpEndpoint (custom) failed:', error.message);
  }
  
  // Test getHttpEndpoints
  try {
    const endpoints = await mcp.getHttpEndpoints();
    console.log('✅ getHttpEndpoints:', endpoints.length, 'endpoints returned');
  } catch (error) {
    console.error('❌ getHttpEndpoints failed:', error.message);
  }
  
  // Test getHttpV4Endpoint
  try {
    const endpoint = await mcp.getHttpV4Endpoint();
    console.log('✅ getHttpV4Endpoint:', endpoint);
  } catch (error) {
    console.error('❌ getHttpV4Endpoint failed:', error.message);
  }
  
  // Test getHttpV4Endpoint with unsupported protocol
  try {
    const config: TonAccessConfig = {
      protocol: 'json-rpc'
    };
    const endpoint = await mcp.getHttpV4Endpoint(config);
    console.error('❌ getHttpV4Endpoint should have failed with json-rpc protocol');
  } catch (error) {
    console.log('✅ getHttpV4Endpoint correctly failed with json-rpc protocol:', error.message);
  }
  
  // Test getHttpV4Endpoints
  try {
    const endpoints = await mcp.getHttpV4Endpoints();
    console.log('✅ getHttpV4Endpoints:', endpoints.length, 'endpoints returned');
  } catch (error) {
    console.error('❌ getHttpV4Endpoints failed:', error.message);
  }
  
  // Test getAdnlProxyEndpoint
  try {
    const result = await mcp.getAdnlProxyEndpoint();
    console.log('✅ getAdnlProxyEndpoint:', result);
  } catch (error) {
    console.error('❌ getAdnlProxyEndpoint failed:', error.message);
  }
  
  // Test getAdnlProxyEndpoints
  try {
    const endpoints = await mcp.getAdnlProxyEndpoints();
    console.log('✅ getAdnlProxyEndpoints:', endpoints.length, 'endpoints returned');
  } catch (error) {
    console.error('❌ getAdnlProxyEndpoints failed:', error.message);
  }
  
  // Test standalone functions
  console.log('\nTesting standalone functions:');
  
  // Test getHttpEndpoint function
  try {
    const endpoint = await getHttpEndpoint();
    console.log('✅ getHttpEndpoint function:', endpoint);
  } catch (error) {
    console.error('❌ getHttpEndpoint function failed:', error.message);
  }
  
  // Test getHttpEndpoints function
  try {
    const endpoints = await getHttpEndpoints();
    console.log('✅ getHttpEndpoints function:', endpoints.length, 'endpoints returned');
  } catch (error) {
    console.error('❌ getHttpEndpoints function failed:', error.message);
  }
  
  // Test getHttpV4Endpoint function
  try {
    const endpoint = await getHttpV4Endpoint();
    console.log('✅ getHttpV4Endpoint function:', endpoint);
  } catch (error) {
    console.error('❌ getHttpV4Endpoint function failed:', error.message);
  }
  
  // Test getHttpV4Endpoints function
  try {
    const endpoints = await getHttpV4Endpoints();
    console.log('✅ getHttpV4Endpoints function:', endpoints.length, 'endpoints returned');
  } catch (error) {
    console.error('❌ getHttpV4Endpoints function failed:', error.message);
  }
  
  // Test getAdnlProxyEndpoint function
  try {
    const result = await getAdnlProxyEndpoint();
    console.log('✅ getAdnlProxyEndpoint function:', result);
  } catch (error) {
    console.error('❌ getAdnlProxyEndpoint function failed:', error.message);
  }
  
  // Test getAdnlProxyEndpoints function
  try {
    const endpoints = await getAdnlProxyEndpoints();
    console.log('✅ getAdnlProxyEndpoints function:', endpoints.length, 'endpoints returned');
  } catch (error) {
    console.error('❌ getAdnlProxyEndpoints function failed:', error.message);
  }
  
  console.log('\nValidation complete!');
}

// Run the validation
validateMCP().catch(error => {
  console.error('Validation failed with error:', error);
});
