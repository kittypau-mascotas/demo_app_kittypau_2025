import assert from "node:assert";
// @ts-ignore
import handler from "../api/index.ts";

async function runTests() {
    console.log("Running API tests...");

    // Test 1: Health check
    const healthRequest = new Request("http://localhost/api/health");
    // @ts-ignore
    const healthResponse = await handler(healthRequest);
    const healthBody = await healthResponse.json();
    assert.strictEqual(healthResponse.status, 200, "Health check should return 200");
    assert.strictEqual(healthBody.status, "ok", "Health check should have status ok");
    console.log("✓ Health check test passed");

    // Test 2: Not found
    const notFoundRequest = new Request("http://localhost/api/nonexistent");
    // @ts-ignore
    const notFoundResponse = await handler(notFoundRequest);
    assert.strictEqual(notFoundResponse.status, 404, "Non-existent route should return 404");
    console.log("✓ Not found test passed");

    console.log("All tests passed!");
}

runTests().catch(e => {
    console.error("Test failed", e);
    process.exit(1);
});