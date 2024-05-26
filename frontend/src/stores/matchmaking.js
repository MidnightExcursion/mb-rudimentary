import { defineStore } from 'pinia';

export const useGameStore = defineStore('game', {
    state: () => ({
        websocket: null,
        problems: [],
        currentProblem: 0,
        userValue: '',
        gameState: {
            player1: { score: 0, currentProblemIndex: 0 },
            player2: { score: 0, currentProblemIndex: 0 },
        },
        gameOver: false,
        result: ''
    }),
    actions: {
        connectWebsocket() {

            // (1): Connect to WS:
            const ws = new WebSocket('ws://localhost:8080');

            // (2): Put the WS Instance in the Store:
            this.websocket = ws;

            // (3): Open the WS:
            ws.onopen = () => {
                console.log('> Client WS has connected to the server WS.');

                ws.send(JSON.stringify({ type: 'joinQueue' }));

            };

            // (4): When the client WS receives a server "message":
            ws.onmessage = (serverMessage) => {

                const data = JSON.parse(serverMessage.data);
                console.log(data)

                if (data.type === 'startGame') {

                    console.log(data.player)

                    this.problems = data.problems;
                    this.gameState = data.gameState;
                    this.userValue = data.player
                    console.log(this.userValue)

                } else if (data.type === 'correctAnswer') {

                    console.log(`> Detected ${[data.player]} answered correctly.`)

                    console.log(this.gameState[data.player])

                    // this.gameState[data.player].messages.push('Correct answer!');
                    this.gameState[data.player].currentProblemIndex++;
                    this.gameState[data.player].score++;

                    console.log(this.gameState[data.player])

                } else if (data.type === 'incorrectAnswer') {

                    console.log(`> Detected ${[data.player]} answered incorrectly.`)

                    // this.gameState[data.player].messages.push('Incorrect answer.');

                } else if (data.type === 'gameOver') {

                    this.gameOver = true;
                    this.result = data.result;
                    this.websocket = null;

                } else if (data.type === 'updateState') {

                    this.gameState = data.gameState;

                }
            };
        },
        sendAnswer(player, answer) {
            console.log(`> Received answer ${answer} from ${player}`)

            this.websocket.send(JSON.stringify({ type: 'answer', player, answer }));
        }
    }
});
