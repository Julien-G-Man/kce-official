/*
    events.js
    Handles client-side interactivity for the events page,
    including view toggling and calendar generation.
*/

document.addEventListener('DOMContentLoaded', () => {
    const eventsGrid = document.querySelector('.events-grid');
    const calendarView = document.querySelector('.calendar-view');
    const viewToggle = document.querySelector('.view-toggle');
    const allEvents = window.allEvents;

    // A helper function to format dates for the calendar
    const getEventsForDate = (date) => {
        const eventsOnDate = allEvents.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.toDateString() === date.toDateString();
        });
        return eventsOnDate;
    };

    // Generate and display the calendar
    const generateCalendar = () => {
        const calendarGrid = document.querySelector('.calendar-grid');
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        
        // Clear previous calendar
        calendarGrid.innerHTML = '';

        // Generate calendar header
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        days.forEach(day => {
            const header = document.createElement('div');
            header.className = 'calendar-header';
            header.textContent = day;
            calendarGrid.appendChild(header);
        });

        // Generate calendar days
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day';
            calendarGrid.appendChild(emptyDay);
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentYear, currentMonth, day);
            const hasEvent = getEventsForDate(date).length > 0;
            const dayCell = document.createElement('div');
            dayCell.className = `calendar-day ${hasEvent ? 'has-event' : ''}`;
            dayCell.dataset.date = date.toISOString();
            dayCell.textContent = day;
            calendarGrid.appendChild(dayCell);
        }
    };

    // View toggle functionality
    viewToggle.addEventListener('click', (e) => {
        if (e.target.matches('button')) {
            const targetButton = e.target;
            const view = targetButton.dataset.view;

            // Remove active class from all buttons and views
            viewToggle.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
            eventsGrid.classList.remove('active-view');
            calendarView.classList.remove('active-view');

            // Add active class to the selected button and view
            targetButton.classList.add('active');
            if (view === 'grid') {
                eventsGrid.classList.add('active-view');
            } else if (view === 'calendar') {
                calendarView.classList.add('active-view');
            }
        }
    });

    // Initial load actions
    generateCalendar();
});