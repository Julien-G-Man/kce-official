// sermons.js

document.addEventListener('DOMContentLoaded', () => {
    const sermonsGrid = document.getElementById('sermonsGrid');
    const sermonCards = Array.from(document.querySelectorAll('.sermon-card'));
    const searchInput = document.getElementById('searchInput');
    const speakerFilter = document.getElementById('speakerFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const dateFilter = document.getElementById('dateFilter');
    const tagsContainer = document.getElementById('tagsContainer');
    
    let selectedTags = new Set();
    
    // Function to populate tags dynamically from rendered sermons
    const populateTags = () => {
        const allTags = new Set();
        sermonCards.forEach(card => {
            const tags = card.dataset.tags ? card.dataset.tags.split(',') : [];
            tags.forEach(tag => allTags.add(tag.trim()));
        });
        
        tagsContainer.innerHTML = '';
        allTags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.textContent = tag;
            tagElement.addEventListener('click', () => {
                tagElement.classList.toggle('active');
                if (tagElement.classList.contains('active')) {
                    selectedTags.add(tag);
                } else {
                    selectedTags.delete(tag);
                }
                filterAndSortSermons();
            });
            tagsContainer.appendChild(tagElement);
        });
    };
    
    // Function to filter and sort sermons based on current selections
    const filterAndSortSermons = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedSpeaker = speakerFilter.value.toLowerCase();
        const selectedCategory = categoryFilter.value.toLowerCase();
        const selectedDate = dateFilter.value;
        
        let visibleSermons = sermonCards.filter(card => {
            const matchesSearch = !searchTerm || card.dataset.title.includes(searchTerm) || card.dataset.speaker.includes(searchTerm);
            const matchesSpeaker = !selectedSpeaker || card.dataset.speaker === selectedSpeaker;
            const matchesCategory = !selectedCategory || card.dataset.category === selectedCategory;
            
            const cardTags = card.dataset.tags ? card.dataset.tags.split(',').map(tag => tag.trim()) : [];
            const matchesTags = selectedTags.size === 0 || cardTags.some(tag => selectedTags.has(tag));
            
            return matchesSearch && matchesSpeaker && matchesCategory && matchesTags;
        });
        
        // Apply date sorting
        if (selectedDate === 'latest') {
            visibleSermons.sort((a, b) => new Date(b.dataset.date) - new Date(a.dataset.date));
        } else if (selectedDate === 'oldest') {
            visibleSermons.sort((a, b) => new Date(a.dataset.date) - new Date(b.dataset.date));
        }
        
        // Clear grid and re-append filtered sermons
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
    
    // Add event listeners
    searchInput.addEventListener('input', filterAndSortSermons);
    speakerFilter.addEventListener('change', filterAndSortSermons);
    categoryFilter.addEventListener('change', filterAndSortSermons);
    dateFilter.addEventListener('change', filterAndSortSermons);
    
    // Modal functions
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    const closeModal = document.querySelector('.close-modal');

    // Function to extract YouTube video ID from URL
    function getYouTubeId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    // Function to open video modal
    const openVideoModal = (videoUrl) => {
        const videoId = getYouTubeId(videoUrl);
        if (videoId) {
            videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        } else {
            window.open(videoUrl, '_blank');
        }
    };
    
    // Event listener for opening the modal via sermon cards
    sermonCards.forEach(card => {
        card.addEventListener('click', (event) => {
            const previewUrl = card.dataset.previewUrl;
            openVideoModal(previewUrl);
        });
    });

    // Close modal when clicking the close button
    closeModal.onclick = () => {
        modal.style.display = 'none';
        videoFrame.src = '';
        document.body.style.overflow = 'auto';
    };

    // Close modal when clicking outside the video
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
            videoFrame.src = '';
            document.body.style.overflow = 'auto';
        }
    };
    
    // Initial call to populate tags
    populateTags();
});