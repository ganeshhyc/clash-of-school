const _ = require('lodash');
const controller = require('../controller');

let engineState = 0;
let idleState = 0;
let maxAnim = 999999;
let thread = [];
let fps = 60;
let _interval;

const start = (_thread = [], _fps, _canvas) => {
    threat = _thread;
    controller
        .process(_thread)
        .push(controller.action('assassin', 'bella', 'walk', Date.now()));

    fps = _fps;
    engineState = engineState > maxAnim ? 0 : engineState;

    const ctx = _canvas.getContext('2d');

    window.onmessage = (e) => {
        console.log(e.data);

        if(e.data.registerCallbackIds){
            const registerCallbackIds = e.data.registerCallbackIds ?? [];
            thread = Object
                .entries(controller.process.callbackRegistry)
                .filter(([key, _]) => registerCallbackIds.includes(key))
                .map(([_, value]) => value);
        }

        if(e.data.process){
            thread = e.data.process.map(t => t.id ? t.id : t) ?? [];
            console.log('thread',e.data.process, thread)
        }

        const character = e.data.character;
        if(e.data.character){
            const img = new Image();
            img.src = character.image;
            img.onload = function() {
                ctx.clearRect(0, 0, _canvas.width, _canvas.height);
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
    setTimeout(()=>{
        idleState = engineState;
        stop();

        controller
        .process(Object.values(controller.process(thread).callbackRegistry))
        .push(controller.action('assassin', 'bella', 'idle', thread[0]));

        _interval = window.setInterval(animate, 1000/fps);    

        controller
        .process(Object.values(controller.process(thread).callbackRegistry))
        .push(controller.action('assassin', 'bella', 'idle', Date.now()));
    }, 3000)
    _interval = window.setInterval(animate, 1000/fps);    
};

const stop = () => {
    clearInterval(_interval);
}

const animate = () => {
    if(_.isArray(thread)){
        processThread()
        engineState++;
    }
}

const processThread = () => thread.forEach(
    process => controller.process(thread).callbackRegistry[process].do(engineState, idleState)
);

module.exports = {
    start,
    stop
};