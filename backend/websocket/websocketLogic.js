const handleAnswer = require('../modules/math/handleAnswer');
const generateProblems = require('../modules/math/problemGeneration');

const handleConnection = (websocket, matchmakingQueue) => {

    websocket.on('message', (clientData) => {
        const data = JSON.parse(clientData);

        if (data.type === 'joinQueue') {

            matchmakingQueue.push(websocket);

            if (matchmakingQueue.length >= 2) {
                const player1 = matchmakingQueue.shift();
                const player2 = matchmakingQueue.shift();
                startGame(player1, player2);
            }
        }
    });
};

const startGame = (player1WebSocket, player2WebSocket) => {
    
    const problems = generateProblems();

    const serverGameState = {
        player1: { webSocketInstance: player1WebSocket, currentProblemIndex: 0, score: 0 },
        player2: { webSocketInstance: player2WebSocket, currentProblemIndex: 0, score: 0 },
        problems
    };

    const clientGameState = {
        player1: { currentProblemIndex: 0, score: 0 },
        player2: { currentProblemIndex: 0, score: 0 },
        problems
    };

    player1WebSocket.send(JSON.stringify({ type: 'startGame', problems, player: 'player1', gameState: clientGameState }));
    player2WebSocket.send(JSON.stringify({ type: 'startGame', problems, player: 'player2', gameState: clientGameState }));

    player1WebSocket.on('message', (clientMessage) => handleAnswer(clientMessage, serverGameState, 'player1'));
    player2WebSocket.on('message', (clientMessage) => handleAnswer(clientMessage, serverGameState, 'player2'));
};

module.exports = {
    handleConnection
};