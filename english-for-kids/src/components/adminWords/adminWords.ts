export function GenerateAdminWords() {
    const main = document.getElementById('main');

    if(!main) throw Error;

    main.innerHTML = `
        <div class="admin__buttons">
            <button class="admin__button" id="admin_words_show">Show words</button>
            <button class="admin__button" id="admin_words_work">Work with words</button>
        </div>
        <div class="admin__field" id="admin-field">
        </div>
    `;

    events();
}

function events() {
    const showWords = document.getElementById('admin_words_show');
    const workWords = document.getElementById('admin_words_work');

    if(!showWords || !workWords) throw Error;

    showWords.addEventListener('click', async () => {
        let response = await fetch("https://server-eng-kids.herokuapp.com/words");

        if (response.ok) { 
            let json = await response.json();
            CreateViewWords(json);
        } 
        else console.log("Ошибка HTTP: " + response.status);
    });

    workWords.addEventListener('click', async () => {
        let response = await fetch("https://server-eng-kids.herokuapp.com/words");

        if (response.ok) { 
            let json = await response.json();
            CreateWorkWords(json);
        } 
        else console.log("Ошибка HTTP: " + response.status);
    });
}

function CreateViewWords(arr: []) {
    const adminField = document.getElementById('admin-field');
    let inner = `<div class="cards__wrapper train">`;
    if (!adminField) throw Error('No app');

    arr.forEach((elem) => {
        inner += `
        <div class="train-card">
            <div class="train-card__front">
                <img src="${elem['word_photo']}" alt="${elem['word_name']}">
                <p>${elem['word_name']}</p>
                <div class="train-card__rotate"><img class="rotate" src="assets/rotate.svg" alt="rotate"></div>
            </div>
            <div class="train-card__back">
            <img src="${elem['word_photo']}" alt="${elem['word_name']}">
                <p>${elem['word_translation']}/${elem['word_category']}</p>
            </div>
        </div>
        `
    });
    inner += `</div>`;
    adminField.innerHTML = inner;

    const cards = document.querySelectorAll('.train-card__front');
    for(let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', () => {
            let audio = new Audio();
            audio.preload = 'auto';
            audio.src = `${arr[i]['word_sound']}`;
            audio.play();
        });
    }

    eventsShowWords();
}

function eventsShowWords() {
    const cardsrotate = document.querySelectorAll('.train-card__rotate');
    const cards = document.querySelectorAll('.train-card__front');
    const cardsback = document.querySelectorAll('.train-card__back');

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

function CreateWorkWords(arr: []) {
    const adminField = document.getElementById('admin-field');
    let inner = `<button id="add-word">Добавить слово</button><div class="cards__wrapper train">`;
    if (!adminField) throw Error;

    arr.forEach((elem) => {
        inner += `
        <div class="card ${elem['word_name']} create__words">
            <div class="tools"><i class="fas fa-trash fa-1x"></i><i class="fas fa-pen fa-1x"></i></div>
            <img src="${elem['word_photo']}" alt="${elem['word_name']}">
            <p>${elem['word_name']}</p>
            <p>${elem['word_translation']}</p>
            <p>${elem['word_category']}</p>
            <p class="${elem['word_sound']}"></p>
        </div>
        `
    });
    inner += `</div>`;
    adminField.innerHTML = inner;

    eventsForWork();
}

function eventsForWork() {
    const buttonAdd = document.getElementById('add-word');
    const deleteButtons = document.querySelectorAll('.fa-trash');
    const updateButtons = document.querySelectorAll('.fa-pen');
    const cards = document.querySelectorAll('.card');
    const workWords = document.getElementById('admin_words_work');

    if(!buttonAdd || !deleteButtons || !updateButtons) throw Error;

    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', async () => {
            let response = await fetch(`https://server-eng-kids.herokuapp.com/words/${cards[i].classList[1]}`, {
              method: 'DELETE'
            });
            (<HTMLElement> workWords).click();
        });
    }

    buttonAdd.addEventListener('click', () => {
        CreateAddWord();
    });

    for (let i = 0; i < deleteButtons.length; i++) {
        updateButtons[i].addEventListener('click', () => {
            let wordInfo = cards[i].querySelectorAll('p');
            let wordName = wordInfo[0];
            let wordTranslation = wordInfo[1];
            let wordCategory = wordInfo[2];
            let wordSound = wordInfo[3].classList[0];
            let wordPhoto = cards[i].querySelector('img');

            if(!wordName || !wordPhoto || !wordTranslation || !wordCategory || !wordSound) throw Error; 

            CreateAddWord(String((<HTMLElement> wordName).textContent), String((<HTMLElement> wordTranslation).textContent), String((<HTMLElement> wordCategory).textContent), String(wordSound), String((<HTMLPictureElement> wordPhoto).getAttribute('src')));
        });
    }
}

