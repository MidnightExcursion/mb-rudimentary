function generateRandomNaturalNumber(lowerBound = 1, upperBound = 50) {
    const emergencyRandomNaturalNumber = []
    try {
        const generatedRandomNaturalNumber = Math.ceil(Math.random() * upperBound);
        return generatedRandomNaturalNumber;
    } catch (error) {
        return emergencyRandomNaturalNumber;
    }
}

function generateRandomIntegerNumber(lowerBound = 1, upperBound = 50) {
    const emergencyRandomIntegerNumber = []
    try {
        const generatedRandomIntegerNumber = Math.ceil(Math.random() * upperBound);
        return generatedRandomIntegerNumber;
    } catch (error) {
        return emergencyRandomIntegerNumber;
    }
}

module.exports = {
    generateRandomNaturalNumber,
    generateRandomIntegerNumber,
    // generateRandomWholeNumber,
    // generateRandomRealNumber,
    // generateRandomComplexNumber
}