class AppContext {
    constructor() {
        this.events = new EventDispatcher();
    }
}

class EventDispatcher {
    constructor() {
        this.events = {};
    }

    addListener(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    }

    removeListener(eventName) {

    }

    dispatch(eventName, ...args) {
        if (!this.events[eventName]) {
            throw new Error(`Event '${eventName}' not found`)
        }
        this.events[eventName].forEach(cb => {
           return cb(args);
        })
    }
}
export default new AppContext();
