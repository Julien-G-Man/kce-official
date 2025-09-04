// Quotes Page Specific JavaScript
document.addEventListener('DOMContentLoaded', async () => {
    const quotesContainer = document.getElementById('quotesContainer');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const dateFilter = document.getElementById('dateFilter');
    const tagsContainer = document.getElementById('tagsContainer');
    
    let allQuotes = [];
    let filteredQuotes = [];
    let selectedTags = new Set();

    // Placeholder for fetch function - replace with your actual API endpoint
    const fetchQuotes = async () => {
        // You would replace this with a call to your Django API endpoint
        // Example: const response = await fetch('/api/quotes/');
        // For demonstration, returning mock data.
        return [
            {
                id: 1,
                attributes: {
                    text: "If Righteous men fail to advertise the good products they produce, evil men with bad products that would destroy the world would capture the advertising spaces.",
                    context: "From a public statement",
                    date: "2024-06-07T00:00:00.000Z",
                    category: "General Wisdom",
                    tags: ["Righteousness", "Advertising", "Influence"],
                    source: "Pastor Francis Ansere",
                    speaker: "Pastor Francis Ansere"
                }
            },
            {
                id: 2,
                attributes: {
                    text: "The power to dominate is not in your physical strength, but in your spiritual authority.",
                    context: "From the sermon 'Let Them Have Dominion'",
                    date: "2024-05-31T00:00:00.000Z",
                    category: "Dominion",
                    tags: ["Dominion", "Authority", "Spiritual"],
                    source: "Genesis 1:28",
                    speaker: "Pastor Francis Ansere"
                }
            },
            {
                id: 3,
                attributes: {
                    text: "Your garden is your sphere of influence. Tend to it well, and it will yield dominion.",
                    context: "From the sermon 'The Garden Principle for Dominion'",
                    date: "2024-05-30T00:00:00.000Z",
                    category: "Dominion",
                    tags: ["Garden", "Influence", "Dominion"],
                    source: "Genesis 2:15",
                    speaker: "Pastor Francis Ansere"
                }
            },
            // Add more quotes here
        ];
    };

    // Filter quotes
    const filterQuotes = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        const selectedDate = dateFilter.value;

        // If no filters are active, show all quotes
        if (!searchTerm && !selectedCategory && !selectedDate && selectedTags.size === 0) {
            filteredQuotes = [...allQuotes];
        } else {
            filteredQuotes = allQuotes.filter(quote => {
                const matchesSearch = !searchTerm || 
                    quote.attributes.text.toLowerCase().includes(searchTerm) ||
                    quote.attributes.context.toLowerCase().includes(searchTerm);
                const matchesCategory = !selectedCategory || quote.attributes.category === selectedCategory;
                const matchesTags = selectedTags.size === 0 || 
                    quote.attributes.tags?.some(tag => selectedTags.has(tag));
                
                return matchesSearch && matchesCategory && matchesTags;
            });
        }

        // Apply date sorting if selected
        if (selectedDate === 'latest') {
            filteredQuotes.sort((a, b) => new Date(b.attributes.date) - new Date(a.attributes.date));
        } else if (selectedDate === 'oldest') {
            filteredQuotes.sort((a, b) => new Date(a.attributes.date) - new Date(b.attributes.date));
        }

        renderQuotes();
    };

    // Load quotes
    const loadQuotes = async () => {
        try {
            const quotes = await fetchQuotes();
            allQuotes = quotes;
            filteredQuotes = [...quotes];
            
            // Populate category filter
            const categories = [...new Set(quotes.map(q => q.attributes.category))];
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                categoryFilter.appendChild(option);
            });

            // Populate tags
            const allTags = new Set();
            quotes.forEach(quote => {
                quote.attributes.tags?.forEach(tag => allTags.add(tag));
            });
            
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
                    filterQuotes();
                });
                tagsContainer.appendChild(tagElement);
            });

            renderQuotes();
        } catch (error) {
            console.error('Error loading quotes:', error);
            quotesContainer.innerHTML = `
                <div class="no-quotes">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>Unable to load quotes. Please try again later.</p>
                </div>
            `;
        }
    };

    // Render quotes
    const renderQuotes = () => {
        if (filteredQuotes.length === 0) {
            quotesContainer.innerHTML = `
                <div class="no-quotes">
                    <i class="fas fa-search"></i>
                    <p>No quotes found matching your criteria.</p>
                </div>
            `;
            return;
        }

        quotesContainer.innerHTML = filteredQuotes.map(quote => `
            <div class="quote-card">
                <div class="quote-text">
                    "${quote.attributes.text}"
                </div>
                <div class="quote-meta">
                    <p><i class="fas fa-book"></i> ${quote.attributes.source}</p>
                    <p><i class="fas fa-calendar"></i> ${formatDate(quote.attributes.date)}</p>
                    <p><i class="fas fa-folder"></i> ${quote.attributes.category}</p>
                    <p><i class="fas fa-info-circle"></i> ${quote.attributes.context}</p>
                </div>
                <p class="quote-author">${quote.attributes.speaker || 'Pastor Francis Ansere'}</p>
                ${quote.attributes.tags?.length ? `
                    <div class="quote-tags">
                        ${quote.attributes.tags.map(tag => `
                            <span class="quote-tag">${tag}</span>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `).join('');
    };

    // Event listeners
    searchInput.addEventListener('input', filterQuotes);
    categoryFilter.addEventListener('change', filterQuotes);
    dateFilter.addEventListener('change', filterQuotes);

    // Initial load
    loadQuotes();
});

// Helper function to format dates
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}