<template>
    <div>
        <div v-if="!isConnectedToWebSocket">
            <div class ='joinMatchmaking'>
                <button @click="connectToWebsocket">Join Matchmaking Queue</button>
            </div>
        </div>
        <div v-if="isConnectedToWebSocket">
            <div v-if="!gameOver">
                <div class="player" v-if="playerValue === 'player1'">
                    <h2>You</h2>
                    <h3>Current Problem: {{ player1CurrentProblemData.question }}</h3>
                    <input v-model="player1Answer" @keyup.enter="submitAnswer('player1')" />
                    <p>{{ player1CurrentProblemIndex || 0 }}/{{ numberOfProblems }}</p>
                </div>
                <div class="player" v-if="playerValue === 'player2'">
                    <h2>Opponent</h2>
                    <h3>Current Problem: {{ player1CurrentProblemData.question }}</h3>
                    <input v-model="player1Answer" disabled />
                    <p>{{ player1CurrentProblemIndex || 0 }}/{{ numberOfProblems }}</p>
                </div>

                <div class="player" v-if="playerValue === 'player2'">
                    <h2>You</h2>
                    <h3>Current Problem: {{ player2CurrentProblemData.question }}</h3>
                    <input v-model="player2Answer" @keyup.enter="submitAnswer('player2')" />
                    <p>{{ player2CurrentProblemIndex || 0 }}/{{ numberOfProblems }}</p>
                </div>
                <div class="player" v-if="playerValue === 'player1'">
                    <h2>Opponent</h2>
                    <h3>Current Problem: {{ player2CurrentProblemData.question }}</h3>
                    <input v-model="player2Answer" disabled />
                    <p>{{ player2CurrentProblemIndex || 0 }}/{{ numberOfProblems }}</p>
                </div>
            </div>
            <div v-else>
                <h1>{{ result === 'win' ? 'You Win!' : 'You Lose!' }}</h1>
            </div>
        </div>

    </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useGameStore } from '@/stores/matchmaking'

export default {
    setup() {
        const store = useGameStore();
        const player1Answer = ref('');
        const player2Answer = ref('');

        const connectToWebsocket = () => {
            console.log(`> User sent WS connection request...`)
            store.connectWebsocket();
        };

        const submitAnswer = (player) => {

            if (player === 'player1') {

                console.log(`> Player 1 answered with ${player1Answer.value} `)
                store.sendAnswer('player1', player1Answer.value);
                player1Answer.value = '';

            } else if (player === 'player2') {

                console.log(`> Player 2 answered with ${player2Answer.value} `)
                store.sendAnswer('player2', player2Answer.value);
                player2Answer.value = '';
            }

        };

        const isConnectedToWebSocket = computed(() => store.websocket ?? false);
        const gameOver = computed(() => store.gameOver || false);
        const result = computed(() => store.result || false);
        const player1CurrentProblemIndex = computed(() => store.gameState.player1.currentProblemIndex);
        const player2CurrentProblemIndex = computed(() => store.gameState.player2.currentProblemIndex);
        const player1CurrentProblemData = computed(() => store.problems[store.gameState.player1.currentProblemIndex] || {});
        const player2CurrentProblemData = computed(() => store.problems[store.gameState.player2.currentProblemIndex] || {});
        const numberOfProblems = computed(() => store.problems.length || 0);
        const playerValue = computed(() => store.userValue || '');

        return {
            connectToWebsocket,
            isConnectedToWebSocket,
            gameOver,
            result,
            playerValue,
            player1CurrentProblemIndex,
            player2CurrentProblemIndex,
            numberOfProblems,
            player1Answer,
            player2Answer,
            submitAnswer,
            player1CurrentProblemData,
            player2CurrentProblemData
        };
    }
};
</script>

<style>
.player {
    width: 45%;
    margin: 2.5%;
    border: 1px solid black;
    padding: 10px;
}
</style>
