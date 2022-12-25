import './styles.scss';


const CURRENT_DATE = new Date();
const CURRENT_MONTH = CURRENT_DATE.getMonth();
const CURRENT_DAY_INDEX = CURRENT_DATE.getDay();
const CURRENT_DAY_NUMBER = CURRENT_DATE.getDate();
const CURRENT_YEAR = CURRENT_DATE.getFullYear();
const STORAGE = window.localStorage;
const CALENDAR_CURRENT_DAY = document.getElementById('settings_day');
const CALENDAR_CURRENT_MONTH = document.getElementById('settings_month');
const CALENDAR_CURRENT_YEAR = document.getElementById('settings_year');
const CALENDAR_CHOOSE_MONTH = document.getElementById('choose-month');
const CALENDAR_CHOOSE_YEAR = document.getElementById('choose-year');
const ALL_CALENDAR_DAYS = document.querySelectorAll('.calendar__number');
const BUTTON_MONTH_UP = document.getElementById('month-up');
const BUTTON_MONTH_DOWN = document.getElementById('month-down');
const BUTTON_CONFIG = document.getElementById('config');
const CONFIGURATION_LIST = document.querySelector('.configuration');
const FIRST_DAY_CHECKBOX = document.getElementById('first__day-config');
const SUNDAY_DAY = document.querySelector('.Sunday');
const WEEKEND_DAYS = document.querySelector('.weekends').querySelectorAll('input');
const INVISIBLE_DAYS_BUTTON = document.getElementById('invisible-days');
const PLANNER_CONTENT = document.getElementById('planner_textarea');
const PLANNER_SUBMIT_BUTTON = document.getElementById('planner_submit');
const PLANNER_ON_OFF_BUTTON = document.getElementById('planner-days');
const WEATHER = document.querySelector('.weather');
let calendarDayNames = document.querySelectorAll('.calendar__day');
Date.prototype.daysInMonth = function() { return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate(); };

function addStorageConfig() {
    STORAGE.clear();
    STORAGE.month = JSON.stringify(['January','February','March','April','May','June','July','August','September','October','November','December']);
    STORAGE.day = JSON.stringify(['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']);
    STORAGE.weekends = JSON.stringify(['Saturday', 'Sunday']);
    STORAGE.holidays = JSON.stringify({'4July2021': 'holiday','9July2021': 'holiday','25August2021': 'holiday'});
    STORAGE.planners = JSON.stringify({'5July2021': 'Add story','10July2021': 'Read','20August2021': 'Programming'});
}

function addCalendarContent() {
    let dayName = getConfig({property: 'day', index: CURRENT_DAY_INDEX});

    CALENDAR_CURRENT_DAY.textContent = `${CURRENT_DAY_NUMBER}, ${dayName}`;
    CALENDAR_CURRENT_YEAR.textContent = CALENDAR_CHOOSE_YEAR.textContent = CURRENT_YEAR;
    CALENDAR_CURRENT_MONTH.textContent = CALENDAR_CHOOSE_MONTH.textContent = getConfig({property: 'month', index: CURRENT_MONTH});
    addCalendarDays({month: CURRENT_MONTH, year: CURRENT_YEAR});
}

function addCalendarDays({month, year}) {
    let firstDay = 1;
    let date = new Date(year, month, firstDay);
    let daysCount = date.daysInMonth();
    let dayName = getConfig({property: 'day', index: date.getDay()});
    let firstDayIndex = null;

    ALL_CALENDAR_DAYS.forEach((day) => {day.textContent = ''})

    for(let i = 0; i < calendarDayNames.length; i++){
        if(calendarDayNames[i].classList[1] === dayName) firstDayIndex = i; 
    }
    let firstDayIndexCopy = firstDayIndex;

    for(let i = 1; i < ALL_CALENDAR_DAYS.length; i++){
        ALL_CALENDAR_DAYS[firstDayIndex].textContent = i;
        firstDayIndex++;
        if(i >= daysCount) break;
    }
    
    ALL_CALENDAR_DAYS.forEach((day) => {
        day.classList.remove('invisible'); 
    });

    addInvisibleDays({firstDayIndex: firstDayIndexCopy, month: month, year: year});
}

function addInvisibleDays({firstDayIndex, month, year}) {
    if(firstDayIndex) {
        if(month === 0) {
            month = 11;
            year -= 1;
        }
        else month -= 1; 
    
        let daysCount = (new Date(year, month, 1)).daysInMonth();
    
        for(let i = firstDayIndex - 1; i >= 0; i--) {
            if(INVISIBLE_DAYS_BUTTON.checked) ALL_CALENDAR_DAYS[i].textContent = daysCount;
            ALL_CALENDAR_DAYS[i].classList.add('invisible');
            daysCount -= 1;
        }
    }

    let startIndex = 1;

    for(let i = 0; i < ALL_CALENDAR_DAYS.length; i++){
        if(!ALL_CALENDAR_DAYS[i].textContent) {
            ALL_CALENDAR_DAYS[i].classList.add('invisible');
            if(INVISIBLE_DAYS_BUTTON.checked) ALL_CALENDAR_DAYS[i].textContent = startIndex;
            startIndex += 1;
        }
    }
}

