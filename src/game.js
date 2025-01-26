const engine = require('./engine');
const characters = require('./characters');
const fps = 60;

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

window.onmessage = function(e) {
    if(e.data.character){
        const character = e.data.character;
        const img = new Image();
        img.src = character.image;
        img.onload = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(
                img,
                character.x, 0,
                character.size, character.size,
                character.distance_x, 0,
                character.size, character.size
            );
        };
    }
}

const action = function(type, name, state) {
    return {
        state,
        do: function(engineState) {
            window.postMessage({
                character: characters[type][name].state(this.state, engineState)
            });
        }
    }
}

const processThread = []; // get all required renders

processThread.push(action('assassin', 'bella', 'walk'));

engine.start(processThread, fps);