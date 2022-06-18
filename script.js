// Navigation for the calendar depending on the month
// +# = later months, 0 = current month, -# = previous months
let nav = 0;

// Element id that are clicked will be set to click
let clickEvent = null;

// Array of events objects 
let events = localStorage.getItem('events') 
    ? JSON.parse(localStorage.getItem('event')) 
    : [];

// Array to determine the padding days in a month
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const calendar = document.getElementById('calendar');
const form = document.getElementById('form');
const newEvent = document.getElementById('newEvent');
const eventTitle = document.getElementById('eventTitle');

function formOpen(date) {
    // Set the click event on the date
    clickEvent = date;

    // Find the event created based on date
    const event = events.find(e => e.date === clickEvent);

    // If the event already exist in that date
    if (event) {
        // Alert the user
        alert("Event already exist");
    } else { // Display the event
        newEvent.style.display = 'block';
    }

    // Display the form
    form.style.display = 'block';
}

function formClose() {
    eventTitle.value = '';
    newEvent.style.display = 'none';
    form.style.display = 'none';
    clickEvent = null;
    render();
}

function eventSave() {
    if (eventTitle.value) {
        eventTitle.classList.remove('400');

        events.push({date: clicked, event: eventTitle.value});
        localStorage.setItem('events', JSON.stringify(events));

    } else {
        eventTitle.classList.add('400');

    }
}
// Function to render the page
function render() {
    const date = new Date();

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
    const fullDate = monthFirstDay.toLocaleDateString('en-us', {weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric'});
    
    // Number of padding days in a month
    const daysPad = weekdays.indexOf(fullDate.split(', ')[0]);

    // Display the month on the current calendar
    document.getElementById('monthText').innerText = ` ${date.toLocaleDateString('en-us', {month: 'long'})} ${year}`;

    // Refresh calendar blocks
    calendar.innerHTML = '';

    // Render the calendar squares
    for (let i = 1; i <= daysPad + monthDays; i++) {
        const div = document.createElement('div');
        div.classList.add('day');

        // Filter padding days from actual day
        if (i > daysPad) {
            // Add date on block
            div.innerHTML = i - daysPad;

            // Add click event to create new event
            div.addEventListener('click', () => {
                formOpen(`${month + 1}/${i - daysPad}/${year}`)
            });
        } else {
            div.classList.add('padding-day');
        }
        calendar.appendChild(div);
    }
}

function button() {
    document.getElementById('next').addEventListener('click', () => {
        // Increment nav to navigate to one month later
        nav++;
        render();
    });

    document.getElementById('back').addEventListener('click', () => {
        // Decrement nav to navigate to one month earlier 
        nav--;
        render();
    });
    document.getElementById('next').addEventListener('click', eventSave);

    document.getElementById('cancel').addEventListener('click', formClose);
}

button();
render();