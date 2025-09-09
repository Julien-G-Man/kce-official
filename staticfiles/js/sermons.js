// This console.log should appear as soon as the file loads.
console.log('sermons.js is running!');

document.addEventListener('DOMContentLoaded', () => {
    const dbg = (...args) => console.debug('[sermons.js]', ...args);

    // --- DOM refs ---
    const searchInput = document.getElementById('searchInput');
    const speakerFilter = document.getElementById('speakerFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const dateFilter = document.getElementById('dateFilter');
    const tagsContainer = document.getElementById('tagsContainer');
    const sermonsGrid = document.querySelector('.sermons-grid');

    // Modal elements
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    const closeModal = document.querySelector('.close-modal');

    // --- Helper Functions ---
    // These are now included directly in this file
    function getYouTubeId(url) {
        if (!url) return null;
        const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    function parseTags(tagsString) {
        if (!tagsString) return [];
        return tagsString.split(',').map(t => t.trim()).filter(Boolean);
    }
    
    // Get a live collection of all sermon cards
    const allSermonCards = Array.from(document.querySelectorAll('.sermon-card'));
    dbg('Found sermon cards:', allSermonCards.length);

    // --- Tags UI & Logic ---
    function populateTags() {
        if (!tagsContainer) return;
        const allTags = new Set();
        allSermonCards.forEach(card => {
            const tagsString = card.dataset.tags || '';
            parseTags(tagsString).forEach(tag => allTags.add(tag.toLowerCase()));
        });

        tagsContainer.innerHTML = '';
        allTags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'tag-btn';
            span.textContent = tag;
            span.dataset.tag = tag;
            span.addEventListener('click', () => {
                span.classList.toggle('active');
                filterSermons();
            });
            tagsContainer.appendChild(span);
        });
    }

    function getSelectedTags() {
        if (!tagsContainer) return new Set();
        return new Set(Array.from(tagsContainer.querySelectorAll('.tag-btn.active')).map(t => t.dataset.tag));
    }
    
    // --- Main Filter & Sort Logic ---
    function filterSermons() {
        const searchTerm = (searchInput?.value || '').toLowerCase();
        const selectedSpeaker = (speakerFilter?.value || '').toLowerCase();
        const selectedCategory = (categoryFilter?.value || '').toLowerCase();
        const selectedDate = dateFilter?.value || '';
        const selectedTags = getSelectedTags();

        const itemsToShow = [];
        const itemsToHide = [];

        allSermonCards.forEach(card => {
            const cardTitle = (card.dataset.title || '').toLowerCase();
            const cardPreacher = (card.dataset.preacher || '').toLowerCase();
            const cardTags = parseTags(card.dataset.tags || '').map(t => t.toLowerCase());
            const cardDate = new Date(card.dataset.date || 0);

            const matchesSearch = !searchTerm || cardTitle.includes(searchTerm) || cardPreacher.includes(searchTerm);
            const matchesSpeaker = !selectedSpeaker || cardPreacher === selectedSpeaker;
            const matchesCategory = !selectedCategory || (card.dataset.series || '').toLowerCase() === selectedCategory;
            const matchesTags = selectedTags.size === 0 || cardTags.some(t => selectedTags.has(t));
            
            if (matchesSearch && matchesSpeaker && matchesCategory && matchesTags) {
                itemsToShow.push({ card, date: cardDate });
            } else {
                itemsToHide.push(card);
            }
        });

        // Sort the visible cards
        if (selectedDate === 'latest') {
            itemsToShow.sort((a, b) => b.date - a.date);
        } else if (selectedDate === 'oldest') {
            itemsToShow.sort((a, b) => a.date - b.date);
        }
        
        // Reorder the grid and handle "no sermons" message
        const fragment = document.createDocumentFragment();
        itemsToShow.forEach(item => fragment.appendChild(item.card));
        sermonsGrid.innerHTML = '';
        sermonsGrid.appendChild(fragment);

        if (itemsToShow.length === 0) {
            sermonsGrid.innerHTML = `<div class="no-sermons"><i class="fas fa-search"></i><p>No sermons found.</p></div>`;
        }
    }
    
    // --- Event Listeners ---
    // Add event listeners for the filter elements
    if (searchInput) searchInput.addEventListener('input', filterSermons);
    if (speakerFilter) speakerFilter.addEventListener('change', filterSermons);
    if (categoryFilter) categoryFilter.addEventListener('change', filterSermons);
    if (dateFilter) dateFilter.addEventListener('change', filterSermons);

    // Handle modal for each card
    allSermonCards.forEach(card => {
        const playBtn = card.querySelector('.play-btn');
        if (playBtn) {
            playBtn.addEventListener('click', () => {
                const embedUrl = card.dataset.embedUrl;
                
                // --- DEBUGGING LINES ---
                console.log('Embed URL:', embedUrl);
                console.log('Video Frame Element:', videoFrame);
                // --- END DEBUGGING LINES ---

                if (embedUrl) {
                    if (videoFrame) {
                        videoFrame.src = `${embedUrl}?autoplay=1`;
                        modal.style.display = 'block';
                        document.body.style.overflow = 'hidden';
                    } else {
                        dbg('Error: videoFrame element not found in the DOM.');
                    }
                } else {
                    dbg('No valid video URL found for this card. Check if highlight_url is set correctly.');
                }
            });
        }
    });

    if (closeModal) {
        closeModal.onclick = () => {
            modal.style.display = 'none';
            if (videoFrame) {
                videoFrame.src = '';
            }
            document.body.style.overflow = 'auto';
        };
    }
    
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            if (videoFrame) {
                videoFrame.src = '';
            }
            document.body.style.overflow = 'auto';
        }
    });

    // --- Initialization ---
    populateTags();
    filterSermons();
    dbg('sermons.js init complete.');
});

document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    img.addEventListener('load', () => {
        img.classList.add('loaded');
    });
    if (img.complete) {
        img.classList.add('loaded');
    }
});