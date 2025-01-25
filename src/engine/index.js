const _ = require('lodash');

let engineState = 0;
let maxAnim = 999999;
let queue = [];
let fps = 60;

const start = (_queue, _fps) => {
    queue = _queue;
    fps = _fps;

    engineState = engineState > maxAnim ? 0 : engineState;
    setInterval(animate, 1000/fps);
    
};

const animate = () => {
    if(_.isArray(queue)){
        processThread()
        engineState++;
    }
}

const processThread = () => queue.forEach(
    process => process.do(engineState)
);

module.exports = {
    start
};