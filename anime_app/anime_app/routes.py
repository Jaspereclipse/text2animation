import os
from flask import request, send_file
import requests
import subprocess
from anime_app import app
import shutil


PARENT_FOLDER = "/Users/LHS/Documents/pearvc-openai-hackathon/artifacts/"

@app.route("/")
def home():
    return "Hello, World!"


@app.route('/animate', methods=['POST'])
def convert_to_gif():
    data = request.get_json()
    image_url = data['imageUrl']
    response = requests.get(image_url, stream=True)
    image_path = os.path.join(PARENT_FOLDER, "image.jpg")
    if response.status_code == 200:
        with open(image_path, 'wb') as out_file:
            shutil.copyfileobj(response.raw, out_file)
        del response
    else:
        return "Failed to download image", 400

    output = subprocess.run(["python", os.path.join(PARENT_FOLDER, "../text2animation/anime_app/examples/image_to_animation.py"), image_path, os.path.join(PARENT_FOLDER)], capture_output=True, text=True)

    print(output)

    return send_file(os.path.join(PARENT_FOLDER, 'video.gif'), mimetype='image/gif')