function CreateAddWord(wName: string = '', wTranslation: string = '', wCategory: string = '', wSound: string = '', wPhoto:string = '') {
    const adminField = document.getElementById('admin-field');
    let inner = `
    <div class="admin__create">
        <div>
            <label for="createWordName">Word name:</label>
            <input type="text" id="createWordName" name="createWordName" value="${wName}">
        </div>
        <div>
            <label for="createWordTranslation">Word translation:</label>
            <input type="text" id="createWordTranslation" name="createWordTranslation" value="${wTranslation}">
        </div>
        <div>
            <label for="createWordCategory">Word category:</label>
            <input type="text" id="createWordCategory" name="createWordCategory" value="${wCategory}">
        </div>
        <div>
            <label for="createWordSound">Word sound link:</label>
            <input type="text" id="createWordSound" name="createWordSound" value="${wSound}">
        </div>
        <div>
            <label for="createWordPhoto">Word photo link:</label>
            <input type="text" id="createWordPhoto" name="createWordPhoto" value="${wPhoto}">
        </div>`
    if(wName) {
        inner += `<div><button id="createWordSubmitPut">Сохранить</button></div></div>`;
        if (!adminField) throw Error;
        adminField.innerHTML = inner;
        let createWordSubmitPut = document.getElementById('createWordSubmitPut');
        createWordSubmitPut?.addEventListener('click', () => {
            addEventPut(wName);
        });
    }
    else {
        inner += `<div><button id="createWordSubmitPost">Добавить</button></div></div>`;
        if (!adminField) throw Error;
        adminField.innerHTML = inner;
        let createWordSubmitPost = document.getElementById('createWordSubmitPost');
        createWordSubmitPost?.addEventListener('click', () => {
            addEventPost();
        });
    }
}

function addEventPut(wordName: string) {
    let wordNewName = (<HTMLInputElement> document.getElementById('createWordName')).value.split(' ').join('');
    let wordPhoto = (<HTMLInputElement> document.getElementById('createWordPhoto')).value;
    let wordCategory = (<HTMLInputElement> document.getElementById('createWordCategory')).value.split(' ').join('');
    let wordTranslation = (<HTMLInputElement> document.getElementById('createWordTranslation')).value.split(' ').join('');
    let wordSound = (<HTMLInputElement> document.getElementById('createWordSound')).value;

    if(!wordNewName || ! wordSound || !wordTranslation || !wordCategory) alert('Введите корректные данные');
    
    else {
        if(!wordPhoto) wordPhoto = 'https://proprikol.ru/wp-content/uploads/2020/07/kartinki-znak-voprosa-4.jpg';
        let word = {
            word_category: wordCategory,
            word_name: wordNewName,
            word_photo: wordPhoto,
            word_translation: wordTranslation,
            word_sound: wordSound
        };
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        let urlencoded = new URLSearchParams();
        urlencoded.append("body", JSON.stringify(word));
        let requestOptions: RequestInit = {
            method: 'PUT',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        fetch(`https://server-eng-kids.herokuapp.com/words/${wordName}`, requestOptions);
        GenerateAdminWords();
    }
}

function addEventPost() {
    let wordNewName = (<HTMLInputElement> document.getElementById('createWordName')).value.split(' ').join('');
    let wordPhoto = (<HTMLInputElement> document.getElementById('createWordPhoto')).value;
    let wordCategory = (<HTMLInputElement> document.getElementById('createWordCategory')).value.split(' ').join('');
    let wordTranslation = (<HTMLInputElement> document.getElementById('createWordTranslation')).value.split(' ').join('');
    let wordSound = (<HTMLInputElement> document.getElementById('createWordSound')).value;

    if(!wordNewName || ! wordSound || !wordTranslation || !wordCategory) alert('Введите корректные данные');

    else {
        if(!wordPhoto) wordPhoto = 'https://proprikol.ru/wp-content/uploads/2020/07/kartinki-znak-voprosa-4.jpg';
        let word = {
            word_category: wordCategory,
            word_name: wordNewName,
            word_photo: wordPhoto,
            word_translation: wordTranslation,
            word_sound: wordSound
        };
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        let urlencoded = new URLSearchParams();
        urlencoded.append("body", JSON.stringify(word));
        let requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        fetch("https://server-eng-kids.herokuapp.com/words", requestOptions);
        GenerateAdminWords();
    }
}