function markHolidays() {
    let calendarYear = CALENDAR_CHOOSE_YEAR.textContent;
    let calendarMonth = CALENDAR_CHOOSE_MONTH.textContent;

    ALL_CALENDAR_DAYS.forEach((day) => {
        day.classList.remove('holiday'); 
    });

    for(let i = 1; i < ALL_CALENDAR_DAYS.length; i++){
        if(JSON.parse(STORAGE.holidays)[`${ALL_CALENDAR_DAYS[i].textContent}${calendarMonth}${calendarYear}`] === 'holiday') ALL_CALENDAR_DAYS[i].classList.add('holiday');
    }
}

function markPlannerDays() {
    let calendarYear = CALENDAR_CHOOSE_YEAR.textContent;
    let calendarMonth = CALENDAR_CHOOSE_MONTH.textContent;

    ALL_CALENDAR_DAYS.forEach((day) => {
        day.classList.remove('planner'); 
    });

    for(let i = 0; i < ALL_CALENDAR_DAYS.length; i++){
        if(JSON.parse(STORAGE.planners)[`${ALL_CALENDAR_DAYS[i].textContent}${calendarMonth}${calendarYear}`] && !ALL_CALENDAR_DAYS[i].classList.contains('invisible') && PLANNER_ON_OFF_BUTTON.checked) ALL_CALENDAR_DAYS[i].classList.add('planner');
    }
}

function markCurrentDay() {
    let calendarYear = CALENDAR_CHOOSE_YEAR.textContent;
    let calendarMonth = CALENDAR_CHOOSE_MONTH.textContent;

    ALL_CALENDAR_DAYS.forEach((day) => {
        day.classList.remove('calendar__number-current'); 
    });

    if(calendarYear === CALENDAR_CURRENT_YEAR.textContent && calendarMonth === CALENDAR_CURRENT_MONTH.textContent) {
        for(let i = 0; i < ALL_CALENDAR_DAYS.length; i++) {
            if(Number(ALL_CALENDAR_DAYS[i].textContent) === CURRENT_DAY_NUMBER && !ALL_CALENDAR_DAYS[i].classList.contains('invisible')) ALL_CALENDAR_DAYS[i].classList.add('calendar__number-current'); 
        }
    }
}

function markWeekends() {
    ALL_CALENDAR_DAYS.forEach((day) => {
        day.classList.remove('weekend'); 
    });
    calendarDayNames.forEach((day) => {
        day.classList.remove('weekend'); 
    });

    let weekends = JSON.parse(STORAGE.weekends);

    for (let i = 0; i < calendarDayNames.length; i++) {
        weekends.forEach((weekend) => {
            if (weekend === calendarDayNames[i].classList[1]) calendarDayNames[i].classList.add('weekend');
        });
    }

    for (let i = 0; i < calendarDayNames.length; i++) {
        if(calendarDayNames[i].classList.contains('weekend')) {
            let dayIndex = i;
            let dayIndexIncrease = 7;

            for (let j = 0; j < ALL_CALENDAR_DAYS.length; j++) {
                if(j === dayIndex) {
                    ALL_CALENDAR_DAYS[j].classList.add('weekend');
                    dayIndex += dayIndexIncrease;
                }
            }
        }
    }
}

function getConfig({property, index}) {
    return JSON.parse(STORAGE[property])[index];
}

function chooseMonth({monthIndex, year}) {
    CALENDAR_CHOOSE_MONTH.textContent = getConfig({property: 'month', index: monthIndex});
    CALENDAR_CHOOSE_YEAR.textContent = year;

    addCalendarDays({month: monthIndex, year: year});
    markCurrentDay();
    markHolidays();
    markPlannerDays();
}

async function getWeatherData() {
    let response = await fetch('https://api.openweathermap.org/data/2.5/onecall?lat=53.9168&lon=30.3449&exclude=current,hourly,minutely,alerts&units=metric&appid=af66e4ff43b6ea2935890a9f8f238b46');

    if (response.ok) {
    let json = await response.json();
    addWeather(json.daily);
    } 
    else alert("Ошибка HTTP: " + response.status);
}

function addWeather(weather) {
    let inner = ``;
    if(weather[0].weather[0].description === 'clear sky') inner += `<img src="assets/skc_d.svg" alt="">`;
    else if(weather[0].weather[0].description === 'light rain') inner += `<img src="assets/bkn_d.svg" alt="">`;
    else inner += `<img src="assets/bkn_-ra_d.svg" alt="">`;
    inner += `<p>${weather[0].temp.eve}°C, ${weather[0].weather[0].description}</p><div class="weather__days">`;
    for(let i = 1; i < weather.length; i++) {
        inner += `<div class="day day-${i}">`;
        if(weather[i].weather[0].description === 'clear sky') inner += `<img src="assets/skc_d.svg" alt="">`;
        else if(weather[i].weather[0].description === 'light rain') inner += `<img src="assets/bkn_d.svg" alt="">`;
        else inner += `<img src="assets/bkn_-ra_d.svg" alt="">`;
        inner += `<span>${String(weather[i].temp.eve).split('.')[0]}°C</span></div>`;
    }
    inner += '</div>'
    WEATHER.innerHTML = inner;
}

