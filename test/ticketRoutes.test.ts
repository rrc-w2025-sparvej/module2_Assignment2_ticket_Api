import request from "supertest";
import app from "../src/app";

describe("Ticket API routes", () => {

  it("should create a new ticket", async () => {
    // Arrange
    const newTicket = {
      title: "Test ticket",
      description: "Created during testing",
      priority: "low"
    };

    // Act
    const response = await request(app)
      .post("/api/v1/tickets")
      .send(newTicket);

    // Assert
    expect(response.status).toBe(201);
    expect(response.body.title).toBe(newTicket.title);
  });

  it("should return all tickets", async () => {
    // Act
    const response = await request(app).get("/api/v1/tickets");

    // Assert
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should return 404 when ticket does not exist", async () => {
    // Act
    const response = await request(app).get("/api/v1/tickets/9999");

    // Assert
    expect(response.status).toBe(404);
  });

});
