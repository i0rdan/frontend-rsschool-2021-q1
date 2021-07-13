const img = document.querySelector('img');
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const elems = document.querySelectorAll('input');
const res = document.querySelectorAll('output');
let x = (new Date()).getHours();
let pictureNumber = "0" + 1, dayTime;

/*CHOOSE PICTURE*/
if(x >= 0 && x < 6) {dayTime = "night";}
else if(x >= 6 && x < 12) {dayTime = "morning";}
else if(x >= 12 && x < 18) {dayTime = "day";}
else if(x >= 18) {dayTime = "evening";}

/*EDITOR*/
for (let i = 0; i < elems.length; i++) {
	elems[i].oninput = editor;
}

function editor (){
  if (this.id == 'blur') res[0].value = this.value;
  else if (this.id == 'invert') res[1].value = this.value;
  else if (this.id == 'sepia') res[2].value = this.value;
  else if (this.id == 'saturate') res[3].value = this.value;
  else if (this.id == 'hue') res[4].value = this.value;
  img.setAttribute("style", "--hue: " + res[4].value + "deg;" + "--saturate: " + res[3].value + "%;" + "--blur: " + res[0].value + "px;" + "--invert: " + res[1].value + "%;" + "--sepia: " + res[2].value + "%;");
}

/*FULLSCREEN*/
document.querySelector('.fullscreen').addEventListener("click", onFull, true);

function onFull() {
   if (document.fullscreenElement) document.exitFullscreen(); 
   else document.documentElement.requestFullscreen();
}

/*RESET*/
document.querySelector('.btn-reset').addEventListener("click", onReset, true);

function onReset() {
   res[0].value = res[1].value = res[2].value = res[4].value = elems[0].value = elems[1].value = elems[2].value = elems[4].value = 0;
   res[3].value = elems[3].value = 100;
   img.setAttribute("style", "--hue: " + res[4].value + "deg;" + "--saturate: " + res[3].value + "%;" + "--blur: " + res[0].value + "px;" + "--invert: " + res[1].value + "%;" + "--sepia: " + res[2].value + "%;");
}

/*LOAD PICTURE*/
document.getElementById('btnInput').addEventListener("change", loadImg, true);

function loadImg (){
	let file = this.files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
        img.setAttribute('src', e.target.result);
    }
    reader.readAsDataURL(file);
	document.getElementById('btnInput').value = '';
}

/*SAVE PICTURE*/
document.getElementById('btnSave').addEventListener("click", download, true);

function download() {
  const image = new Image();
  image.setAttribute('crossOrigin', 'anonymous');
  image.src = img.src;
  image.onload = function () {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.filter = getComputedStyle(img).getPropertyValue('filter');
    let coef = image.width > image.height ? image.width / 520 : image.height / 830;
	ctx.filter += " blur(" + (res[0].value * coef) + "px)"
    ctx.drawImage(image, 0, 0);
    let link = document.createElement('a');
    link.download = 'img.png';
    link.href = canvas.toDataURL()
    link.click();
    link.delete;
  };
}

/*NEXT PICTURE*/
document.getElementById('btnNext').addEventListener("click", nextImg, true);

function nextImg() {
	pictureNumber = Number(pictureNumber) + 1;
	if(pictureNumber >= 1 && pictureNumber <= 9) {pictureNumber = "0" + pictureNumber;}
	else if(pictureNumber >= 21) {pictureNumber = "0" + 1;}
	img.src = "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/" + dayTime + "/" + pictureNumber + ".jpg";
}

