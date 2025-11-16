const fs = require("fs");
const path = require("path");

// Path to the data file
const dataFile = path.join(__dirname, "../data/events.json");

// Load events from file (handle empty file)
function loadEvents() {
    if (!fs.existsSync(dataFile)) {
        return [];  // If file does not exist, return empty array
    }
    
    const data = fs.readFileSync(dataFile, "utf8");
    if (!data.trim()) {  // If file is empty, return an empty array
        return [];
    }

    try {
        return JSON.parse(data);
    } catch (error) {
        console.error("❌ Error parsing events.json. Resetting file...");
        fs.writeFileSync(dataFile, JSON.stringify([]));  // Reset file
        return [];
    }
}

// Save events to file
function saveEvents(events) {
    fs.writeFileSync(dataFile, JSON.stringify(events, null, 2));
}

// Create an event
function createEvent(name, description, date, time, category, userId) {
    const events = loadEvents();
    const newEvent = {
        id: events.length + 1,
        name,
        description,
        date,
        time,
        category,
        userId
    };
    events.push(newEvent);
    saveEvents(events);
    console.log("✅ Event Created:", newEvent);
}

// View events based on filters
function viewEvents(filter = {}) {
    const events = loadEvents();
    return events.filter(event => {
        return Object.keys(filter).every(key => event[key] === filter[key]);
    });
}

// Export functions
module.exports = { createEvent, viewEvents };
