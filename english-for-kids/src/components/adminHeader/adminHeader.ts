import { GenerateAdminCategories } from "../adminCategories/adminCategories";
import { GenerateAdminWords } from "../adminWords/adminWords";
import { GenerateHeaderMain } from "../header/header";
import { createStore as createAlert } from 'redux';

function counterReducer(state = alert('Пожалуйста, не удаляйте существующие слова и категории, создавайте по возможности свои для проверки(просто не хочется добавлятьзаново все в бд))))). Так же возможна долгая подгрузка карточек с бд(примерно 5-6сек). Заранее спасибо))'), action: { type: string; }) {
  if(action.type === 'alert') return state;
}

export function GenerateAdminPanels() {
    const element = document.querySelector('body');

    if (!element) throw Error('No app');

    element.innerHTML = `
        <header class="header" id="admin-header">
            <div class="header__words">
                <a href="#" id="words">Words</a>
            </div>
            <div class="header__categories">
                <a href="#" id="categories">Categories</a>
            </div>
            <div class="header__logout">
                <button id="header-logout">Выйти</button>
            </div>
        </header>
        <main id="main"></main>
    `;
    let alert = createAlert(counterReducer)

    alert.subscribe(() => console.log(alert.getState()));
    events();
}

function events() {
    const headerWords = document.getElementById('words');
    const headerCategories = document.getElementById('categories');
    const buttonLogout = document.getElementById('header-logout');

    if(!headerCategories || !headerWords || !buttonLogout) throw Error;

    buttonLogout.addEventListener('click', GenerateHeaderMain);
    headerWords.addEventListener('click', GenerateAdminWords);
    headerCategories.addEventListener('click', GenerateAdminCategories);
}