import { AddOneToWordStorage, words } from "../..";
import { GenerateHeaderMain } from "../header/header";
import { createTrainSet } from "../train/trainSet";

export function createPlaySet (name:string | null) {
    let masCards: string[] = [];
    if(!name) throw Error;
    name = name.trim().split(' ').join('');
    for(let i = 0; i < words.length; i++){
        if (words[i][0][0] === name) masCards = words[i][1];
    }
    createCards(shuffle(masCards), name);
}

function shuffle(array: string[]) {
    return array.sort(() => Math.random() - 0.5);
}
  

function createCards(arr: string[], name:string) {
    const headerChoose = document.getElementById('header-choose');
    const main = document.getElementById('main');
    let inner = `
    <div class="score" id="score">
    </div>
    <div class="cards-created__wrapper-play ${name}" id="cardsCreatedWrapper">`;
    if (!main || !headerChoose) throw Error('No app');
    headerChoose.innerHTML = `
        <div class="switch" id="choose-train-play">
            <label class="checkbox-green" id="labelc">
                <input type="checkbox">
                <span class="checkbox-green-switch" data-label-on="Play" data-label-off="Train"></span>
            </label>
        </div>
    `;
    for(let i = 0; i < arr.length; i++) {
        inner += `
        <div class="card ${arr[i]}">
            <img src="assets/${name}/${arr[i]}.jpg">
        </div>
        `
        ;
    }
    inner += `</div>
    <div class="game-button" id="button_start_wrapper">    
        <div class="button button_start" id="button_start">
            <p>Start game</p>
        </div>
    </div>
    `
    main.innerHTML = inner;

    events(shuffle(arr));
}

function events(SoundsArr:string[]) {
    const headerChoose = document.getElementById('choose-train-play');
    const labelbc = document.getElementById('labelc');
    const cardsWrapper = document.getElementById('cardsCreatedWrapper');
    const startButton = document.getElementById('button_start');
    
    if(!labelbc || !headerChoose || !cardsWrapper || !startButton) throw Error;

    (<HTMLElement> labelbc).click();

    headerChoose.addEventListener('change', () => {
        createTrainSet(cardsWrapper.classList[1]);
    });

    startButton.addEventListener('click', () => {
        startGame(SoundsArr.map((elem) => {
            return elem;
        }));
    });
}

function startGame (arr:string[]) {
    if(!arr.length){
        const star = document.querySelectorAll('.star');
        let main = document.getElementById('main');
        let wrong = 0;
        star.forEach((elem) => {
            if(elem.classList.contains('wrong')) wrong++;
        });
        if(!main) throw Error;
        if(!wrong) {
            main.innerHTML = `
            <div class="final">
                <p>Success!</p>
                <img src="assets/success.jpg" alt="success">
            </div>
            `; 
            PlayAudio('success');
        }
        else {
            main.innerHTML = `
            <div class="final">
                <p>${wrong} wrong attempts!</p>
                <img src="assets/failure.jpg" alt="failure">
            </div>
            `; 
            PlayAudio('failure');
        }
        setTimeout(GenerateHeaderMain, 2000)
    }
    else {
        let main = document.getElementById('main');
        let cardFields = document.getElementById('cardsCreatedWrapper');
        let buttonWrapper = document.getElementById('button_start_wrapper');
        if(!main || !cardFields|| !buttonWrapper) throw Error;
        buttonWrapper.innerHTML = `
            <div class="button button_repeat" id="button_repeat">
                <img class="rotate" src="assets/repeat.svg" alt="rotate">
            </div>
        `;
        let clone = cardFields.cloneNode(true);
        main.replaceChild(clone, cardFields);
        let repeatButton = document.getElementById('button_repeat');
        let score = document.getElementById('score');
        let cards = document.querySelectorAll('.card');
        let word = arr[arr.length - 1];
        let newStar = document.createElement('div');
        newStar.classList.add('star');
        PlayAudio(word, cardFields.classList[1]);
        repeatButton?.addEventListener('click', () => {
            if(cardFields) PlayAudio(word, cardFields.classList[1]);
        })
        cards.forEach((elem) => {
            if (elem.classList.contains(word)) elem.addEventListener('click', () => {
                elem.classList.add('card_selected');
                PlayAudio('correct');
                arr.length = arr.length - 1;
                newStar.classList.add('right');
                newStar.innerHTML = `<img src="assets/star-win.svg" alt="star-win">`;
                score?.appendChild(newStar);
                AddOneToWordStorage(word, 'correct');
                startGame(arr);
            });
            else elem.addEventListener('click', () => {
                if(!elem.classList.contains('card_selected')) {
                    PlayAudio('error');
                    newStar.classList.add('wrong');
                    newStar.innerHTML = `<img src="assets/star.svg" alt="star">`;
                    score?.appendChild(newStar);
                    AddOneToWordStorage(word, 'wrong');
                    startGame(arr);
                }
            });
        });
    }
}

function PlayAudio(word:string, name:string = '') {
    let audio = new Audio();
    audio.preload = 'auto';
    if(name) audio.src = `assets/${name}/${word}.mp3`;
    else audio.src = `assets/${word}.mp3`;
    audio.play();
}