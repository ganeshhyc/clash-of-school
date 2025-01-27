
const ls = window.localStorage;

const db = (arg) => {
    const processThread = ls.get('process-thread') ?? [];
    switch(arg){
        case 'get':
            return processThread;
        case 'new':
            return function(process) {
                processThread.push(process);
                ls.set('process-thread', processThread);
            };
        case 'delete':
            return function(arg) {
                if(arg){
                    processThread.push(process)
                    ls.set('process-thread', []);
                }else{
                    ls.set('process-thread', processThread.filter(p => p.id!==arg))
                }
            };
    }
}

module.exports = () => db;