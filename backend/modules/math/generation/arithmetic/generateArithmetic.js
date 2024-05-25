const { generateRandomNaturalNumber } = require('./../../generation/numbers/generateNumbers');
const generateMathBattlesProblemPacket = require('./../../mathPacket/generateMBPacket');

const typesOfArithmeticOperations = require('./../../../../statics/math/arithmeticOperations/typesOfArithmeticOperations');
const possibleArithmeticInstructions = require('../../../../statics/problemInstructions/arithmetic/arithmeticProblemInstructions');

const generateArithmeticProblem = () => {

    // (1): Randomly generate an "instruction string":
    const mathBattlesProblemInstructions = pickRandomArithmeticInstructions();

    // (2): Randomly generate a random Natural Number:
    const randomlyChosenNaturalNumberOneAsNumber = generateRandomNaturalNumber();
    
    // (3): Randomly generate another random Natural Number:
    const randomlyChosenNaturalNumberTwoAsNumber = generateRandomNaturalNumber();

    // (4): Cast the first random number to a String:
    const randomlyChosenNaturalNumberOneAsString = String(randomlyChosenNaturalNumberOneAsNumber);

    // (5): Cast the second random number to a String:
    const randomlyChosenNaturalNumberTwoAsString = String(randomlyChosenNaturalNumberTwoAsNumber);

    // (6): Initialize the problem answer as a Float or Integer:
    let mathBattlesProblemAnswerAsNumber;

    // (7): Initialize the arithmetic operation (+, -, x, ...) as a String:
    let randomlyChosenArithmeticOperationAsString;

    // (8): Randomly select an arithmetic operation to perform operation(N1, N2):
    const randomlyChosenArithmeticOperation = pickRandomArithmeticOperation();
    
    // (9.1): If the arithmetic operation chosen was Addition:
    if (randomlyChosenArithmeticOperation === typesOfArithmeticOperations.ADDITION) {
    
        mathBattlesProblemAnswerAsNumber = randomlyChosenNaturalNumberOneAsNumber + randomlyChosenNaturalNumberTwoAsNumber;
        randomlyChosenArithmeticOperationAsString = typesOfArithmeticOperations.ADDITION_LATEX_SYMBOL

    // (9.2): If the arithmetic operation chosen was Subtraction:
    } else if (randomlyChosenArithmeticOperation === typesOfArithmeticOperations.SUBTRACTION) {
    
        mathBattlesProblemAnswerAsNumber = randomlyChosenNaturalNumberOneAsNumber - randomlyChosenNaturalNumberTwoAsNumber;
        randomlyChosenArithmeticOperationAsString = typesOfArithmeticOperations.SUBTRACTION_LATEX_SYMBOL
    
    // (9.3): If the arithmetic operation chosen was Multiplication:
    } else if (randomlyChosenArithmeticOperation === typesOfArithmeticOperations.MULTIPLICATION) {
    
        mathBattlesProblemAnswerAsNumber = randomlyChosenNaturalNumberOneAsNumber * randomlyChosenNaturalNumberTwoAsNumber;
        randomlyChosenArithmeticOperationAsString = typesOfArithmeticOperations.MULTIPLICATION_LATEX_SYMBOL
    
    // (9.4): If the arithmetic operation chosen was Division:
    } else if (randomlyChosenArithmeticOperation === typesOfArithmeticOperations.DIVISION) {
    
        mathBattlesProblemAnswerAsNumber = randomlyChosenNaturalNumberOneAsNumber / randomlyChosenNaturalNumberTwoAsNumber;
        randomlyChosenArithmeticOperationAsString = typesOfArithmeticOperations.DIVISION_LATEX_SYMBOL
    
    // (9.5): If there's some unusual edge case:
    } else {
    
        mathBattlesProblemAnswerAsNumber = 0;
        randomlyChosenArithmeticOperationAsString = '';
    
    } 
    
    const mathBattlesProblemAnswerAsSring = String(mathBattlesProblemAnswerAsNumber)
    const mathBattlesProblemAsString = `${randomlyChosenNaturalNumberOneAsString}${randomlyChosenArithmeticOperationAsString}${randomlyChosenNaturalNumberTwoAsString}`
    // The line below is ONLY WHEN WE HAVE LATEX SUPPORT:
    // const mathBattlesProblemAsString = `$$${randomlyChosenNaturalNumberOneAsString}${randomlyChosenArithmeticOperationAsString}${randomlyChosenNaturalNumberTwoAsString}$$`

    const mathBattlesProblemPacket = generateMathBattlesProblemPacket(mathBattlesProblemAsString, mathBattlesProblemAnswerAsSring, mathBattlesProblemInstructions);
    return mathBattlesProblemPacket;
};

const pickRandomArithmeticOperation = () => {
    try {
        return typesOfArithmeticOperations.ARRAY_OF_SIMPLE_OPERATIONS[Math.floor(Math.random() * typesOfArithmeticOperations.ARRAY_OF_SIMPLE_OPERATIONS.length)];
    } catch (error) {
        return typesOfArithmeticOperations.ADDITION;
    }
}

const pickRandomArithmeticInstructions = () => {
    try {
        return possibleArithmeticInstructions.POSSIBLE_ARITHMETIC_INSTRUCTIONS[Math.floor(Math.random() * possibleArithmeticInstructions.POSSIBLE_ARITHMETIC_INSTRUCTIONS.length)];
    } catch (error) {
        return possibleArithmeticInstructions.ADDITION;
    }
}

module.exports = generateArithmeticProblem