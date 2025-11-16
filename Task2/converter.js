function celsiusToFahrenheit(celsius) {
    if (typeof celsius !== 'number') {
        throw new Error('Input must be a number');
    }
    return (celsius * 9/5) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
    if (typeof fahrenheit !== 'number') {
        throw new Error('Input must be a number');
    }
    return (fahrenheit - 32) * 5/9;
}

module.exports = {
    celsiusToFahrenheit,
    fahrenheitToCelsius
};

if (require.main === module) {
    console.log('Temperature Converter Examples:');
    console.log('0°C =', celsiusToFahrenheit(0), '°F');
    console.log('100°C =', celsiusToFahrenheit(100), '°F');
    console.log('212°F =', fahrenheitToCelsius(212), '°C');
    console.log('32°F =', fahrenheitToCelsius(32), '°C');
}
