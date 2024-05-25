const generateMathBattlesProblemPacket = (problemString, problemAnswer, mathBattlesProblemInstructions) => {
    return {
        problemString: problemString,
        problemAnswer: problemAnswer,
        problemInstructions: mathBattlesProblemInstructions
    }
}

module.exports = generateMathBattlesProblemPacket