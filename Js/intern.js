// Variables to keep track of the current date
let currentMonth = moment().month(); // Current month
let currentYear = moment().year(); // Current year
let selectedDate = null; // To store the selected date

// DOM Elements
const calendarBody = document.getElementById("calendar-body");
const calendarTitle = document.getElementById("calendar-title");

// Render the calendar for the current month and year
function renderCalendar(month, year) {
  // Clear the previous calendar
  calendarBody.innerHTML = "";

  // Set the month and year in the header using Moment.js formatting
  const currentMoment = moment([year, month]);
  calendarTitle.textContent = currentMoment.format("MMMM, YYYY");
  calendarTitle.textContent = currentMoment.format("MMMM, YYYY");

  // Get the first day of the month (0 = Sunday, 1 = Monday, ...)
  const firstDay = currentMoment.startOf("month").day();

  // Get the number of days in the month
  const daysInMonth = currentMoment.daysInMonth();

  // Create empty slots for days before the 1st (based on which day it falls on)
  for (let i = 0; i < firstDay; i++) {
    const emptyDiv = document.createElement("div");
    emptyDiv.classList.add("day");
    calendarBody.appendChild(emptyDiv);
  }

  // Generate the days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("day");

    // Create a moment object for the current day
    const currentDayMoment = moment([year, month, day]);

    // Get the day of the week in short form (like "Mon", "Tue")
    const dayOfWeekShort = currentDayMoment.format("ddd");

    // Get the day number with ordinal suffix (like "17th")
    const dayNumberWithSuffix = currentDayMoment.format("Do");

    // Create a <p> for the day of the week (short form)
    const dayOfWeekTag = document.createElement("p");
    dayOfWeekTag.textContent = dayOfWeekShort;

    // Create an <h3> for the day number with suffix
    const dayNumberTag = document.createElement("h3");
    dayNumberTag.textContent = dayNumberWithSuffix;

    // Append the <p> and <h3> to the dayDiv
    dayDiv.appendChild(dayOfWeekTag);
    dayDiv.appendChild(dayNumberTag);

    // Check if the day is the selected day
    if (selectedDate && selectedDate.isSame(currentDayMoment, "day")) {
      dayDiv.classList.add("selected");
      const checkmark = document.createElement("span");
      checkmark.classList.add("checkmark");
      checkmark.innerHTML = "&#10004;";
      dayDiv.appendChild(checkmark);
    }

    // Add click event to select the day
    dayDiv.addEventListener("click", () => selectDate(day, month, year));

    // Append the dayDiv to the calendar body
    calendarBody.appendChild(dayDiv);
  }
}

// Select a date and store it
function selectDate(day, month, year) {
  // Store the selected date using Moment.js
  selectedDate = moment([year, month, day]);
  localStorage.setItem("selectedDate", selectedDate.format());

  // Re-render the calendar to reflect the selected date
  renderCalendar(month, year);
}

// Handle month navigation
document.getElementById("prev-month").addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentMonth, currentYear);
});

document.getElementById("next-month").addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear);
});

// Load any previously selected date from localStorage
function loadSelectedDate() {
  const storedDate = localStorage.getItem("selectedDate");
  if (storedDate) {
    selectedDate = moment(storedDate);
  }
}

// Initial setup
loadSelectedDate();
renderCalendar(currentMonth, currentYear);