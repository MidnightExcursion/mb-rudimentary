/**
 * 
 * @param {*} message some shit
 * @param {Object} serverGameState the server's version of the GameState
 * @param {String} playerKey the string representing the "key" of the player (1 or 2)
 */
const handleAnswer = (message, serverGameState, playerKey) => {

    console.log(`> ${playerKey} answered the question.`)

    // (1): Obtain the player's Game State:
    const currentPlayerServerGameState = serverGameState[playerKey]

    // (2): Obtain the player's WebSocket instance:
    const currentPlayerWebSocket = currentPlayerServerGameState.webSocketInstance

    // (3): Obtain the player's current problem (to then see if the answer is right):
    const currentPlayerProblemIndex = currentPlayerServerGameState.currentProblemIndex

    // (4): Obtain the player's score:
    const currentPlayerScore = currentPlayerServerGameState.score

    // (5): Obtain the other player's key based on the fact that there are two players in a game:
    const otherPlayerKey = playerKey === 'player1' ? 'player2' : 'player1';

    // (6): Obtain the other player's WebSocket Instancer:
    const otherPlayerWebSocket = serverGameState[otherPlayerKey].webSocketInstance

    const data = JSON.parse(message);
    const { answer } = data;

     
    const currentProblemCorrectAnswer = serverGameState.problems[currentPlayerProblemIndex].answer;

    if (answer == currentProblemCorrectAnswer) {

        currentPlayerServerGameState.currentProblemIndex++;
        currentPlayerServerGameState.score++;            
        
        if (currentPlayerServerGameState.score !== 5) {

            const clientGameState = {
                player1: { currentProblemIndex: serverGameState.player1.currentProblemIndex, score: serverGameState.player1.score },
                player2: { currentProblemIndex: serverGameState.player2.currentProblemIndex, score: serverGameState.player2.score },
                problems: serverGameState.problems
            };

            currentPlayerWebSocket.send(JSON.stringify({ type: 'correctAnswer', player: playerKey, gameState: clientGameState }));
            otherPlayerWebSocket.send(JSON.stringify({ type: 'updateState', player: otherPlayerKey, gameState: clientGameState }));

        } else {

            console.log(`> Game has ended!`);

            currentPlayerWebSocket.send(JSON.stringify({ type: 'gameOver', result: 'win' }));
            otherPlayerWebSocket.send(JSON.stringify({ type: 'gameOver', result: 'lose' }));

            // Close both WebSocket connections
            currentPlayerWebSocket.close();
            console.log(`> Closed the current player's websocket`)
            otherPlayerWebSocket.close();
            console.log(`> Closed the other player's websocket.`)
            
            // Clean up server-side resources
            delete serverGameState[playerKey];
            delete serverGameState[otherPlayerKey];
            
            return;

        }

    } else {

        const clientGameState = {
            player1: { currentProblemIndex: serverGameState.player1.currentProblemIndex, score: serverGameState.player1.score },
            player2: { currentProblemIndex: serverGameState.player2.currentProblemIndex, score: serverGameState.player2.score },
            problems: serverGameState.problems
        };

        currentPlayerWebSocket.send(JSON.stringify({ type: 'incorrectAnswer', player: playerKey, gameState: clientGameState }));
        otherPlayerWebSocket.send(JSON.stringify({ type: 'updateState', player: otherPlayerKey, gameState: clientGameState }));
    
    };

};

module.exports = handleAnswer;