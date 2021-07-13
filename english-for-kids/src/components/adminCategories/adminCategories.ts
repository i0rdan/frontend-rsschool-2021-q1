export function GenerateAdminCategories() {
    const main = document.getElementById('main');

    if(!main) throw Error;

    main.innerHTML = `
    <div class="admin__buttons">
        <button class="admin__button" id="admin_categories_show">Show categories</button>
        <button class="admin__button" id="admin_categories_work">Work with categories</button>
    </div>
    <div class="admin__field" id="admin-field">
    </div>
    `;
    events();
}

function events() {
    const showCategories = document.getElementById('admin_categories_show');
    const workCategories = document.getElementById('admin_categories_work');

    if(!showCategories || !workCategories) throw Error;

    showCategories.addEventListener('click', async () => {
        let response = await fetch("https://server-eng-kids.herokuapp.com/categories");

        if (response.ok) { 
            let json = await response.json();
            CreateViewCategories(json);
        } 
        else console.log("Ошибка HTTP: " + response.status);
    });

    workCategories.addEventListener('click', async () => {
        let response = await fetch("https://server-eng-kids.herokuapp.com/categories");

        if (response.ok) { 
            let json = await response.json();
            CreateWorkCategories(json);
        } 
        else console.log("Ошибка HTTP: " + response.status);
    });
}

function CreateViewCategories(arr: []) {
    const adminField = document.getElementById('admin-field');
    let inner = `<div class="cards__wrapper train">`;
    if (!adminField) throw Error;

    arr.forEach((elem) => {
        inner += `
        <div class="card">
            <img src="${elem['category_photo']}" alt="${elem['category_name']}">
            <p>${elem['category_name']}</p>
        </div>
        `
    });
    inner += `</div>`;
    adminField.innerHTML = inner;
}

function CreateWorkCategories(arr: []) {
    const adminField = document.getElementById('admin-field');
    let inner = `<button id="add-category">Добавить категорию</button><div class="cards__wrapper train">`;
    if (!adminField) throw Error;

    arr.forEach((elem) => {
        inner += `
        <div class="card ${elem['category_name']}">
            <div class="tools"><i class="fas fa-trash fa-1x"></i><i class="fas fa-pen fa-1x"></i></div>
            <img src="${elem['category_photo']}" alt="${elem['category_name']}">
            <p>${elem['category_name']}</p>
        </div>
        `
    });
    inner += `</div>`;
    adminField.innerHTML = inner;

    eventsForWork();
}

function eventsForWork() {
    const buttonAdd = document.getElementById('add-category');
    const deleteButtons = document.querySelectorAll('.fa-trash');
    const updateButtons = document.querySelectorAll('.fa-pen');
    const cards = document.querySelectorAll('.card');
    const workCategories = document.getElementById('admin_categories_work');

    if(!buttonAdd || !deleteButtons || !updateButtons) throw Error;

    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', async () => {
            let response = await fetch(`https://server-eng-kids.herokuapp.com/categories/${cards[i].classList[1]}`, {
              method: 'DELETE'
            });
            (<HTMLElement> workCategories).click();
        });
    }

    buttonAdd.addEventListener('click', () => {
        CreateAddCategory();
    });

    for (let i = 0; i < deleteButtons.length; i++) {
        updateButtons[i].addEventListener('click', () => {
            let categoryName = cards[i].querySelector('p');
            let categoryPhoto = cards[i].querySelector('img');

            if(!categoryName || !categoryPhoto) throw Error; 

            CreateAddCategory(String((<HTMLElement> categoryName).textContent), String((<HTMLPictureElement> categoryPhoto).getAttribute('src')));
        });
    }
}

function CreateAddCategory(catName: string = '', catPhoto:string = '') {
    const adminField = document.getElementById('admin-field');
    let inner = `
    <div class="admin__create">
        <div>
            <label for="createCatName">Category name:</label>
            <input type="text" id="createCatName" name="createCatName" value="${catName}">
        </div>
        <div>
            <label for="createCatPhoto">Category photo link:</label>
            <input type="text" id="createCatPhoto" name="createCatPhoto" value="${catPhoto}">
        </div>`
    if(catName) {
        inner += `<div><button id="createCatSubmitPut">Сохранить</button></div></div>`;
        if (!adminField) throw Error;
        adminField.innerHTML = inner;
        let createCatSubmitPut = document.getElementById('createCatSubmitPut');
        createCatSubmitPut?.addEventListener('click', () => {
            addEventPut(catName);
        });
    }
    else {
        inner += `<div><button id="createCatSubmitPost">Добавить</button></div></div>`;
        if (!adminField) throw Error;
        adminField.innerHTML = inner;
        let createCatSubmitPost = document.getElementById('createCatSubmitPost');
        createCatSubmitPost?.addEventListener('click', () => {
            addEventPost();
        });
    }
}

function addEventPut(catName: string) {
    let catNewName = (<HTMLInputElement> document.getElementById('createCatName')).value.split(' ').join('');
    let catPhoto = (<HTMLInputElement> document.getElementById('createCatPhoto')).value;

    if(!catNewName) alert('Введите корректные данные');
    
    else {
        if(!catPhoto) catPhoto = 'https://proprikol.ru/wp-content/uploads/2020/07/kartinki-znak-voprosa-4.jpg';
        let category = {category_name: catNewName, category_photo: catPhoto};
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        let urlencoded = new URLSearchParams();
        urlencoded.append("body", JSON.stringify(category));
        let requestOptions: RequestInit = {
            method: 'PUT',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        fetch(`https://server-eng-kids.herokuapp.com/categories/${catName}`, requestOptions);
        GenerateAdminCategories();
    }
}

function addEventPost() {
    let catName = (<HTMLInputElement> document.getElementById('createCatName')).value.split(' ').join('');
    let catPhoto = (<HTMLInputElement> document.getElementById('createCatPhoto')).value;

    if(!catName) alert('Введите корректные данные');

    else {
        if(!catPhoto) catPhoto = 'https://proprikol.ru/wp-content/uploads/2020/07/kartinki-znak-voprosa-4.jpg';
        let category = {category_name: catName, category_photo: catPhoto};
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        let urlencoded = new URLSearchParams();
        urlencoded.append("body", JSON.stringify(category));
        let requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };
        fetch("https://server-eng-kids.herokuapp.com/categories", requestOptions);
        GenerateAdminCategories();
    }
}