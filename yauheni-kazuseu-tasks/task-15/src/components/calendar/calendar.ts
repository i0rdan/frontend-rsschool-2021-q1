import { Weather } from "../weather/weather";

export namespace Components {
    export class Calendar extends Weather{
        private CURRENT_DATE = new Date();
        private CURRENT_MONTH = this.CURRENT_DATE.getMonth();
        private CURRENT_DAY_INDEX = this.CURRENT_DATE.getDay();
        private CURRENT_DAY_NUMBER = this.CURRENT_DATE.getDate();
        private CURRENT_YEAR = this.CURRENT_DATE.getFullYear();
        private STORAGE = window.localStorage;
        private CALENDAR_CURRENT_DAY = (<HTMLElement> document.getElementById('settings_day'));
        private CALENDAR_CURRENT_MONTH = (<HTMLElement> document.getElementById('settings_month'));
        private CALENDAR_CURRENT_YEAR = (<HTMLElement> document.getElementById('settings_year'));
        private CALENDAR_CHOOSE_MONTH = (<HTMLInputElement> document.getElementById('choose-month'));
        private CALENDAR_CHOOSE_YEAR = (<HTMLInputElement> document.getElementById('choose-year'));
        private ALL_CALENDAR_DAYS = document.querySelectorAll('.calendar__number');
        private BUTTON_MONTH_UP = (<HTMLElement> document.getElementById('month-up'));
        private BUTTON_MONTH_DOWN = (<HTMLElement> document.getElementById('month-down'));
        private BUTTON_CONFIG = (<HTMLElement> document.getElementById('config'));
        private CONFIGURATION_LIST = (<HTMLElement> document.querySelector('.configuration'));
        private FIRST_DAY_CHECKBOX = (<HTMLInputElement> document.getElementById('first__day-config'));
        private SUNDAY_DAY = (<HTMLElement> document.querySelector('.Sunday'));
        private WEEKEND_DAYS = document.querySelector('.weekends')?.querySelectorAll('input');
        private INVISIBLE_DAYS_BUTTON = (<HTMLInputElement> document.getElementById('invisible-days'));
        private PLANNER_CONTENT = (<HTMLInputElement> document.getElementById('planner_textarea'));
        private PLANNER_SUBMIT_BUTTON = (<HTMLInputElement> document.getElementById('planner_submit'));
        private PLANNER_ON_OFF_BUTTON = (<HTMLInputElement> document.getElementById('planner-days'));
        WEATHER = (<HTMLElement> document.querySelector('.weather'));
        private calendarDayNames = document.querySelectorAll('.calendar__day');
    
        daysInMonth(date: Date) { return 32 - new Date(date.getFullYear(), date.getMonth(), 32).getDate(); }
    
        addCalendarContent() {
            let dayName = this.getConfig('day', this.CURRENT_DAY_INDEX);
        
            this.CALENDAR_CURRENT_DAY.textContent = `${this.CURRENT_DAY_NUMBER}, ${dayName}`;
            this.CALENDAR_CURRENT_YEAR.textContent = this.CALENDAR_CHOOSE_YEAR.textContent = String(this.CURRENT_YEAR);
            this.CALENDAR_CURRENT_MONTH.textContent = this.CALENDAR_CHOOSE_MONTH.textContent = this.getConfig('month', this.CURRENT_MONTH);
            this.addCalendarDays(this.CURRENT_MONTH, this.CURRENT_YEAR);
        }
    
