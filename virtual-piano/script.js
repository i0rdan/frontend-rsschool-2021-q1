const elems = document.querySelectorAll('.piano-key');
const fullscrn = document.querySelector('.fullscreen');
addEventListener("keydown", onclickbutton, true);
addEventListener("keyup", onupbutton, true);
addEventListener("mouseup", onmouseups, true);

for (var i = 0; i < elems.length; i++) {
  elems[i].addEventListener("mousedown", onmousedowns, true);
}

function onmousedowns() {
    var audio = new Audio();
	audio.preload = 'auto';
	const note = event.target.dataset.note;
	const note1 = (event.target.dataset.letter).toUpperCase();
	audio.src = `assets/audio/${note}.mp3`;
	audio.play();
	if(event.target.classList.contains('sharp')) document.querySelector(`div[data-letter="${note1}"]`).style.height = '160px';
	else document.querySelector(`div[data-letter="${note1}"]`).style.height = '260px';
	for (var i = 0; i < elems.length; i++) {
		elems[i].addEventListener("mouseover", dem, true);
		elems[i].addEventListener("mouseout", dem1, true);
	}
}

function dem() {
    var audio = new Audio();
	audio.preload = 'auto';
	const note = event.target.dataset.note;
	const note1 = (event.target.dataset.letter).toUpperCase();
	audio.src = `assets/audio/${note}.mp3`;
	audio.play();
	if(event.target.classList.contains('sharp')) document.querySelector(`div[data-letter="${note1}"]`).style.height = '160px';
	else document.querySelector(`div[data-letter="${note1}"]`).style.height = '260px';
}

function dem1() {
    const note1 = (event.target.dataset.letter).toUpperCase();
	if(event.target.classList.contains('sharp')) document.querySelector(`div[data-letter="${note1}"]`).style.height = '170px';
	else document.querySelector(`div[data-letter="${note1}"]`).style.height = '270px';
		
}

function onmouseups() {
    const note1 = (event.target.dataset.letter).toUpperCase();
	if(event.target.classList.contains('sharp')) document.querySelector(`div[data-letter="${note1}"]`).style.height = '170px';
	else document.querySelector(`div[data-letter="${note1}"]`).style.height = '270px';
	for (var i = 0; i < elems.length; i++) {
		elems[i].removeEventListener("mouseover", dem, true);
		elems[i].removeEventListener("mouseout", dem1, true);
}

}
function onclickbutton() {
	var k = event.code.replace('Key', '');
	var d = document.querySelector(`div[data-letter="${k}"]`).dataset.note;
	var audio = new Audio();
	audio.preload = 'auto';
	audio.src = `assets/audio/${d}.mp3`;
	audio.play();
	if(d[1] == '♯') document.querySelector(`div[data-letter="${k}"]`).style.height = '160px';
	else document.querySelector(`div[data-letter="${k}"]`).style.height = '260px';
}
function onupbutton() {
    var k = event.code.replace('Key', '');
	var d = document.querySelector(`div[data-letter="${k}"]`).dataset.note;
	if(d[1] == '♯') document.querySelector(`div[data-letter="${k}"]`).style.height = '170px';
	else document.querySelector(`div[data-letter="${k}"]`).style.height = '270px';
}

const elemsbtn = document.querySelectorAll('.btn');
for (var i = 0; i < elemsbtn.length; i++) {
  elemsbtn[i].addEventListener("click", onclickletnot, true);
}

function onclickletnot() {
    if (event.target.classList.contains('btn-active') == false) {
		elemsbtn[0].classList.remove('btn-active');
		elemsbtn[1].classList.remove('btn-active');
		event.target.classList.add('btn-active');
	}
	if (event.target.classList.contains('btn-notes')) {
		for (var i = 0; i < elems.length; i++) {
		  elems[i].classList.add('pnotes');
		  elems[i].classList.remove('pletters');
		}
	}
	else {
		for (var i = 0; i < elems.length; i++) {
		  elems[i].classList.add('pletters');
		  elems[i].classList.remove('pnotes');
		}
	}
}

fullscrn.addEventListener("click", onfull, true);

function onfull() {
   if (document.fullscreenElement) {
    document.exitFullscreen();
   } else {
    document.documentElement.requestFullscreen();
   }
}