document.addEventListener('DOMContentLoaded', () => {
    // Initialize FilePond and handle video preview
    const pond = FilePond.create(document.querySelector('.filepond'), {
        allowMultiple: false,
        allowDrop: true,
        maxFileSize: '500MB',
        onaddfile: (error, file) => {
            if (!error) {
                const videoPreviewContainer = document.getElementById('video-preview-container');
                const videoPreview = document.getElementById('video-preview');
                videoPreviewContainer.classList.remove('hidden');
                videoPreview.src = URL.createObjectURL(file.file);
            }
        },
        onremovefile: () => {
            const videoPreviewContainer = document.getElementById('video-preview-container');
            const videoPreview = document.getElementById('video-preview');
            videoPreviewContainer.classList.add('hidden');
            videoPreview.src = '';
        }
    });

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
