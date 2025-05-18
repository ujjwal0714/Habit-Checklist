const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September W", "October", "November", "December"];

// Initialize Audio
const clickSound = new Audio("Sounds/click.wav");
const winSound = new Audio("Sounds/win.wav");

// Morning, Afternoon, Evening Handler
let d = new Date();
let hour = d.getHours();
let time;
if (hour >= 5 && hour <= 12) { time = "Morning" }
else if (hour >= 13 && hour <= 17) { time = "Afternoon" }
else { time = "Evening" }

let header = document.querySelector(".heading");
header.textContent = `Good ${time}, Sankalp`;

// Time Keeping
let name = month[d.getMonth()];
let date = `${d.getDate()} ${name}, ${d.getFullYear()}`;
let dateDisplay = document.querySelector(".date");
dateDisplay.textContent = date;

// Update Week Range
let weekOffset = 0;

function updateWeekRange() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const monday = new Date(today);
    monday.setDate(today.getDate() - daysToMonday + (weekOffset * 7));

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    const formatDate = (date) => {
        const day = date.getDate();
        const monthName = month[date.getMonth()];
        const year = date.getFullYear();
        return `${day} ${monthName}, ${year}`;
    };

    const rangeElement = document.querySelector(".range");
    if (rangeElement) {
        rangeElement.textContent = `${formatDate(monday)} - ${formatDate(sunday)}`;
    } else {
        console.error("Element with class 'range' not found.");
    }
}

// Navigation Buttons
function setupNavigationButtons() {
    const previousButton = document.querySelector(".nav_button.previous");
    const nextButton = document.querySelector(".nav_button.next");

    if (previousButton) {
        previousButton.addEventListener("click", () => {
            weekOffset--;
            updateWeekRange();
        });
    } else {
        console.error("Previous button not found.");
    }

    if (nextButton) {
        nextButton.addEventListener("click", () => {
            weekOffset++;
            updateWeekRange();
        });
    } else {
        console.error("Next button not found.");
    }
}

// Remaining Time
function remaining_time() {
    const d = new Date();
    let rem_sec = 60 - d.getSeconds();
    let rem_time = document.querySelector(".rem_time");
    let rem_hrs = 24 - d.getHours() - 1;
    let rem_min = 60 - d.getMinutes();
    rem_time.textContent = `${rem_hrs} hrs ${rem_min} minutes ${rem_sec} seconds till bedtime.`;
    return rem_sec;
}
window.setInterval(remaining_time, 1000);

// Form Handling
let habit_addn_form = document.getElementById("habit_addn_form");
let habit_addn_btn = document.querySelector(".add_habit_btn");
habit_addn_form.style.display = "none";

function form_handle() {
    habit_addn_form.style.display = habit_addn_form.style.display === "none" ? "flex" : "none";
}
habit_addn_btn.addEventListener("click", form_handle);

let form_close_btn = document.querySelector(".close");
form_close_btn.addEventListener("click", form_close);
function form_close() {
    habit_addn_form.style.display = habit_addn_form.style.display === "none" ? "flex" : "none";
}

