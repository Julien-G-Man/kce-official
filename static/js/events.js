// Events Page Specific JavaScript
document.addEventListener('DOMContentLoaded', async () => {
    const eventsGrid = document.querySelector('.events-grid');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const dateFilter = document.getElementById('dateFilter');
    const viewToggle = document.querySelector('.view-toggle');
    const calendarView = document.querySelector('.calendar-view');
    
    let allEvents = [];
    let filteredEvents = [];

    // Placeholder for fetch function - replace with your actual API endpoint
    const fetchEvents = async () => {
        // You would replace this with a call to your Django API endpoint
        // Example: const response = await fetch('/api/events/');
        // For demonstration, returning mock data.
        return [
            {
                attributes: {
                    title: 'Youth Empowerment Conference',
                    description: 'A two-day conference for young people to be empowered in their faith and purpose.',
                    date: '2025-09-20',
                    time: '9:00 AM - 4:00 PM',
                    location: 'Church Auditorium',
                    category: 'Youth',
                    tags: ['Empowerment', 'Youth', 'Conference'],
                    registrationUrl: 'https://example.com/register/youth'
                }
            },
            {
                attributes: {
                    title: 'Praise and Worship Night',
                    description: 'Join us for a night of heartfelt worship and adoration.',
                    date: '2025-09-25',
                    time: '6:30 PM - 9:00 PM',
                    location: 'Main Sanctuary',
                    category: 'Worship',
                    tags: ['Worship', 'Prayer'],
                    registrationUrl: 'https://example.com/register/worship'
                }
            },
            {
                attributes: {
                    title: 'Couples Retreat',
                    description: 'Strengthen your relationship with God and your partner.',
                    date: '2025-10-15',
                    time: '10:00 AM - 3:00 PM',
                    location: 'Mountain Lodge',
                    category: 'Family',
                    tags: ['Couples', 'Retreat', 'Marriage'],
                    registrationUrl: 'https://example.com/register/couples'
                }
            },
            // Add more events here
        ];
    };

    // Helper function to format the date
    const formatDate = (dateString) => {
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    // Load events
    const loadEvents = async () => {
        try {
            const events = await fetchEvents();
            allEvents = events;
            filteredEvents = [...events];
            
            // Populate category filter
            const categories = [...new Set(events.map(e => e.attributes.category))];
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                categoryFilter.appendChild(option);
            });

            renderEvents();
            generateCalendar();
        } catch (error) {
            console.error('Error loading events:', error);
            eventsGrid.innerHTML = `
                <div class="no-events">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>Unable to load events. Please try again later.</p>
                </div>
            `;
        }
    };

    // Render events
    const renderEvents = () => {
        if (filteredEvents.length === 0) {
            eventsGrid.innerHTML = `
                <div class="no-events">
                    <i class="fas fa-search"></i>
                    <p>No events found matching your criteria.</p>
                </div>
            `;
            return;
        }

        eventsGrid.innerHTML = filteredEvents.map(event => `
            <div class="event-card">
                <div style="position: relative;">
                    <img src="${event.attributes.image}" alt="${event.attributes.title}" class="event-image" loading="lazy">
                    <div class="event-date">
                        ${formatDate(event.attributes.date)}
                    </div>
                </div>
                <div class="event-info">
                    <h3>${event.attributes.title}</h3>
                    <div class="event-meta">
                        <p><i class="fas fa-clock"></i> ${event.attributes.time}</p>
                        <p><i class="fas fa-map-marker-alt"></i> ${event.attributes.location}</p>
                        <p><i class="fas fa-folder"></i> ${event.attributes.category}</p>
                    </div>
                    <p>${event.attributes.description}</p>
                    ${event.attributes.tags?.length ? `
                        <div class="event-tags">
                            ${event.attributes.tags.map(tag => `
                                <span class="event-tag">${tag}</span>
                            `).join('')}
                        </div>
                    ` : ''}
                    <div class="event-actions">
                        <a href="${event.attributes.registrationUrl}" class="btn" target="_blank">
                            <i class="fas fa-calendar-plus"></i> Register Now
                        </a>
                    </div>
                </div>
            </div>
        `).join('');
    };

    // Generate calendar
    const generateCalendar = () => {
        const calendarGrid = document.querySelector('.calendar-grid');
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        
        // Generate calendar header
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        calendarGrid.innerHTML = days.map(day => `
            <div class="calendar-header">${day}</div>
        `).join('');

        // Generate calendar days
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const startingDay = firstDay.getDay();
        const totalDays = lastDay.getDate();

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDay; i++) {
            calendarGrid.innerHTML += '<div class="calendar-day"></div>';
        }

        // Add days of the month
        for (let day = 1; day <= totalDays; day++) {
            const date = new Date(currentYear, currentMonth, day);
            const hasEvent = allEvents.some(event => {
                const eventDate = new Date(event.attributes.date);
                return eventDate.getDate() === day && 
                       eventDate.getMonth() === currentMonth && 
                       eventDate.getFullYear() === currentYear;
            });

            calendarGrid.innerHTML += `
                <div class="calendar-day ${hasEvent ? 'has-event' : ''}" data-date="${date.toISOString()}">
                    ${day}
                </div>
            `;
        }
    };

    // Filter events
    const filterEvents = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        const selectedDate = dateFilter.value;

        filteredEvents = allEvents.filter(event => {
            const matchesSearch = event.attributes.title.toLowerCase().includes(searchTerm) ||
                                 event.attributes.description.toLowerCase().includes(searchTerm);
            const matchesCategory = !selectedCategory || event.attributes.category === selectedCategory;
            
            if (selectedDate === 'upcoming') {
                return matchesSearch && matchesCategory && new Date(event.attributes.date) >= new Date();
            } else if (selectedDate === 'past') {
                return matchesSearch && matchesCategory && new Date(event.attributes.date) < new Date();
            }
            
            return matchesSearch && matchesCategory;
        });

        renderEvents();
    };

    // View toggle
    viewToggle.addEventListener('click', (e) => {
        if (e.target.matches('button')) {
            viewToggle.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            
            if (e.target.dataset.view === 'calendar') {
                eventsGrid.style.display = 'none';
                calendarView.classList.add('active');
            } else {
                eventsGrid.style.display = 'grid';
                calendarView.classList.remove('active');
            }
        }
    });

    // Event listeners
    searchInput.addEventListener('input', filterEvents);
    categoryFilter.addEventListener('change', filterEvents);
    dateFilter.addEventListener('change', filterEvents);

    // Initial load
    loadEvents();
});