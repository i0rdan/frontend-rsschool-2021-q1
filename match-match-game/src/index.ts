import './styles.scss';
import {App} from './app';
import { Info } from './info';
import { Form } from './form';
import { Settings } from './settings';
import { Stats } from './stats';


export class Database {
    public dbase!:IDBDatabase;

    constructor() {
    }

    init(dbName: string, version?: number) {
        const iDB = window.indexedDB;
        const openRequest = iDB.open(dbName, version);
        openRequest.onupgradeneeded = () => {
            let database = openRequest.result;
            let store = database.createObjectStore('users', {keyPath: 'id', autoIncrement: true});
            store.createIndex('name', 'name');
            store.createIndex('email', 'email',{unique: true});
            let storeWithPoints = database.createObjectStore('storeWithPoints', {keyPath: 'id', autoIncrement: true});
            storeWithPoints.createIndex('points', 'points');
            this.dbase = database;
        }
        openRequest.onsuccess = () => {
            this.dbase = openRequest.result;
        }
        
    }

    write(email:string, name: string, surname: string) {
            let transaction = this.dbase.transaction('users', 'readwrite');
            let store = transaction.objectStore('users');
            let result = store.put({email: email, name: name, surname: surname});

            result.onsuccess = ()=> {
                console.log('complete', result.result);
            }
            result.onerror = ()=> {
                console.log('error', result.error);
            }
            transaction.onabort = ()=> {
                console.log('abort');
            }
    }

    writeInPoints(name: string, surname: string, points: number) {
        let transaction = this.dbase.transaction('storeWithPoints', 'readwrite');
        let store = transaction.objectStore('storeWithPoints');
        let result = store.put({name: name, surname: surname, points: points});

        result.onsuccess = ()=> {
            console.log('complete', result.result);
        }
        result.onerror = ()=> {
            console.log('error', result.error);
        }
        transaction.onabort = ()=> {
            console.log('abort');
        }
}
readAllPoints() {
    let transaction = this.dbase.transaction('storeWithPoints', 'readonly');
    let store = transaction.objectStore('storeWithPoints');
    const main = document.getElementById('main');
    let indexPoints = store.index('points');
    let result = indexPoints.getAll();
    let string:string;

    if(!main) throw Error('Error');
    transaction.oncomplete = ()=> {
        string = '<table><tr><td>Имя</td><td>Фамилия</td><td>Очки</td></tr>';
        for(let i = 0; i < result.result.length; i++){
            string += `<tr>
            <td>${result.result[i].name}</td>
            <td>${result.result[i].surname}</td>
            <td>${result.result[i].points}</td>
            </tr>`;
        }
        string += '</table>';
        main.innerHTML = string;
    }
}

    readAll() {
        let transaction = this.dbase.transaction('users', 'readonly');
        let store = transaction.objectStore('users');
        const main = document.getElementById('main');
        let result = store.getAll();
        let string:string;

        if(!main) throw Error('Error');
        transaction.oncomplete = ()=> {
            string = '<table><th><td>Имя</td><td>Фамилия</td><td>Очки</td></th>';
            for(let i = 0; i < result.result.length; i++){
                string += `<tr>
                <td>${result.result[i].email}</td>
                <td>${result.result[i].name}</td>
                <td>${result.result[i].surname}</td>
                </tr>`;
            }
            string += '</table>';
            main.innerHTML = string;
             console.log('complete', result.result[0].email);

    }


    
    }
}

window.onload = () => {
    const iDB1 = new Database();
    iDB1.init('i0rdan');
    const element = document.querySelector('body');
    if (!element) throw Error('No app');
    element.innerHTML = `
        <header class="header">
            <a id="info" class="header__button">Правила игры</a>
            <a id="settings" class="header__button">Настройки</a>
            <a id="stats" class="header__button">Рейтинг</a>
            <a id="registration" class="header__button">Регистрация</a>
            <a id="stop" class="header__button">Остановить</a>
            <a id="userInfo" class="header__button"></a>
        </header>
        <main id="main"></main>
    `;
    const appElement = document.getElementById('main');
    const registration = document.getElementById('registration');
    const info = document.getElementById('info');
    const stop = document.getElementById('stop');
    const userInfo = document.getElementById('userInfo');
    const settings = document.getElementById('settings');
    const stats = document.getElementById('stats');


    if (!registration || !appElement || !info || !stop || !userInfo || !settings || !stats) throw Error('Error');
    stop.style.display = userInfo.style.display = settings.style.display = 'none';
    appElement.innerHTML = ``;
    info.style.backgroundColor = 'salmon';
    new Info(appElement).start();
    info.addEventListener('click', () => {
        appElement.innerHTML = ``; 
        new Info(appElement).start();
        info.style.backgroundColor = 'salmon';
        registration.style.backgroundColor = stop.style.backgroundColor = stats.style.backgroundColor = settings.style.backgroundColor = 'transparent';

    });
    registration.addEventListener('click', () => {
        appElement.innerHTML = ``;
        new Form(appElement).start();
        registration.style.backgroundColor = 'salmon';
        info.style.backgroundColor = stop.style.backgroundColor = stats.style.backgroundColor = settings.style.backgroundColor = 'red';
    });
    settings.addEventListener('click', () => {
        appElement.innerHTML = ``; 
        new Settings(appElement).start();
        settings.style.backgroundColor = 'salmon';
        registration.style.backgroundColor = stop.style.backgroundColor = stats.style.backgroundColor = info.style.backgroundColor = 'red';
    });
    stop.addEventListener('click', () => {
        appElement.innerHTML = ``; 
        new Info(appElement).start();
        stop.style.backgroundColor = 'salmon';
        registration.style.backgroundColor = info.style.backgroundColor = stats.style.backgroundColor = settings.style.backgroundColor = 'red';
    });
    stats.addEventListener('click', () => {
        appElement.innerHTML = ``; 
        new Stats(appElement).start();
        stats.style.backgroundColor = 'salmon';
        registration.style.backgroundColor = stop.style.backgroundColor = info.style.backgroundColor = settings.style.backgroundColor = 'red';
    });
}
