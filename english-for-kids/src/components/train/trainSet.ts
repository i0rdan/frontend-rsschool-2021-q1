import { AddOneToWordStorage, words } from "../..";
import { createPlaySet } from "../play/playSet";

export function createTrainSet (name:string | null) {
    let masCards: string[][] = [];
    if(!name) throw Error;
    name = name.trim().split(' ').join('');
    for(let i = 0; i < words.length; i++){
        if (words[i][0][0] === name) {
            masCards[0] = words[i][1];
            masCards[1] = words[i][2];
            masCards[2] = [words[i][0][0], words[i][0][0], words[i][0][0], words[i][0][0], words[i][0][0], words[i][0][0], words[i][0][0], words[i][0][0]];
        }
    }
    createCards(masCards);
}

export function createCards(arr: string[][]) {
    const headerChoose = document.getElementById('header-choose');
    const main = document.getElementById('main');
    let flag = 0;
    let inner = ``;
    let name = arr[2][0];
    arr[2].forEach((elem) => {
        if(elem === name) flag += 1;
    });
    if (flag === 8) inner = `<div class="cards-created__wrapper-train ${name}" id="cardsCreatedWrapper">`;
    else inner = `<div class="cards-created__wrapper-train" id="cardsCreatedWrapper">`;
    if (!main || !headerChoose) throw Error('No app');
    headerChoose.innerHTML = `
        <div class="switch" id="choose-train-play">
            <label class="checkbox-green">
                <input type="checkbox">
                <span class="checkbox-green-switch" data-label-on="Play" data-label-off="Train"></span>
            </label>
        </div>
    `;
    for(let i = 0; i < arr[0].length; i++) {
        inner += `
        <div class="train-card">
            <div class="train-card__front">
                <img src="assets/${arr[2][i]}/${arr[0][i]}.jpg" alt="${arr[0][i]}">
                <p>${arr[0][i]}</p>
                <div class="train-card__rotate"><img class="rotate" src="assets/rotate.svg" alt="rotate"></div>
            </div>
            <div class="train-card__back">
                <img src="assets/${arr[2][i]}/${arr[0][i]}.jpg" alt="${arr[1][i]}">
                <p>${arr[1][i]}</p>
            </div>
        </div>
        `;
    }
    inner += `</div>`
    main.innerHTML = inner;
    const cards = document.querySelectorAll('.train-card__front');
    for(let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', () => {
            let audio = new Audio();
            audio.preload = 'auto';
            audio.src = `assets/${arr[2][i]}/${arr[0][i]}.mp3`;
            audio.play();
            AddOneToWordStorage(arr[0][i], 'clicks');
        });
    }
    events();
}

function events() {
    const headerChoose = document.getElementById('choose-train-play');
    const cardsWrapper = document.getElementById('cardsCreatedWrapper');
    const cardsrotate = document.querySelectorAll('.train-card__rotate');
    const cards = document.querySelectorAll('.train-card__front');
    const cardsback = document.querySelectorAll('.train-card__back');
    
    if(!headerChoose || !cardsWrapper) throw Error;

    if(cardsWrapper.classList[1])
    headerChoose.addEventListener('change', () => {
        createPlaySet(cardsWrapper.classList[1]);
    });

    for(let i = 0; i < cardsrotate.length; i++) {
        cardsrotate[i].addEventListener('mousedown', () => {
            (<HTMLElement> cards[i]).style.transform = 'rotateY(180deg)';
            (<HTMLElement> cardsback[i]).style.transform = 'rotateY(0deg)';
        });
        cardsback[i].addEventListener('mouseout', () => {
            (<HTMLElement> cards[i]).style.transform = 'rotateY(0deg)';
            (<HTMLElement> cardsback[i]).style.transform = 'rotateY(180deg)';
        });
    }
}