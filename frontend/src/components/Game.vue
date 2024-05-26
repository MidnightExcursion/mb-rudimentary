<template>
    <div>
        <div v-if="!gameOver">
            <div class="player">
                <h2>Player 1</h2>
                <h3>Current Problem: {{ player1CurrentProblemData.question }}</h3>
                <input v-model="player1Answer" @keyup.enter="submitAnswer('player1')" />
                <!-- <ul>
                    <li v-for="message in player1.messages" :key="message">{{ message }}</li>
                </ul> -->
                <p>{{ player1.currentProblemIndex || 0 }}/{{ numberOfProblems }}</p>
            </div>
            <div class="player">
                <h2>Player 2</h2>
                <h3>Current Problem: {{ player2CurrentProblemData.question }}</h3>
                <input v-model="player2Answer" @keyup.enter="submitAnswer('player2')" />
                <!-- <ul>
                    <li v-for="message in player2.messages" :key="message">{{ message }}</li>
                </ul> -->
                <p>{{ player2.currentProblemIndex || 0 }}/{{ numberOfProblems }}</p>
            </div>
        </div>
        <div v-else>
            <h1>{{ result === 'win' ? 'You Win!' : 'You Lose!' }}</h1>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useGameStore } from '../store';

export default {
    setup() {
        const store = useGameStore();
        const player1Answer = ref('');
        const player2Answer = ref('');

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

        onMounted(() => {
            store.connectWebsocket();
        });

        const gameOver = computed(() => store.gameOver || false);
        const result = computed(() => store.result || false);
        const player1CurrentProblemData = computed(() => store.problems[store.gameState.player1.currentProblemIndex] || {});
        const player2CurrentProblemData = computed(() => store.problems[store.gameState.player2.currentProblemIndex] || {});
        const numberOfProblems = computed(() => store.problems.length || 0);

        return {
            gameOver,
            result,
            player1: store.gameState.player1,
            player2: store.gameState.player2,
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
