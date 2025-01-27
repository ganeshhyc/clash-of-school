const characters = require('../characters');

module.exports = function(type, name, state, id) {
    return {
        id,
        state,
        do: function(engineState, idleState) {
            const Character = characters[type][name];
            window.postMessage({
                character: new Character(engineState, idleState).state(state)
            });
        }
    }
}