        addCalendarDays(month:number, year:number) {
            let firstDay = 1;
            let date = new Date(year, month, firstDay);
            let daysCount = this.daysInMonth(date);
            let dayName = this.getConfig('day', date.getDay());
            let firstDayIndex = null;
        
            this.ALL_CALENDAR_DAYS.forEach((day) => {day.textContent = ''})
        
            for(let i = 0; i < this.calendarDayNames.length; i++){
                if(this.calendarDayNames[i].classList[1] === dayName) firstDayIndex = i; 
            }
            let firstDayIndexCopy = firstDayIndex;
            if(firstDayIndex || firstDayIndex === 0)
                for(let i = 1; i < this.ALL_CALENDAR_DAYS.length; i++){
                    this.ALL_CALENDAR_DAYS[firstDayIndex].textContent = String(i);
                    firstDayIndex++;
                    if(i >= daysCount) break;
                }
            
            this.ALL_CALENDAR_DAYS.forEach((day) => {
                day.classList.remove('invisible'); 
            });
        
            this.addInvisibleDays(firstDayIndexCopy, month, year);
        }
    
        addInvisibleDays(firstDayIndex: number | null, month: number, year: number) {
            if(firstDayIndex) {
                if(month === 0) {
                    month = 11;
                    year -= 1;
                }
                else month -= 1; 
            
                let daysCount = this.daysInMonth(new Date(year, month, 1));
            
                for(let i = firstDayIndex - 1; i >= 0; i--) {
                    if(this.INVISIBLE_DAYS_BUTTON.checked) this.ALL_CALENDAR_DAYS[i].textContent = String(daysCount);
                    this.ALL_CALENDAR_DAYS[i].classList.add('invisible');
                    daysCount -= 1;
                }
            }
    
            let startIndex = 1;
        
            for(let i = 0; i < this.ALL_CALENDAR_DAYS.length; i++) {
                if(!this.ALL_CALENDAR_DAYS[i].textContent) {
                    this.ALL_CALENDAR_DAYS[i].classList.add('invisible');
                    if(this.INVISIBLE_DAYS_BUTTON.checked) this.ALL_CALENDAR_DAYS[i].textContent = String(startIndex);
                    startIndex += 1;
                }
            }
        }
    
        markHolidays() {
            let calendarYear = this.CALENDAR_CHOOSE_YEAR.textContent;
            let calendarMonth = this.CALENDAR_CHOOSE_MONTH.textContent;
        
            this.ALL_CALENDAR_DAYS.forEach((day) => {
                day.classList.remove('holiday'); 
            });
        
            for(let i = 1; i < this.ALL_CALENDAR_DAYS.length; i++){
                if(JSON.parse(this.STORAGE.holidays)[`${this.ALL_CALENDAR_DAYS[i].textContent}${calendarMonth}${calendarYear}`] === 'holiday') this.ALL_CALENDAR_DAYS[i].classList.add('holiday');
            }
        }
    
        markPlannerDays() {
            let calendarYear = this.CALENDAR_CHOOSE_YEAR.textContent;
            let calendarMonth = this.CALENDAR_CHOOSE_MONTH.textContent;
        
            this.ALL_CALENDAR_DAYS.forEach((day) => {
                day.classList.remove('planner'); 
            });
        
            for(let i = 0; i < this.ALL_CALENDAR_DAYS.length; i++){
                if(JSON.parse(this.STORAGE.planners)[`${this.ALL_CALENDAR_DAYS[i].textContent}${calendarMonth}${calendarYear}`] && !this.ALL_CALENDAR_DAYS[i].classList.contains('invisible') && this.PLANNER_ON_OFF_BUTTON.checked) this.ALL_CALENDAR_DAYS[i].classList.add('planner');
            }
        }
    
        markCurrentDay() {
            let calendarYear = this.CALENDAR_CHOOSE_YEAR.textContent;
            let calendarMonth = this.CALENDAR_CHOOSE_MONTH.textContent;
        
            this.ALL_CALENDAR_DAYS.forEach((day) => {
                day.classList.remove('calendar__number-current'); 
            });
        
            if(calendarYear === this.CALENDAR_CURRENT_YEAR.textContent && calendarMonth === this.CALENDAR_CURRENT_MONTH.textContent) {
                for(let i = 0; i < this.ALL_CALENDAR_DAYS.length; i++) {
                    if(Number(this.ALL_CALENDAR_DAYS[i].textContent) === this.CURRENT_DAY_NUMBER && !this.ALL_CALENDAR_DAYS[i].classList.contains('invisible')) this.ALL_CALENDAR_DAYS[i].classList.add('calendar__number-current'); 
                }
            }
        }
    
