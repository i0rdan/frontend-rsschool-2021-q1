import { createPlaySet } from "../play/playSet";
import { createTrainSet } from "../train/trainSet";

export function MainCards (){
    const main = document.getElementById('main');
    if (!main) throw Error('No app');
    main.innerHTML = `
        <div class="cards__wrapper train" id="cardsWrapper">
            <div class="card">
                <img src="assets/hug.jpg">
                <p>Action (Set A)</p>
            </div>
            <div class="card">
                <img src="assets/swim.jpg">
                <p>Action (Set B)</p>
            </div>
            <div class="card">
                <img src="assets/build.jpg">
                <p>Action (Set C)</p>
            </div>
            <div class="card">
                <img src="assets/young.jpg">
                <p>Adjective</p>
            </div>
            <div class="card">
                <img src="assets/rabbit.jpg">
                <p>Animal (Set A)</p>
            </div>
            <div class="card">
                <img src="assets/dolphin.jpg">
                <p>Animal (Set B)</p>
            </div>
            <div class="card">
                <img src="assets/dress.jpg">
                <p>Clothes</p>
            </div>
            <div class="card">
                <img src="assets/smile.jpg">
                <p>Emotion</p>
            </div>
        </div>
    `;
    events();
}

function events() {
    const cardsWrapper = document.getElementById('cardsWrapper');
    const cards = document.querySelectorAll('.card');
    
    if(!cardsWrapper) throw Error;

    for(let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', () => {
            if(cardsWrapper.classList[1] == 'play') {
                let menuItem = cards[i].textContent?.trim();
                if(menuItem) addActiveMenu(menuItem);
                createPlaySet(cards[i].textContent);
            }
            else {
                let menuItem = cards[i].textContent?.trim();
                if(menuItem) addActiveMenu(menuItem);
                createTrainSet(cards[i].textContent);
            }
        });
    }
}

function addActiveMenu(menuItem: string) {
    const listItems = document.querySelectorAll('.list-menu__item');
    listItems.forEach((elem) => {
        elem.classList.remove('active');
        if(menuItem === elem.textContent) elem.classList.add('active');
    });
}