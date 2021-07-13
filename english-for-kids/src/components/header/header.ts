import { GenerateLoginFiled } from "../authorization/authorization";
import { MainCards } from "../main/main";
import { createPlaySet } from "../play/playSet";
import { GenerateStatistics } from "../statistics/statistics";
import { createTrainSet } from "../train/trainSet";

export function GenerateHeaderMain () {
    const element = document.querySelector('body');
    if (!element) throw Error('No app');
    element.innerHTML = `
        <header class="header" id="header">
            <div class="header__menu">
                <a href="#" id="menu">menu</a>
                <div class="list-menu hidden" id="list-menu">
                    <div class="list-menu-close" id="list-menu-close"><i class="fas fa-times fa-2x"></i></div>
                    <p class="list-menu__item active"><i class="fas fa-home"></i>Main menu</p>
                    <p class="list-menu__item"><i class="fas fa-plane"></i>Action (Set A)</p>
                    <p class="list-menu__item"><i class="fas fa-swimmer"></i>Action (Set B)</p>
                    <p class="list-menu__item"><i class="fas fa-car"></i>Action (Set C)</p>
                    <p class="list-menu__item"><i class="fas fa-smile"></i>Adjective</p>
                    <p class="list-menu__item"><i class="fas fa-cat"></i>Animal (Set A)</p>
                    <p class="list-menu__item"><i class="fas fa-crow"></i>Animal (Set B)</p>
                    <p class="list-menu__item"><i class="fas fa-tshirt"></i>Clothes</p>
                    <p class="list-menu__item"><i class="fas fa-user"></i>Emotion</p>
                    <p class="list-menu__item"><i class="fas fa-chart-bar"></i>Statistics</p>
                </div>
            </div>
            <div class="header__choose" id="header-choose">
                <div class="switch train" id="choose-main">
                    <label class="checkbox-green">
                        <input type="checkbox">
                        <span class="checkbox-green-switch" data-label-on="Play" data-label-off="Train"></span>
                    </label>
                </div>
            </div>
            <div class="header__login">
                <button id="header-login">Войти</button>
            </div>
        </header>
        <main id="main"></main>
    `;
    
    MainCards();
    events();
}

function events() {
    const menu = document.getElementById('menu');
    const close = document.getElementById('list-menu-close');
    const listMenu = document.getElementById('list-menu'); 
    const chooseMenu = document.getElementById('choose-main');
    const cardsWrapper = document.getElementById('cardsWrapper');
    const listItems = document.querySelectorAll('.list-menu__item');
    const headerLogin = document.getElementById('header-login');

    if (!listMenu || !menu || !close || !chooseMenu || !cardsWrapper || !listItems || !headerLogin) throw Error('No such elems');

    menu.addEventListener('click', () => {
        listMenu.classList.remove('hidden');
    });

    close.addEventListener('click', () => {
        listMenu.classList.add('hidden');
    });

    chooseMenu.addEventListener('change', () => {
        if(chooseMenu.classList.contains('train')) {
            chooseMenu.classList.remove('train');
            chooseMenu.classList.add('play');
            cardsWrapper.classList.remove('train');
            cardsWrapper.classList.add('play');
        }
        else if(chooseMenu.classList.contains('play')) {
            chooseMenu.classList.remove('play');
            chooseMenu.classList.add('train');
            cardsWrapper.classList.remove('play');
            cardsWrapper.classList.add('train');
        }
    });

    for (let i = 0; i < listItems.length; i++) {
        if (i === 0) {
            listItems[i].addEventListener('click', () => {
                listMenu.classList.add('hidden');
                GenerateHeaderMain();
            });
        }
        else if (i === 9) {
            listItems[i].addEventListener('click', () => {
                listMenu.classList.add('hidden');
                listItems.forEach((elem) => {
                    elem.classList.remove('active');
                });
                listItems[i].classList.add('active');
                GenerateStatistics();
            });
        }
        else {
            listItems[i].addEventListener('click', () => {
                listMenu.classList.add('hidden');
                let textElem = listItems[i].textContent;
                listItems.forEach((elem) => {
                    elem.classList.remove('active');
                });
                listItems[i].classList.add('active');
                if(chooseMenu.classList.contains('train')) {
                    createTrainSet(String(textElem).split(' ').join(''));
                }
                else if(chooseMenu.classList.contains('play')) {
                    createPlaySet(String(textElem).split(' ').join(''));
                }
            });
        }
    }

    headerLogin.addEventListener('click', GenerateLoginFiled)
}