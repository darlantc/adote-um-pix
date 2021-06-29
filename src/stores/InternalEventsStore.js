export const InternalEvents = Object.freeze({
    login: "login",
    notification: "notification",
});

class InternalEventsStore {
    subscribers = {};

    constructor() {
        Object.keys(InternalEvents).forEach((key) => {
            this.subscribers[key] = [];
        });
    }

    subscribeTo = ({ event, observer, callback }) => {
        this.subscribers[event].push({
            observer,
            callback,
        });
    };

    unsubscribe = (observerToRemove, event) => {
        if (this.subscribers[event]) {
            this.subscribers[event] = this.subscribers[event].filter(({ observer }) => observer !== observerToRemove);
        }
    };

    notify = ({ event, params }) => {
        if (this.subscribers[event]) {
            this.subscribers[event].forEach(({ callback }) => callback(params));
        }
    };
}

export default InternalEventsStore;