        markWeekends() {
            this.ALL_CALENDAR_DAYS.forEach((day) => {
                day.classList.remove('weekend'); 
            });
            this.calendarDayNames.forEach((day) => {
                day.classList.remove('weekend'); 
            });
        
            let weekends = JSON.parse(this.STORAGE.weekends);
        
            for (let i = 0; i < this.calendarDayNames.length; i++) {
                weekends.forEach((weekend: string) => {
                    if (weekend === this.calendarDayNames[i].classList[1]) this.calendarDayNames[i].classList.add('weekend');
                });
            }
        
            for (let i = 0; i < this.calendarDayNames.length; i++) {
                if(this.calendarDayNames[i].classList.contains('weekend')) {
                    let dayIndex = i;
                    let dayIndexIncrease = 7;
            
                    for (let j = 0; j < this.ALL_CALENDAR_DAYS.length; j++) {
                        if(j === dayIndex) {
                            this.ALL_CALENDAR_DAYS[j].classList.add('weekend');
                            dayIndex += dayIndexIncrease;
                        }
                    }
                }
            }
        }
    
        getConfig(property: string, index: number) {
            return JSON.parse(this.STORAGE[property])[index];
        }
    
        chooseMonth(monthIndex: number, year: number) {
            this.CALENDAR_CHOOSE_MONTH.textContent = this.getConfig('month', monthIndex);
            this.CALENDAR_CHOOSE_YEAR.textContent = String(year);
        
            this.addCalendarDays(monthIndex, year);
            this.markCurrentDay();
            this.markHolidays();
            this.markPlannerDays();
        }
    
        async getWeatherData() {
            let response = await fetch('https://api.openweathermap.org/data/2.5/onecall?lat=53.9168&lon=30.3449&exclude=current,hourly,minutely,alerts&units=metric&appid=af66e4ff43b6ea2935890a9f8f238b46');
        
            if (response.ok) {
                let json = await response.json();
                this.addWeather(json.daily);
            } 
            else this.alertError('Error with HTTP protocol!');;
        }

        alertError<T>(s: T) {
            return alert(s);
        }
    
        addWeather(weather: string | any[]) {
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
            this.WEATHER.innerHTML = inner;
        }
    
