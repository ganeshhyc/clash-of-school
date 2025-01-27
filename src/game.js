const engine = require('./engine');
const fps = 60;

const canvas = document.getElementById('gameCanvas');
let thread = [];

setTimeout(()=>{
    engine.start(thread, fps, canvas);
}, 1000)
