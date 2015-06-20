

function select_letter(letter) {
	build_word(letter);
};


function removeLetter(letter) {
	var parent_node = letter.parentNode;
	parent_node.removeChild(letter);
}

function addElement(cont_id, new_el_type, new_el_classn, text, new_el_id) {
	var container = document.getElementById(cont_id);
	var new_row = document.createElement(new_el_type);
	new_row.className = new_el_classn;
	new_row.id = new_el_id;
	new_row.innerHTML = text;
	container.appendChild(new_row);
}

function sortedWords() {
	var sorted = [];
	for (var prop in Words) {
		sorted.push([prop, Words[prop]])
	};
	sorted.sort(function(a, b) {
		return a[1] - b[1]
	});
	return sorted;
}

function buildWordContainer() {
	sorted_words = sortedWords().reverse().slice(0, 8);
	if (sorted_words.length != 8) {
	var i = sorted_words.length-1;
	addElement("words_list", "li", "list-group-item",
	 			 "", "word-score_container"+i);
	addElement("word-score_container"+i, "div", "wordOrName", "", "word"+i);
	addElement("word-score_container"+i, "div", "number", "", "points"+i);
};
	for (var i=0; i<sorted_words.length; i++) {
		word_text = sorted_words[i][0];
		points = sorted_words[i][1];
		document.getElementById("word"+i).innerHTML = word_text;
		document.getElementById("points"+i).innerHTML = points;

	}



	}


function build_word(letter) {
	var v = letter.getAttribute('id').charAt(letter.getAttribute('id').length-1);
	var l;
	var word_string = '';
	
	for (prop in letterset) {
		if (v == prop) {
			l = letterset[prop];
		}
	};
	
	addElement("word_container", "div", "word_letters", 
				l, "word");
	letter.style.color = 'red';
	letter.onclick = '';
	var word = word_container.childNodes;

	for (var i=word.length-1; i>=0; i--) {
		word_string += word[i].innerHTML || '';
	};
	
	
}

function clearBoard(word_letters, letters, condition) {
	for (var i=letters.length-1; i>=0; i--) {
		letters[i].style.color = 'blue';
		letters[i].onclick = function() { select_letter(this);};
	};
	for (var i=word_letters.length-1; i>=0; i--) {
		removeLetter(word_letters[i]);
	};
}


function back() {
	var word = document
			   .getElementById('word_container')
			   .childNodes;
	
	var last_letter = word[word.length-1];
	console.log(last_letter)
	var letterToReplace = document
						.getElementsByClassName('letters');


	for (var i=letterToReplace.length-1; i>=0; i--) {
		if (letterToReplace[i].innerHTML == last_letter.innerHTML) {
			letterToReplace[i].style.color = 'blue';
			letterToReplace[i].onclick = function() { select_letter(this);
			};
			removeLetter(last_letter);
		};
	};

}

function shuffle() {
 	var elems = document.getElementsByClassName('letters');
    allElems = (function(){
	var ret = [], l = elems.length;
	while (l--) { ret[ret.length] = elems[l]; }
	return ret;
    })();
 
    var shuffled = (function(){
        var l = allElems.length, ret = [];
        while (l--) {
            var random = Math.floor(Math.random() * allElems.length),
                randEl = allElems[random].cloneNode(true);
            allElems.splice(random, 1);
            ret[ret.length] = randEl;
        }
        return ret; 
    })(), l = elems.length;
 
    while (l--) {
        elems[l].parentNode.insertBefore(shuffled[l], elems[l].nextSibling);
        elems[l].parentNode.removeChild(elems[l]);
    }
 
}

function timer() {
	var seconds = 120;
	var interval = setInterval(function() {
		document.getElementById('timer').innerHTML = --seconds;

		if (seconds <= 0) {
			document.getElementById('timer').innerHTML = 'Game Over!';
			end_game();
			clearInterval(interval);
		}

	}, 1000);
}


function submit_word() {
	var ls = [];
	for (prop in letterset) {
		ls.push(letterset[prop]);

	};
	var word_string = '';
	var word = document
			   .getElementById('word_container')
			   .childNodes;
	for (var i in word) {
		var w = word[i].innerHTML;

		for (var prop=0; prop<ls.length; prop++) {
			if (ls[prop] == w) {
				console.log(w);
				word_string += w;
				ls.splice(prop)

			}
		}


		// for (var i=0; i<ls.length; i++) {
		// 	if (ls[i] === w) {
		// 		console.log('true')

		// 		word_string += w || '';
		// 		delete ls[i]

		// 	}
		
}

console.log(word_string)
	clearBoard(document
		   .getElementById('word_container')
		   .childNodes, document
					.getElementsByClassName('letters'))

	if (eng_dictionary[word_string]) {
		var word_score = score(word_string);

		var word_count = Object.len(Words);
		Words[word_string] = word_score;
		var word_count2 = Object.len(Words);

		if (word_count2 > word_count) {
		buildWordContainer();
		document.getElementById('current_score').innerHTML = get_current_score().toLocaleString();
		
	};
		


	} else {

	
};
}


Object.len = function(obj) {
	var size = 0, key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) size ++;
	}
	return size;
};

var values =  {
				'a': 3, 'b': 10, 'c': 7, 'd': 9, 'e': 1,
			   'f': 10, 'g': 9, 'h': 9, 'i': 4, 'j': 12,
			   'k': 6, 'l': 2, 'm': 9, 'n': 5, 'o': 5, 'p': 9, 
			   'q': 12, 'r': 4, 's': 6, 't': 5, 'u': 8, 
			   'v': 11, 'w': 11, 'x': 12, 'y': 10, 'z': 12 
		};

var formulas = {

    	1: [1, 0],
    	2: [20, 2000],
    	3: [70, 7000],
    	4: [80, 8000],
    	5: [100, 10000],
    	6: [120, 12000],
    	7: [140, 15000],
    	8: [180, 20000],
    	9: [220, 25000],
    	10: [260, 30000],
    	11: [350, 40000],
    	12: [440, 50000]
	};


function score(word) {
		var sum = 0;
		for (var i=0; i < word.length; i++) {
			sum += values[word[i].toLowerCase()];
		};

	var factor = formulas[word.length][0];
	var offset = formulas[word.length][1];
	return (factor * sum + offset);

}

var get_current_score = function() {
	var tally = 0;
	for (prop in Words) {
		tally += Words[prop];
	}
	return tally;
	
}

function end_game() {
	var final_score = get_current_score();
	$.ajax({
		type: "POST",
		url: "http://localhost:8080/",
		dataType: "json",
		async: false,
		contentType: "application/json",
		data: JSON.stringify({
								score: final_score,
								name: username
		})
	})
}


var word_list_count = 0;

var Words = {};

console.log(typeof letterset)
function counter(word_score) { 
	 	return game_score += word_score;
};
	

// var username = window.prompt("Enter your name to play!");
// timer();


