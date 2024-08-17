from django.shortcuts import render
from .youtube_utils import initialize_upload
import os

def home(request):
    upload_status = None
    if request.method == 'POST':
        if 'file' in request.FILES and request.FILES['file']:
            video_file = request.FILES['file']
            title = request.POST.get('caption', 'Untitled')
            description = "Follow PinoyBlox for more!"

            # Check if the file exists on disk
            video_file_path = video_file.temporary_file_path() if hasattr(video_file, 'temporary_file_path') else None

            if video_file_path and os.path.exists(video_file_path):
                # Upload the video to YouTube
                try:
                    message = initialize_upload(video_file_path, title, description)
                    upload_status = f"Success: {message}"
                except Exception as e:
                    upload_status = f"Error: {e}"
            else:
                upload_status = "Error: The video file could not be found on the disk."
        else:
            upload_status = "Error: No file was uploaded."

    return render(request, "base.html", {"upload_status": upload_status})
