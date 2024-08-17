import os
import google_auth_oauthlib.flow
import googleapiclient.discovery
import googleapiclient.errors
import googleapiclient.http

# Scopes required to upload a video
SCOPES = ["https://www.googleapis.com/auth/youtube.upload"]
TOKEN_FILE = 'token.json'


def authenticate_youtube():
    os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

    # Delete the token file to reset authentication (optional)
    if os.path.exists(TOKEN_FILE):
        os.remove(TOKEN_FILE)

    # Load client secrets file
    client_secrets_file = "C:/Users/RaffyAldiny/PycharmProjects/WeaverDjangoProject/weaver/client_yt_secrets.jsons"

    # Get credentials and create an API client
    flow = google_auth_oauthlib.flow.InstalledAppFlow.from_client_secrets_file(
        client_secrets_file, SCOPES)
    flow.redirect_uri = 'http://localhost:8080/'

    credentials = flow.run_local_server(port=8080)

    youtube = googleapiclient.discovery.build(
        "youtube", "v3", credentials=credentials)

    return youtube


def initialize_upload(video_file_path, title, description):
    youtube = authenticate_youtube()

    request_body = {
        "snippet": {
            "categoryId": "22",  # Category ID for "People & Blogs"
            "title": title,
            "description": description,
            "tags": ["test", "api", "video"]
        },
        "status": {
            "privacyStatus": "private"
        }
    }

    # Upload the video using the provided file path
    request = youtube.videos().insert(
        part="snippet,status",
        body=request_body,
        media_body=googleapiclient.http.MediaFileUpload(video_file_path, chunksize=-1, resumable=True)
    )

    response = None
    while response is None:
        status, response = request.next_chunk()
        if status:
            print(f"Uploaded {int(status.progress() * 100)}%")

    return f"Video uploaded with ID: {response['id']}"
