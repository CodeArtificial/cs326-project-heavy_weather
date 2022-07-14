class Events {
    async get() {
        const eventFetch = await fetch('/getAllEvent');
        const events = eventFetch.ok ? await eventFetch.json() : [];
        return events;
    } 
}

export const fetchEvents = new Events();