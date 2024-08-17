document.addEventListener('DOMContentLoaded', () => {
    // Initialize drag-and-drop area and file input
    const dropArea = document.getElementById('drop-area');
    const fileInput = document.getElementById('file');
    const videoPreviewContainer = document.getElementById('video-preview-container');
    const videoPreview = document.getElementById('video-preview');

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Highlight the drop area when a file is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => dropArea.classList.add('border-indigo-500'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, () => dropArea.classList.remove('border-indigo-500'), false);
    });

    // Handle file drop
    dropArea.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }

    // Handle file selection
    dropArea.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => handleFiles(e.target.files));

    function handleFiles(files) {
        const file = files[0];
        if (file) {
            // Preview the video without creating a new file object
            videoPreviewContainer.classList.remove('hidden');
            videoPreview.src = URL.createObjectURL(file);
            videoPreview.load();
        }
    }

    // Emoji Picker Functionality
    const emojiButton = document.getElementById('emoji-button');
    const emojiPicker = document.getElementById('emoji-picker');
    const captionInput = document.getElementById('caption');

    // List of emojis
    const emojis = ['😀', '😂', '😍', '😉', '😎', '😊', '😢', '😡', '😜', '🤔', '😇', '🤗', '🤩', '😆', '😅', '😏', '🤤'];

    // Dynamically populate emoji picker
    emojis.forEach(emoji => {
        const span = document.createElement('span');
        span.textContent = emoji;
        emojiPicker.appendChild(span);
    });

    emojiButton.addEventListener('click', () => {
        emojiPicker.style.display = emojiPicker.style.display === 'none' || emojiPicker.style.display === '' ? 'flex' : 'none';
    });

    emojiPicker.addEventListener('click', (event) => {
        if (event.target.tagName === 'SPAN') {
            captionInput.value += event.target.textContent;
            emojiPicker.style.display = 'none';
        }
    });

    // Hide picker if clicked outside
    document.addEventListener('click', (event) => {
        if (!emojiPicker.contains(event.target) && !emojiButton.contains(event.target)) {
            emojiPicker.style.display = 'none';
        }
    });
});
