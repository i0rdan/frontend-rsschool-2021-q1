import { GenerateStorage, words } from "../..";
import { GenerateHeaderMain } from "../header/header";
import { createCards } from "../train/trainSet";

const store = window.localStorage;

export function GenerateStatistics() {
    const main = document.getElementById('main');
    let wordsForRepeat:string[][] = [[],[],[]];
    let inner = `<div class="stats">
    <div class="statistics__buttons">
        <button class="statistics__button" id="stat_repeat">Repeat difficult words</button>
        <button class="statistics__button" id="stat_reset">Reset</button>
    </div>
    <table>
        <caption class="table__name">Cards</caption>
        <tr class="table__row table__row_head">
            <td id="sort_words"><span id="sort_words_span">↓ </span>Word</td>
            <td>Translation</td>
            <td>Category</td>
            <td>Clicks</td>
            <td>Correct</td>
            <td>Wrong</td>
            <td>Errors(%)</td>
        </tr>
    `;

    if(!main) throw Error;

    for(let i = 0; i < store.length; i++) {
        let key = store.key(i);
        if(key) {
            let word = JSON.parse(store[key]);
            inner += `
            <tr class="table__row">
                <td>${word.word}</td>
                <td>${word.translation}</td>
                <td>${word.category}</td>
                <td>${word.clicks}</td>
                <td>${word.correct}</td>
                <td>${word.wrong}</td>
                <td>${word.errors.toFixed(2)}</td>
            </tr>`
            if(word.errors) {
                wordsForRepeat[0].push(word.word);
                wordsForRepeat[1].push(word.translation);
                wordsForRepeat[2].push(word.category);
            }
        }
    }
    inner += `</table></div>`;
    main.innerHTML = inner;
    events(wordsForRepeat);
}

function events(wordsForRepeat: string[][]) {
    const resetButton = document.getElementById('stat_reset');
    const repeatButton = document.getElementById('stat_repeat');
    const sortWords = document.getElementById('sort_words');
    
    if(!resetButton || !repeatButton || !sortWords) throw Error;

    resetButton.addEventListener('click', () => {
        store.clear();
        GenerateStorage(words);
        GenerateStatistics();
    });

    repeatButton.addEventListener('click', () => {
        if(!wordsForRepeat[0].length) {
            let main = document.getElementById('main');
            if(main) main.innerHTML = `<div class="final"><p>No words to repeat</p></div>`; 
            setTimeout(GenerateHeaderMain, 2000)
        }
        else {
            if(wordsForRepeat[0].length > 8) wordsForRepeat[0].length = wordsForRepeat[1].length = wordsForRepeat[2].length= 8;
            createCards(wordsForRepeat);
        }
    });

    sortWords.addEventListener('click', () => {
        let flag = sortWords.getElementsByTagName('span')[0];
        if(flag.textContent === '↓ ') {
            flag.textContent = '↑ ';
            let table = document.querySelector('table');
            if(!table) throw Error; 
        
            let sortedRows = Array.from(table.rows).slice(1).sort((rowA, rowB) => rowA.cells[0].innerHTML < rowB.cells[0].innerHTML ? 1 : -1);
            table.tBodies[0].append(...sortedRows);
        }
        else {
            flag.textContent = '↓ ';
            let table = document.querySelector('table');
            if(!table) throw Error; 
        
            let sortedRows = Array.from(table.rows).slice(1).sort((rowA, rowB) => rowA.cells[0].innerHTML > rowB.cells[0].innerHTML ? 1 : -1);
            table.tBodies[0].append(...sortedRows);
        }
    })
}