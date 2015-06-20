import scorer
import random
import os
import sqlite3
import json

from time import strftime
from bottle import route, run, template, get, post, request, TEMPLATE_PATH, static_file

TEMPLATE_PATH.insert(0, os.path.abspath
							(os.path.join(os.path.dirname(__file__), "views")))


letters = scorer.get_letter_set()

@route('/static/<filename>')
def server_static(filename):
	return static_file(filename, root='/home/cameron/Projects/Wordster/static')

@post('/')
def enter_score():
	now = strftime("%Y-%m-%d %H:%M:%S")
	data = request.json
	name = data['name']
	score = data['score']
	db = sqlite3.connect('scores.db')
	c = db.cursor()
	c.execute('''CREATE TABLE IF NOT EXISTS Scores
					(id INTEGER PRIMARY KEY AUTOINCREMENT,
					 player_name text,
					 score integer,
					 score_date timestamp)''')

	c.execute('''INSERT INTO Scores (player_name, score, score_date)
				 VALUES (?, ?, ?)''', (data['name'], data['score'], now))
	db.commit()
	db.close()

@route('/')
def page(letters=letters):
	db = sqlite3.connect('scores.db')
	c = db.cursor()
	# c.execute('SELECT player_name,score_date,score FROM scores')
	c.execute('SELECT player_name,score FROM Scores order by score limit 5')
	data = c.fetchall()
	c.close()
	print json.dumps(letters)

	return template('board', letters=letters, scores=data, letterset=json.dumps(letters))

run(host='localhost', port=8080, debug=True)