// quotes.js

document.addEventListener('DOMContentLoaded', () => {
    const quotesContainer = document.getElementById('quotesContainer');
    const quotesGrid = document.getElementById('quotesContainer');
    const quoteCards = Array.from(document.querySelectorAll('.quote-card'));
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const dateFilter = document.getElementById('dateFilter');
    const tagsContainer = document.getElementById('tagsContainer');
    
    let selectedTags = new Set();
    
    // Function to populate tags dynamically from rendered quotes
    const populateTags = () => {
        const allTags = new Set();
        quoteCards.forEach(card => {
            const tags = card.dataset.tags ? card.dataset.tags.split(',') : [];
            tags.forEach(tag => allTags.add(tag.trim()));
        });
        
        tagsContainer.innerHTML = '';
        allTags.forEach(tag => {
            if (tag) { // Ensure the tag is not an empty string
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
                    filterAndSortQuotes();
                });
                tagsContainer.appendChild(tagElement);
            }
        });
    };
    
    // Function to filter and sort quotes based on current selections
    const filterAndSortQuotes = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value.toLowerCase();
        const selectedDate = dateFilter.value;
        
        let visibleQuotes = quoteCards.filter(card => {
            const matchesSearch = !searchTerm || 
                card.dataset.text.includes(searchTerm) || 
                card.dataset.context.includes(searchTerm);
            const matchesCategory = !selectedCategory || card.dataset.category === selectedCategory;
            
            const cardTags = card.dataset.tags ? card.dataset.tags.split(',').map(tag => tag.trim()) : [];
            const matchesTags = selectedTags.size === 0 || cardTags.some(tag => selectedTags.has(tag));
            
            return matchesSearch && matchesCategory && matchesTags;
        });
        
        // Apply date sorting
        if (selectedDate === 'latest') {
            visibleQuotes.sort((a, b) => new Date(b.dataset.date) - new Date(a.dataset.date));
        } else if (selectedDate === 'oldest') {
            visibleQuotes.sort((a, b) => new Date(a.dataset.date) - new Date(b.dataset.date));
        }
        
        // Hide all cards first, then show the visible ones
        quoteCards.forEach(card => card.style.display = 'none');
        
        if (visibleQuotes.length > 0) {
            visibleQuotes.forEach(card => card.style.display = 'flex');
        } else {
            quotesGrid.innerHTML = `
                <div class="no-quotes">
                    <i class="fas fa-search"></i>
                    <p>No quotes found matching your criteria.</p>
                </div>
            `;
        }
    };
    
    // Add event listeners
    searchInput.addEventListener('input', filterAndSortQuotes);
    categoryFilter.addEventListener('change', filterAndSortQuotes);
    dateFilter.addEventListener('change', filterAndSortQuotes);
    
    // Initial call to populate tags and trigger initial filter
    populateTags();
    filterAndSortQuotes();
});