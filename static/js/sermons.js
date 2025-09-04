/* All the JavaScript from the previous response goes here. No changes needed. */
document.addEventListener('DOMContentLoaded', () => {
    const sermonsGrid = document.getElementById('sermonsGrid');
    const searchInput = document.getElementById('searchInput');
    const speakerFilter = document.getElementById('speakerFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const dateFilter = document.getElementById('dateFilter');
    const tagsContainer = document.getElementById('tagsContainer');
    const sermonCards = Array.from(document.querySelectorAll('.sermon-card'));
    
    const filterSermons = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedSpeaker = speakerFilter.value;
        const selectedCategory = categoryFilter.value;
        const selectedDate = dateFilter.value;
        const selectedTags = new Set(Array.from(tagsContainer.querySelectorAll('.tag.active')).map(el => el.textContent.trim()));

        sermonCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const speaker = card.querySelector('.fa-user').nextSibling.textContent.trim();
            const category = card.querySelector('.fa-folder').nextSibling.textContent.trim();
            const tags = Array.from(card.querySelectorAll('.sermon-tag')).map(el => el.textContent.trim());

            const matchesSearch = !searchTerm || title.includes(searchTerm) || speaker.toLowerCase().includes(searchTerm);
            const matchesSpeaker = !selectedSpeaker || speaker === selectedSpeaker;
            const matchesCategory = !selectedCategory || category === selectedCategory;
            const matchesTags = selectedTags.size === 0 || tags.some(tag => selectedTags.has(tag));

            if (matchesSearch && matchesSpeaker && matchesCategory && matchesTags) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // Handle date sorting after filtering
        const visibleSermons = sermonCards.filter(card => card.style.display !== 'none');
        if (selectedDate === 'latest') {
            visibleSermons.sort((a, b) => new Date(b.querySelector('.fa-calendar').nextSibling.textContent) - new Date(a.querySelector('.fa-calendar').nextSibling.textContent));
        } else if (selectedDate === 'oldest') {
            visibleSermons.sort((a, b) => new Date(a.querySelector('.fa-calendar').nextSibling.textContent) - new Date(b.querySelector('.fa-calendar').nextSibling.textContent));
        }

        sermonsGrid.innerHTML = '';
        if (visibleSermons.length > 0) {
            visibleSermons.forEach(card => sermonsGrid.appendChild(card));
        } else {
            sermonsGrid.innerHTML = `
                <div class="no-sermons">
                    <i class="fas fa-search"></i>
                    <p>No sermons found matching your criteria.</p>
                </div>
            `;
        }
    };

    // Event listeners
    searchInput.addEventListener('input', filterSermons);
    speakerFilter.addEventListener('change', filterSermons);
    categoryFilter.addEventListener('change', filterSermons);
    dateFilter.addEventListener('change', filterSermons);
    
    // Add event listeners for tags
    document.querySelectorAll('.tags-container .tag').forEach(tag => {
        tag.addEventListener('click', () => {
            tag.classList.toggle('active');
            filterSermons();
        });
    });

    // Video modal functionality
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    const closeModal = document.querySelector('.close-modal');

    function getYouTubeId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    sermonsGrid.addEventListener('click', (event) => {
        const card = event.target.closest('.sermon-card');
        if (card) {
            const videoUrl = card.dataset.previewUrl;
            const videoId = getYouTubeId(videoUrl);
            if (videoId) {
                videoFrame.src = `https://www.youtube.com/embed/${videoId}`;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            } else {
                window.open(videoUrl, '_blank');
            }
        }
    });

    closeModal.onclick = () => {
        modal.style.display = 'none';
        videoFrame.src = '';
        document.body.style.overflow = 'auto';
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            videoFrame.src = '';
            document.body.style.overflow = 'auto';
        }
    };
});