# Temperature Converter App

A simple Node.js application that converts temperatures between Celsius and Fahrenheit with automated testing using GitHub Actions.

## Features

- Convert Celsius to Fahrenheit
- Convert Fahrenheit to Celsius
- Comprehensive test suite
- Automated testing with GitHub Actions
- Error handling for invalid inputs

## Files

- `converter.js` - Main application with conversion functions
- `test.js` - Test suite with multiple test cases
- `package.json` - Node.js package configuration
- `README.md` - This documentation file

## Installation

```bash
cd Task2
npm install
```

## Usage

### Run the application:
```bash
npm start
```

### Run tests:
```bash
npm test
```

## Test Cases

The test suite includes the following test cases:

1. **Convert 0°C to Fahrenheit** - Should return 32°F
2. **Convert 100°C to Fahrenheit** - Should return 212°F
3. **Convert 212°F to Celsius** - Should return 100°C
4. **Convert 32°F to Celsius** - Should return 0°C
5. **Convert -40°C to Fahrenheit** - Edge case (should return -40°F)
6. **Convert -40°F to Celsius** - Edge case (should return -40°C)
7. **Error handling** - Tests invalid input handling

## Conversion Formulas

- **Celsius to Fahrenheit**: `F = (C × 9/5) + 32`
- **Fahrenheit to Celsius**: `C = (F - 32) × 5/9`

## GitHub Actions

The project includes automated testing that runs on every push and pull request:

- Automatically checks out the repository
- Sets up Node.js environment
- Installs dependencies
- Runs the test suite
- Reports success or failure

## Requirements

- Node.js 14.0.0 or higher
- npm (comes with Node.js)
