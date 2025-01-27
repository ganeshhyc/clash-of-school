const config = require('./config.json');
const idleImg = require('./state/idle.png');
const talkImg = require('./state/talk.png');
const walkImg = require('./state/walk.png');

module.exports = class Bella {
    _engineState = 0;
    _idleState = 0;

    constructor(engineState, idleState){
        this._engineState = engineState;
        this._idleState = idleState;
    }

    /**
     * select state
     */
    state(s = 'idle'){
        const arg = s+'$';
        const count = this._engineState % config.state[arg].count;
        switch(s){
            case 'idle':
                return this.idle(count)
            case 'talk':
                return this.talk(count);
            case 'walk':
                return this.walk(count);
            default:
                return this.idle(count);
        }
    }

    /**
     * Idel state
     * 
     * @returns 
     */
    idle(count = 0){
        return {
            image: idleImg,
            x: config.state.idle$.size * count,
            y: config.state.idle$.size,
            size: config.state.idle$.size,
            distance_x: config.state.idle$.speed *  this._idleState
        }
    }

    
    /**
     * Talk state
     * 
     * @returns 
     */
    talk(count = 0){
        return {
            image: talkImg,
            x: config.state.talk$.size * count,
            y: config.state.talk$.size,
            size: config.state.talk$.size,
            distance_x: config.state.talk$.speed *  this._engineState
        }
    }

        
    /**
     * Walk state
     * 
     * @returns 
     */
    walk(count = 0){
        return {
            image: walkImg,
            x: config.state.walk$.size * count,
            y: config.state.walk$.size,
            size: config.state.walk$.size,
            distance_x: config.state.walk$.speed *  this._engineState
        }
    }
}

// const state = (s, engineState, id) => {
//     if(
//         typeof s === 'string' &&
//         bella.state.states$.includes(s) &&
//         bella.state.hasOwnProperty(s+'$')){
//         const arg = s+'$';
//         const count = engineState % bella.state[arg].count;
//         let image = idle;
//         switch(s){
//             case 'idle':
//                 image = idle;
//                 break;
//             case 'talk':
//                 image = talk;
//                 break;
//             case 'walk':
//                 image = walk;
//                 break;
//         }
//         return {
//             image,
//             x: bella.state[arg].size * count,
//             y: bella.state[arg].size,
//             size: bella.state[arg].size,
//             distance_x: bella.state[arg].speed * engineState
//         }
//     }else{
//         return null;
//     }
// }

// module.exports = bella