function buttonEvents() {
    BUTTON_MONTH_DOWN.addEventListener('click', () => {
        let monthIndex = JSON.parse(STORAGE['month']).indexOf(CALENDAR_CHOOSE_MONTH.textContent);
        let year = Number(CALENDAR_CHOOSE_YEAR.textContent);

        if(monthIndex === 11) {
            monthIndex = 0;
            year += 1;
        }
        else monthIndex += 1; 

        chooseMonth({monthIndex: monthIndex, year: year});
    });

    BUTTON_MONTH_UP.addEventListener('click', () => {
        let monthIndex = JSON.parse(STORAGE['month']).indexOf(CALENDAR_CHOOSE_MONTH.textContent);
        let year = Number(CALENDAR_CHOOSE_YEAR.textContent);

        if(monthIndex === 0) {
            monthIndex = 11;
            year -= 1;
        }
        else monthIndex -= 1; 

        chooseMonth({monthIndex: monthIndex, year: year});
    });

    BUTTON_CONFIG.addEventListener('click', () => {
        if(CONFIGURATION_LIST.classList.contains('hidden')) CONFIGURATION_LIST.classList.remove('hidden');
        else CONFIGURATION_LIST.classList.add('hidden');
    });

    FIRST_DAY_CHECKBOX.addEventListener('change', () => {
        if(FIRST_DAY_CHECKBOX.checked) {
            SUNDAY_DAY.remove();
            document.querySelector('.Saturday').after(SUNDAY_DAY);
            calendarDayNames = document.querySelectorAll('.calendar__day');
            startCalendar();
        }
        else {
            SUNDAY_DAY.remove();
            document.querySelector('.Monday').before(SUNDAY_DAY);
            calendarDayNames = document.querySelectorAll('.calendar__day');
            startCalendar();
        }
    });

    WEEKEND_DAYS.forEach((day) => {
        day.addEventListener('change', () => {
            let dayName = day.name.split('__')[1];
            let weekends = JSON.parse(STORAGE.weekends);

            if(day.checked) {
                weekends.push(dayName);
                STORAGE.weekends = JSON.stringify(weekends);
                markWeekends();
            }
            else {
                weekends = weekends.filter(function(item) {return item !== dayName;});
                STORAGE.weekends = JSON.stringify(weekends);
                markWeekends();
            }
        });
    });

    INVISIBLE_DAYS_BUTTON.addEventListener('change', startCalendar);

    ALL_CALENDAR_DAYS.forEach((day) => {
        day.addEventListener('click', () => {
            ALL_CALENDAR_DAYS.forEach((day) => {
                day.classList.remove('active');
            });
        
            if(!PLANNER_CONTENT.parentElement.classList.contains('hidden')) PLANNER_CONTENT.parentElement.classList.add('hidden');
        
            PLANNER_CONTENT.value = '';
            if(!day.classList.contains('invisible') && PLANNER_ON_OFF_BUTTON.checked) {
                day.classList.add('active');
                if(day.classList.contains('planner')) PLANNER_CONTENT.value = JSON.parse(STORAGE.planners)[`${day.textContent}${CALENDAR_CHOOSE_MONTH.textContent}${CALENDAR_CHOOSE_YEAR.textContent}`]
                else PLANNER_CONTENT.placeholder = `Note for ${day.textContent} of ${CALENDAR_CHOOSE_MONTH.textContent} ${CALENDAR_CHOOSE_YEAR.textContent}`;
                PLANNER_CONTENT.parentElement.classList.remove('hidden');
            }
        });
    });

    PLANNER_ON_OFF_BUTTON.addEventListener('change', () => {
        ALL_CALENDAR_DAYS.forEach((day) => {
            day.classList.remove('active');
        });
        if(!PLANNER_CONTENT.parentElement.classList.contains('hidden')) PLANNER_CONTENT.parentElement.classList.add('hidden');
        startCalendar();
    });

    PLANNER_SUBMIT_BUTTON.addEventListener('click', () => {
        let note = PLANNER_CONTENT.value;
        let day = document.querySelector('.active').textContent;
        let month = CALENDAR_CHOOSE_MONTH.textContent;
        let year = CALENDAR_CHOOSE_YEAR.textContent;
        let planners = JSON.parse(STORAGE.planners);
        planners[`${day}${month}${year}`] = note;
        STORAGE.planners = JSON.stringify(planners);
        PLANNER_CONTENT.parentElement.classList.add('hidden');
        markPlannerDays();
    });
}

function startCalendar() {
    addCalendarContent();
    markCurrentDay();
    markHolidays();
    markWeekends();
    markPlannerDays();
}

addStorageConfig();
startCalendar();
buttonEvents();
getWeatherData();