        buttonEvents() {
            this.BUTTON_MONTH_DOWN.addEventListener('click', () => {
                let monthIndex = JSON.parse(this.STORAGE['month']).indexOf(this.CALENDAR_CHOOSE_MONTH.textContent);
                let year = Number(this.CALENDAR_CHOOSE_YEAR.textContent);
        
                if(monthIndex === 11) {
                    monthIndex = 0;
                    year += 1;
                }
                else monthIndex += 1; 
        
                this.chooseMonth(monthIndex, year);
            });
    
            this.BUTTON_MONTH_UP.addEventListener('click', () => {
                let monthIndex = JSON.parse(this.STORAGE['month']).indexOf(this.CALENDAR_CHOOSE_MONTH.textContent);
                let year = Number(this.CALENDAR_CHOOSE_YEAR.textContent);
        
                if(monthIndex === 0) {
                    monthIndex = 11;
                    year -= 1;
                }
                else monthIndex -= 1; 
        
                this.chooseMonth(monthIndex, year);
            });
    
            this.BUTTON_CONFIG.addEventListener('click', () => {
                if(this.CONFIGURATION_LIST.classList.contains('hidden')) this.CONFIGURATION_LIST.classList.remove('hidden');
                else this.CONFIGURATION_LIST.classList.add('hidden');
            });
    
            this.FIRST_DAY_CHECKBOX.addEventListener('change', () => {
                if(this.FIRST_DAY_CHECKBOX.checked) {
                    this.SUNDAY_DAY.remove();
                    document.querySelector('.Saturday')?.after(this.SUNDAY_DAY);
                    this.calendarDayNames = document.querySelectorAll('.calendar__day');
                    this.startCalendar();
                }
                else {
                    this.SUNDAY_DAY.remove();
                    document.querySelector('.Monday')?.before(this.SUNDAY_DAY);
                    this.calendarDayNames = document.querySelectorAll('.calendar__day');
                    this.startCalendar();
                }
            });
    
            this.WEEKEND_DAYS?.forEach((day) => {
                day.addEventListener('change', () => {
                    let dayName = day.name.split('__')[1];
                    let weekends = JSON.parse(this.STORAGE.weekends);
            
                    if(day.checked) {
                        weekends.push(dayName);
                        this.STORAGE.weekends = JSON.stringify(weekends);
                        this.markWeekends();
                    }
                    else {
                        weekends = weekends.filter(function(item: string) {return item !== dayName;});
                        this.STORAGE.weekends = JSON.stringify(weekends);
                        this.markWeekends();
                    }
                });
            });
    
            this.INVISIBLE_DAYS_BUTTON.addEventListener('change', () => {
                this.startCalendar();
            });
    
            this.ALL_CALENDAR_DAYS.forEach((day) => {
                day.addEventListener('click', () => {
                    this.ALL_CALENDAR_DAYS.forEach((day) => {
                        day.classList.remove('active');
                    });
                    
                    if(!this.PLANNER_CONTENT.parentElement?.classList.contains('hidden')) this.PLANNER_CONTENT.parentElement?.classList.add('hidden');
                    
                    this.PLANNER_CONTENT.value = '';
                    if(!day.classList.contains('invisible') && this.PLANNER_ON_OFF_BUTTON.checked) {
                        day.classList.add('active');
                        if(day.classList.contains('planner')) this.PLANNER_CONTENT.value = JSON.parse(this.STORAGE.planners)[`${day.textContent}${this.CALENDAR_CHOOSE_MONTH.textContent}${this.CALENDAR_CHOOSE_YEAR.textContent}`]
                        else this.PLANNER_CONTENT.placeholder = `Note for ${day.textContent} of ${this.CALENDAR_CHOOSE_MONTH.textContent} ${this.CALENDAR_CHOOSE_YEAR.textContent}`;
                        this.PLANNER_CONTENT.parentElement?.classList.remove('hidden');
                    }
                });
            });
    
            this.PLANNER_ON_OFF_BUTTON.addEventListener('change', () => {
                this.ALL_CALENDAR_DAYS.forEach((day) => {
                    day.classList.remove('active');
                });
                if(!this.PLANNER_CONTENT.parentElement?.classList.contains('hidden')) this.PLANNER_CONTENT.parentElement?.classList.add('hidden');
                this.startCalendar();
            });
    
            this.PLANNER_SUBMIT_BUTTON.addEventListener('click', () => {
                let note = this.PLANNER_CONTENT.value;
                let day = document.querySelector('.active')?.textContent;
                let month = this.CALENDAR_CHOOSE_MONTH.textContent;
                let year = this.CALENDAR_CHOOSE_YEAR.textContent;
                let planners = JSON.parse(this.STORAGE.planners);
                planners[`${day}${month}${year}`] = note;
                this.STORAGE.planners = JSON.stringify(planners);
                this.PLANNER_CONTENT.parentElement?.classList.add('hidden');
                this.markPlannerDays();
            });
        }
    
        startCalendar() {
            this.addCalendarContent();
            this.markCurrentDay();
            this.markHolidays();
            this.markWeekends();
            this.markPlannerDays();
        }
    
        init() {
            this.startCalendar();
            this.buttonEvents();
            this.getWeatherData();
        }
    }
}