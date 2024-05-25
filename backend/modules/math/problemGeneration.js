const generateArithmeticProblem = require('../math/generation/arithmetic/generateArithmetic');

const generateProblems = () => {
    const problems = [];

    for (let i = 0; i < 5; i++) {

        const { problemString, problemAnswer, problemInstructions} = generateArithmeticProblem()
        problems.push({ question: problemString, answer: problemAnswer });
        
    }
     
    return problems;
};

module.exports = generateProblems