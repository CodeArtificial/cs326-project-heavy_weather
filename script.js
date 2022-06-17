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

// Function to render the page
function render() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    // Find the first day of month
    const monthFirstDay = new Date(year, month, 1);

    // Number of days in a month
    const monthDays = new Date(year, month + 1, 0).getDate();

    // string: "Weekdays, dd/mm/yyyy"
    const fullDate = monthFirstDay.toLocaleDateString('en-us', {weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric'});
    console.log(fullDate)
    // Number of padding days in a month
    const daysPad = weekdays.indexOf(fullDate.split(', ')[0]);

    for (let i = 1; i <= daysPad + monthDays; i++) {
        const div = document.createElement('div');
        div.classList.add('day');

        if (i > daysPad) {
            div.innerHTML = i - daysPad;
        } else {
            div.classList.add('padding-day');
        }
        calendar.appendChild(div);
    }
}

render();