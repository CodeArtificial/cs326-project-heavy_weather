import { fetchEvents } from './calendar.js';
import {DATABASE_URL} from '../database_url.js';
import {Database} from '../server/database.js';

// Navigation for the calendar depending on the month
// +# = later months, 0 = current month, -# = previous months
let nav = 0;

// Element id that are clicked will be set to click
let clickEvent = null;

// Array of events objects 
// let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];


let events = fetchEvents.get();




// Array to determine the padding days in a month
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const calendar = document.getElementById('calendar');
const form = document.getElementById('form');
const newEvent = document.getElementById('newEvent');
const eventTitle = document.getElementById('eventTitle');
const deleteEvent = document.getElementById('deleteEvent');

function formOpen(date) {
    // Set the click event on the date
    clickEvent = date;

    // Find the event created based on date
    const event = events.find(x => x.date === clickEvent);

    // If the event already exist in that date
    if (event) {

        document.getElementById('event').innerText = event.event;

        // Display deleting the existed form
        deleteEvent.style.display = 'block';

    } else { // Display the new event form
        newEvent.style.display = 'block';
    }

    // Display the form
    form.style.display = 'block';
}

// Function that change the display of the form upon completion
function formClose() {
    // Reset the input field
    eventTitle.value = '';
    // Hide the add event form
    newEvent.style.display = 'none';
    // Hide the delete event form
    deleteEvent.style.display = 'none';
    // Hide the form backdrop
    form.style.display = 'none';
    // Reset the clicked date
    clickEvent = null;
    // Remove the event class from the event
    eventTitle.classList.remove('400');
    // Rerender the interface
    renderCalendar.render();
}

// Function to save event to local storage
function eventSave() {
    if (eventTitle.value) { // there is an input to the event prompt
        // Delete error code 400
        eventTitle.classList.remove('400');
        // Push to the events array
        events.push({ date: clickEvent, event: eventTitle.value });
        // Save to the local storage
        localStorage.setItem('events', JSON.stringify(events));
        formClose();
    } else { // there is no input
        // Add error code 400
        eventTitle.classList.add('400');

    }
}

// Function to delete an event from the calendar
function eventDelete() {
    // Filter the deleted event out of the events array
    events = events.filter(x => x.date !== clickEvent);
    // Save the events array to local storage
    localStorage.setItem('events', JSON.stringify(events));
    formClose();

}

// Function to render the page
class Calendar {
    constructor(dburl) {
        this.dburl = dburl;
    }

    async initDB() {
        this.db = new D
    }
    async render() {
        const date = new Date();
        events = fetchEvents.get();
        events = await events.then(x => x);
        if (nav !== 0) {
            // Set to the new month based on nav
            date.setMonth(new Date().getMonth() + nav);
        }

        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();

        // Find the first day of month
        const monthFirstDay = new Date(year, month, 1);

        // Number of days in a month
        const monthDays = new Date(year, month + 1, 0).getDate();

        // string: "Weekdays, dd/mm/yyyy"
        const fullDate = monthFirstDay.toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' });

        // Number of padding days in a month
        const daysPad = weekdays.indexOf(fullDate.split(', ')[0]);

        // Display the month on the current calendar
        document.getElementById('monthText').innerText = ` ${date.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

        // Refresh calendar blocks
        calendar.innerHTML = '';

        // Render the calendar squares
        for (let i = 1; i <= daysPad + monthDays; i++) {
            const div = document.createElement('div');
            div.classList.add('day');

            const dateStr = `${month + 1}/${i - daysPad}/${year}`;

            // Filter padding days from actual day
            if (i > daysPad) {
                // Add date on block
                div.innerHTML = i - daysPad;

                const event = events.find(x => x.date === dateStr);

                // const event = 
                // Add a class to the current day
                if (nav === 0 && i - daysPad === day) {
                    div.classList.add('dayCur');
                }

                // If there is an event in th day, add to the day square
                if (event) {
                    const divEvent = document.createElement('div');
                    divEvent.classList.add('event');
                    divEvent.innerText = event.event;
                    div.appendChild(divEvent);
                }

                // Add click event to create new event
                div.addEventListener('click', () => {
                    formOpen(dateStr);
                });
            } else {
                div.classList.add('padding-day');
            }
            calendar.appendChild(div);
        }
    }
}

const renderCalendar = new Calendar();


function button() {
    document.getElementById('next').addEventListener('click', () => {
        // Increment nav to navigate to one month later
        nav++;
        renderCalendar.render();
    });

    document.getElementById('back').addEventListener('click', () => {
        // Decrement nav to navigate to one month earlier 
        nav--;
        renderCalendar.render();
    });

    // Add clicked event to the save button -> save event
    document.getElementById('save').addEventListener('click', eventSave);

    // Add clicked event to the cancel button -> close form
    document.getElementById('cancel').addEventListener('click', formClose);

    // Add clicked event to the close button -> close form
    document.getElementById('close').addEventListener('click', formClose);

    // Add clicked event to the delete button -> event deletion 
    document.getElementById('delete').addEventListener('click', eventDelete);

    document.getElementById('refresh').addEventListener('click', renderCalendar.render);
}

button();
renderCalendar.render();