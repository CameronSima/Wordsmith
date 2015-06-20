
<html>
<link rel="stylesheet" type="text/css" href="/static/style.css" />
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>


<body>

<!-- <input type="hidden" id="letterset" value='{{!letterset}}'/> -->

<script>
var letterset = {{!letterset}}
</script>
<ul class="nav nav-tabs">
  <li role="presentation" class="active"><a href="#">Play</a></li>
  <li role="presentation"><a href="#">Scores</a></li>
</ul>


<div class="top_scores">
	<ul class="list-group">
		%for item in scores:
	  <li class="list-group-item">
	  <div class="wordOrName">{{ item[0] }}</div><div class="number">{{ item[1] }}</div></li>
	  %end
	</ul>
</div>


<div class="words">
	<ul class="list-group" id="words_list"></ul>
</div>

	<div id="word_container"></div>

	<div class='letter_container'>
		<div id='top'>
				%for item in range(4):
			<div class='letters' id='letter_{{item}}' onclick="select_letter(this)">{{ letters[item] }}</div>
								% end
		</div>
		<div id='bottom'>
				%for item in range(4, 8):
			<div class='letters' id='letter_{{item}}' onclick="select_letter(this)">{{ letters[item] }}</div>
								%end
		</div>
	</div>
<div id="current_score">0</div>


<div id="timer"></div>	
<div class="controls">
	<div class="btn-group btn-group-justified" role="group" aria-label="...">
	  <div class="btn-group" role="group">
	    <button type="button" onclick="end_game()" id="end" class="btn btn-default btn-lg">Take Score</button>
	  </div>
	  <div class="btn-group" role="group">
	    <button type="button" onclick="shuffle()" id="shuffle" class="btn btn-default btn-lg">Shuffle</button>
	  </div>
	  <div class="btn-group" role="group">
	    <button onclick="back()" type="button" id="back" class="btn btn-default btn-lg">Back</button>
	  </div>
	  <div class="btn-group" role="group">
	    <button onclick="submit_word()" type="button" id="submit" class="btn btn-default btn-lg">Submit Word</button>
	  </div>
	</div>
</div>
</body>
</html>
<script src="/static/dict_obj.js"></script>
<script src="/static/game.js"></script>
