#!/usr/bin/env python3

from flask import Flask, render_template, send_from_directory
from werkzeug.exceptions import NotFound

import json
import os


app = Flask(__name__, static_url_path='', static_folder='assets')

TITLE = 'O-Phase 2015'
ETC = 'Tag 1'
TWITTER_HASHTAG = '#ophase15'
SLIDE_FOLDER = 'slides/'


def collect_slides():
	slides = []
	# TODO: Implement some filtering to exclude slides (extension?)
	for filename in sorted(os.listdir(SLIDE_FOLDER)):
		slide = {
			'id': os.path.splitext(filename)[0]
		}
		
		extension = os.path.splitext(filename)[1]
		if extension == '.html' or extension == '.htm':
			with open(SLIDE_FOLDER + filename) as f: 
				slide['data'] = f.read()
			slide['type'] = 'html'
		else:
			slide['data'] = 'slides/' + filename
			slide['type'] = 'image'
		slides.append(slide)
	return slides

def escape_json(json):
	return json.replace('\\', '\\\\'). \
				replace('/', '\\/'). \
				replace('\'', '\\\'')


@app.route("/slides/<path:filename>")
def slide(filename):
	extension = os.path.splitext(filename)[1].lower()
	if extension == '.html' or extension == '.htm':
		raise NotFound()
	return send_from_directory('slides', filename)

@app.route("/")
def index():
	config = {
		'title': TITLE,
		'etc': ETC,
		'twitter_hashtag': TWITTER_HASHTAG,
		'slides': collect_slides()
	}
	return render_template('index.html', configuration=escape_json(json.dumps(config)))


if __name__ == '__main__':
	app.run(host='127.0.0.1', port=8000, debug=False);
