module.exports = function(character, state, id) {
    return {
        id,
        state,
        do: (engineState, characterState) => window.postMessage({character: character.state(engineState, characterState)}),
        perform: (engineState, characterState) => window.postMessage({character: perform.perform(engineState, characterState)})
    }
}