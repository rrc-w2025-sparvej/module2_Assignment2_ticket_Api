import { calculateUrgency } from "../src/api/v1/services/ticketService";
import { Ticket } from "../src/data/tickets";

describe("Ticket urgency calculation", () => {

  it("should return RESOLVED for resolved tickets", () => {
    // Arrange
    const ticket: Ticket = {
      id: 1,
      title: "Resolved issue",
      description: "Already fixed",
      priority: "high",
      status: "resolved",
      createdAt: new Date()

    };

    // Act
    const result = calculateUrgency(ticket);

    // Assert
    expect(result.level).toBe("RESOLVED");
    expect(result.score).toBe(0);
  });

  it("should return LOW for a new low priority ticket", () => {
    // Arrange
    const ticket: Ticket = {
      id: 2,
      title: "Minor issue",
      description: "Small UI bug",
      priority: "low",
      status: "open",
      createdAt: new Date()
    };

    // Act
    const result = calculateUrgency(ticket);

    // Assert
    expect(result.level).toBe("LOW");
  });

  it("should increase urgency score as the ticket gets older", () => {
    // Arrange
    const oldDate = new Date();
    oldDate.setDate(oldDate.getDate() - 10);

    const ticket: Ticket = {
      id: 3,
      title: "Old ticket",
      description: "Ignored for days",
      priority: "medium",
      status: "open",
      createdAt: oldDate
    };

    // Act
    const result = calculateUrgency(ticket);

    // Assert
    expect(result.score).toBeGreaterThan(40);
  });

});
