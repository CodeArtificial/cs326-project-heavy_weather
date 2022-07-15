class Events {
    async get() {
        const eventFetch = await fetch('/getAllEvent');
        return eventFetch.ok ? eventFetch.json() : [];
    } 

    async delete(event, date) {
        const response = await fetch('/deleteEvent', {
            headers: {'Content-Type': 'application/json'},
            method: 'DELETE',
            body: JSON.stringify({event: event, date: date})
        });
        if (!response.ok) {
            console.error("404");
          }
    }

    async create(event, date) {
        const copy = event;
        // console.log(event);
        // console.log(JSON.stringify({event: event, date: date}));
        const response = await fetch('/createEvent', {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify({event: copy, date: date})
        });
        if (!response.ok) {
            console.error("404");
          }
    }

}

export const fetchEvents = new Events();