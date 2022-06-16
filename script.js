// Navigation for the calendar depending on the month
// +# = later months, 0 = current month, -# = previous months
let nav = 0;

// Element id that are clicked will be set to click
let click = null;

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
}

render();