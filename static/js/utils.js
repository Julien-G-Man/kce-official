// utils.js - General utility functions

/**
 * Extracts the YouTube video ID from various URL formats.
 * @param {string} url The full YouTube URL.
 * @returns {string|null} The 11-character video ID, or null if not found.
 */
function getYouTubeId(url) {
    if (!url) return null;
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

/**
 * Parses a comma-separated string of tags into an array.
 * @param {string} tagsString The comma-separated string of tags.
 * @returns {string[]} An array of tag strings.
 */
function parseTags(tagsString) {
    if (!tagsString) return [];
    return tagsString.split(',').map(t => t.trim()).filter(Boolean);
}