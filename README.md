# text2animation

## Frontend

To run frontend:

- Create `frontend/.env` file that contains:
  `VITE_OPENAI_API_KEY = "YOUR KEY HERE"`
- Build: `npm build`
- Run: `npm run dev`

## Backend

There are two servers. One is a flask server. One is a dockerized torchserve.

For the flask server:

- `conda create --name animated_drawings python=3.8.13`
- `conda activate animated_drawings`
- `cd anime_app/anime_app`
- `pip install -e .`
- In routes.py, put the absolute path to a directory to save files that the server generates. This path directory should be a sibling to the text2animation repo.
- `export FLASK_APP=anime_app`
- `flask run`

For the docker:

- Follow instructions [here](https://github.com/facebookresearch/AnimatedDrawings/tree/main)
