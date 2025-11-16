const { createEvent, viewEvents } = require("./src/events");

// Test case: Create an event and verify it exists
console.log("🏁 Running basic event tests...");

// Create a test event
createEvent("Test Meeting", "Project discussion", "2025-03-15", "10:00 AM", "Meetings", 1);

// Retrieve all events
const events = viewEvents({ userId: 1 });
console.log("📌 Retrieved Events:", events);

// Validate result
if (events.length > 0) {
    console.log("Test Passed: Events are being created and retrieved.");
    process.exit(0);  // Success
} else {
    console.error("Test Failed: No events found.");
    process.exit(1);  // Failure (GitHub Actions will detect failure)
}
