const generateProblems = () => {
    const problems = [];

    for (let i = 0; i < 5; i++) {
        const a = Math.floor(Math.random() * 10);
        const b = Math.floor(Math.random() * 10);
        problems.push({ question: `${a} + ${b}`, answer: a + b });
    }
     
    return problems;
};

module.exports = generateProblems