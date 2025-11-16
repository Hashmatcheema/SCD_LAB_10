const { celsiusToFahrenheit, fahrenheitToCelsius } = require('./converter');

// Test suite for Temperature Converter
let testsPassed = 0;
let testsFailed = 0;

function test(description, fn) {
    try {
        fn();
        testsPassed++;
        console.log(`✅ ${description}`);
    } catch (error) {
        testsFailed++;
        console.error(`❌ ${description}`);
        console.error(`   Error: ${error.message}`);
    }
}

function assertEqual(actual, expected, message) {
    if (Math.abs(actual - expected) > 0.01) {
        throw new Error(`${message}. Expected ${expected}, but got ${actual}`);
    }
}

function assertThrows(fn, errorMessage) {
    try {
        fn();
        throw new Error('Expected function to throw an error');
    } catch (error) {
        if (!error.message.includes(errorMessage)) {
            throw new Error(`Expected error message to include "${errorMessage}", but got "${error.message}"`);
        }
    }
}

console.log('🧪 Running Temperature Converter Tests...\n');

// Test 1: Convert 0°C to Fahrenheit (should return 32°F)
test('Convert 0°C to Fahrenheit', () => {
    const result = celsiusToFahrenheit(0);
    assertEqual(result, 32, '0°C should equal 32°F');
});

// Test 2: Convert 100°C to Fahrenheit (should return 212°F)
test('Convert 100°C to Fahrenheit', () => {
    const result = celsiusToFahrenheit(100);
    assertEqual(result, 212, '100°C should equal 212°F');
});

// Test 3: Convert 212°F to Celsius (should return 100°C)
test('Convert 212°F to Celsius', () => {
    const result = fahrenheitToCelsius(212);
    assertEqual(result, 100, '212°F should equal 100°C');
});

// Test 4: Convert 32°F to Celsius (should return 0°C)
test('Convert 32°F to Celsius', () => {
    const result = fahrenheitToCelsius(32);
    assertEqual(result, 0, '32°F should equal 0°C');
});

// Test 5: Convert -40°C to Fahrenheit (edge case - should return -40°F)
test('Convert -40°C to Fahrenheit (edge case)', () => {
    const result = celsiusToFahrenheit(-40);
    assertEqual(result, -40, '-40°C should equal -40°F');
});

// Test 6: Convert -40°F to Celsius (edge case - should return -40°C)
test('Convert -40°F to Celsius (edge case)', () => {
    const result = fahrenheitToCelsius(-40);
    assertEqual(result, -40, '-40°F should equal -40°C');
});

// Test 7: Error handling for invalid input (Celsius)
test('Error handling for invalid Celsius input', () => {
    assertThrows(() => celsiusToFahrenheit('invalid'), 'Input must be a number');
});

// Test 8: Error handling for invalid input (Fahrenheit)
test('Error handling for invalid Fahrenheit input', () => {
    assertThrows(() => fahrenheitToCelsius('invalid'), 'Input must be a number');
});

// Test Summary
console.log('\n📊 Test Summary:');
console.log(`   Passed: ${testsPassed}`);
console.log(`   Failed: ${testsFailed}`);
console.log(`   Total:  ${testsPassed + testsFailed}`);

if (testsFailed === 0) {
    console.log('\n🎉 All tests passed!');
    process.exit(0);
} else {
    console.log('\n❌ Some tests failed!');
    process.exit(1);
}

