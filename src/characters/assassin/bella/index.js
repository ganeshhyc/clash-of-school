const bella = require('./config.json');
const idle = require('./state/idle.png');
const talk = require('./state/talk.png');
const walk = require('./state/walk.png');

const state = (s, engineState) => {
    if(
        typeof s === 'string' &&
        bella.state.states$.includes(s) &&
        bella.state.hasOwnProperty(s+'$')){
        const arg = s+'$';
        const count = engineState % bella.state[arg].count;
        let image = idle;
        switch(s){
            case 'idle':
                image = idle;
                break;
            case 'talk':
                image = talk;
                break;
            case 'walk':
                image = walk;
                break;
        }
        return {
            image,
            x: bella.state[arg].size * count,
            y: bella.state[arg].size,
            size: bella.state[arg].size,
            distance_x: bella.state[arg].speed * engineState
        }
    }else{
        return null;
    }
}

module.exports = {
    state
};