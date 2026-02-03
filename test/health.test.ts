import request from "supertest";
import app from "../src/app";

describe("Health Check Endpoint", () => {
  it("should return API health status", async () => {
    // Arrange + Act
    const response = await request(app).get("/api/v1/health");

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("OK");
  });
});
