const callbackRegistry = {};

/**
 * Callback register function
 * @param {*} id 
 * @param {*} callback 
 */
function registerCallback(id, thread, callback) {
    console.log('action', callback, thread);
    callbackRegistry[id] = callback;
    window.postMessage({
        process: thread.map(t => t.id)
    });
}

function purge(id, thread = []) {
    delete callbackRegistry[id];
    thread = thread.filter(t => t.id === id);
    window.postMessage({
        process: thread.map(t => t.id)
    });
}

module.exports = function(thread = []){
    return {
        push: (action)=> {
            // if(thread.find(t => t.id === action.id)){
            //     registerCallback(action.id, thread, action, false); 
            // }else{
                thread.push(action);
                registerCallback(action.id, thread, action); 
            // }
        },
        purge: (id)=>{
            purge(id, thread)
        },
        callbackRegistry
    }
}