// Add Habit to Table
habit_addn_form.addEventListener("submit", function (e) {
    e.preventDefault();

    let habit = document.getElementById("activity").value.trim();
    let color = document.getElementById("color").value.toLowerCase();
    let output = document.getElementById("output");

    if (!habit || !color) {
        output.textContent = "Please enter a habit and select a color.";
        return;
    }

    const colorMap = {
        blue: "brainstorming",
        red: "dsa",
        yellow: "meditate",
        greenyellow: "cat",
        white: "exercise"
    };
    const colorClass = colorMap[color] || "exercise";
    const displayHabit = color === "red" ? `🔴 ${habit}` : habit;

    let table = document.querySelector(".habit_table");
    let habitCard = document.createElement("div");
    habitCard.className = "habit-card";

    let habitTitle = document.createElement("h3");
    habitTitle.textContent = displayHabit;
    habitCard.appendChild(habitTitle);

    let habitDays = document.createElement("div");
    habitDays.className = "habit-days";

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    for (let i = 0; i < 7; i++) {
        let daySpan = document.createElement("span");
        daySpan.textContent = days[i];
        let input = document.createElement("input");
        input.type = "checkbox";
        input.id = `habit_${habit}_${i}`;
        let label = document.createElement("label");
        label.setAttribute("for", `habit_${habit}_${i}`);
        label.className = colorClass;
        habitDays.appendChild(daySpan);
        habitDays.appendChild(input);
        habitDays.appendChild(label);
    }

    habitCard.appendChild(habitDays);
    table.appendChild(habitCard);
    habit_addn_form.reset();
    habit_addn_form.style.display = "none";
    output.textContent = "";
    setupCheckboxListeners();
    loadCheckboxStates();
    updateProgressBar();
});

// Progress Bar and LocalStorage
let lastCheckedDay = new Date().getDay();
let hasPlayedWinSound = false;

function updateProgressBar() {
    const table = document.querySelector(".habit_table");
    const cards = table.querySelectorAll(".habit-card");
    const totalTasks = cards.length;
    const currentDay = (new Date().getDay() + 6) % 7;
    let completedTasks = 0;

    cards.forEach((card, index) => {
        const checkbox = card.querySelector(`input[id="habit_${card.querySelector('h3').textContent.replace(/[^\w\s]/g, '')}_${currentDay}"]`);
        if (checkbox && checkbox.checked) {
            completedTasks++;
        }
    });

    const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    const progressVisualiser = document.querySelector(".progress_visualiser");
    const progressStat = document.querySelector(".progress_stat");
    const confetti = document.querySelector(".confetti");

    progressVisualiser.style.width = `${progressPercentage}%`;
    progressStat.textContent = `${progressPercentage}% Achieved, Go on!`;

    if (progressPercentage === 100 && !hasPlayedWinSound) {
        console.log("Very impressive");
        winSound.play().catch(err => console.error("Win sound playback failed:", err));
        confetti.classList.add("active-confetti");
        hasPlayedWinSound = true;
        setTimeout(() => {
            confetti.classList.remove("active-confetti");
        }, 10000);
    } else if (progressPercentage < 100) {
        hasPlayedWinSound = false;
    }
}

function setupCheckboxListeners() {
    const table = document.querySelector(".habit_table");
    table.removeEventListener("change", handleCheckboxChange);
    table.addEventListener("change", handleCheckboxChange);
}

function handleCheckboxChange(e) {
    if (e.target.type === "checkbox") {
        const checkbox = e.target;
        const habitName = checkbox.id.split("_")[1];
        const dayIndex = checkbox.id.split("_")[2];
        const key = `habit_${habitName}_${dayIndex}`;
        localStorage.setItem(key, checkbox.checked);
        console.log(`Saved ${key}: ${checkbox.checked}`);
        if (checkbox.checked) {
            clickSound.play().catch(err => console.error("Click sound playback failed:", err));
        }
        updateProgressBar();
    }
}

function loadCheckboxStates() {
    const table = document.querySelector(".habit_table");
    const checkboxes = table.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        const key = checkbox.id;
        const state = localStorage.getItem(key);
        console.log(`Loading ${key}: ${state}`);
        if (state !== null) {
            checkbox.checked = state === "true";
        }
    });
    updateProgressBar();
}

function checkDayChange() {
    const currentDay = new Date().getDay();
    if (currentDay !== lastCheckedDay) {
        lastCheckedDay = currentDay;
        hasPlayedWinSound = false;
        updateProgressBar();
        updateWeekRange();
    }
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    updateWeekRange();
    setupNavigationButtons();
    loadCheckboxStates();
    setupCheckboxListeners();
    updateProgressBar();
    setInterval(checkDayChange, 60000);
});