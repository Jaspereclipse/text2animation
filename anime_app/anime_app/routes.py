import os
from flask import request, send_file
import subprocess
from anime_app import app
from examples.image_to_animation import image_to_animation_simple

PARENT_FOLDER = "/Users/juanyanli"

@app.route("/")
def home():
    return "Hello, World!"


@app.route('/convert-to-gif', methods=['POST'])
def convert_to_gif():
    file = request.files['image']
    # Save the image to a local folder
    image_path = os.path.join(PARENT_FOLDER, file.filename)
    file.save(image_path)

    output = subprocess.run(["python", os.path.join(PARENT_FOLDER, "workspace/text2animation/anime_app/examples/image_to_animation.py"), image_path], capture_output=True, text=True)

    print(output)

    return send_file(os.path.join(PARENT_FOLDER, 'Downloads/video.gif', mimetype='image/gif'))