console.log('sermons.js loaded');

document.addEventListener('DOMContentLoaded', () => {

    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const dateFilter = document.getElementById('dateFilter');
    const tagsContainer = document.getElementById('tagsContainer');
    const sermonsGrid = document.querySelector('.sermons-grid');

    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    const closeModal = document.querySelector('.close-modal');

    if (!sermonsGrid) return;

    const sermonCards = Array.from(document.querySelectorAll('.sermon-card'));

    function parseTags(tags) {
        if (!tags) return [];
        return tags.split(',').map(t => t.trim().toLowerCase());
    }

    function populateTags() {
        if (!tagsContainer) return;

        const tagSet = new Set();

        sermonCards.forEach(card => {
            parseTags(card.dataset.tags).forEach(tag => tagSet.add(tag));
        });

        tagsContainer.innerHTML = '';

        tagSet.forEach(tag => {
            const el = document.createElement('span');
            el.className = 'tag-btn';
            el.textContent = tag;
            el.dataset.tag = tag;
            el.onclick = () => {
                el.classList.toggle('active');
                filterSermons();
            };
            tagsContainer.appendChild(el);
        });
    }

    function getSelectedTags() {
        return new Set(
            Array.from(tagsContainer.querySelectorAll('.tag-btn.active'))
                .map(el => el.dataset.tag)
        );
    }

    function filterSermons() {
        const search = (searchInput?.value || '').toLowerCase();
        const category = (categoryFilter?.value || '').toLowerCase();
        const sortOrder = dateFilter?.value;
        const selectedTags = getSelectedTags();

        let visible = [];

        sermonCards.forEach(card => {
            const title = card.dataset.title.toLowerCase();
            const preacher = card.dataset.preacher.toLowerCase();
            const series = (card.dataset.series || '').toLowerCase();
            const tags = parseTags(card.dataset.tags);
            const date = new Date(card.dataset.date);

            const matchSearch = !search || title.includes(search) || preacher.includes(search);
            const matchCategory = !category || series === category;
            const matchTags = selectedTags.size === 0 || tags.some(t => selectedTags.has(t));

            if (matchSearch && matchCategory && matchTags) {
                visible.push({ card, date });
            }
        });

        if (sortOrder === 'latest') {
            visible.sort((a, b) => b.date - a.date);
        } else if (sortOrder === 'oldest') {
            visible.sort((a, b) => a.date - b.date);
        }

        sermonsGrid.innerHTML = '';

        if (visible.length === 0) {
            sermonsGrid.innerHTML = `
                <div class="no-sermons">
                    <i class="fas fa-search"></i>
                    <p>No sermons found.</p>
                </div>`;
            return;
        }

        visible.forEach(item => sermonsGrid.appendChild(item.card));
    }

    sermonCards.forEach(card => {
        const playBtn = card.querySelector('.play-btn');
        const embedUrl = card.dataset.embedUrl;

        if (!playBtn || !embedUrl) return;

        playBtn.onclick = () => {
            videoFrame.src = `${embedUrl}?autoplay=1`;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        };
    });

    closeModal.onclick = () => {
        modal.style.display = 'none';
        videoFrame.src = '';
        document.body.style.overflow = '';
    };

    window.onclick = e => {
        if (e.target === modal) {
            closeModal.onclick();
        }
    };

    populateTags();
    filterSermons();
});

document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    if (img.complete) img.classList.add('loaded');
    img.onload = () => img.classList.add('loaded');
});