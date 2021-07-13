import { BaseComponent } from "../base-component";
import { Settings } from "../../settings";
import { Database } from "../..";

export class Registration extends BaseComponent {
    constructor() {
        super();
        this.element.innerHTML = `
        <div class="form-wrapper">
        <form action="">
            <div class="name">
                <label for="name">Имя</label>
                <input type="text" name="name" id="playerName" placeholder="Иван">
            </div>
            <div class="surname">
                <label for="surname">Фамилия</label>
                <input type="text" name="surname" id="playerSurName" class="" placeholder="Иванов">
            </div>
            <div class="email">
                <label for="email">Емайл</label>
                <input type="text" name="email" id="playerMail" placeholder="ivanov@mail.ru">
            </div>
            <input type="button" name="" id="createPlayer" value="Регистрация" disabled>
        </form>
    </div>
        `;
    }
    
    show(){
        this.element;
        const iDB1 = new Database();
        iDB1.init('i0rdan');
        const EMAIL_REGEX = /^([\w.*-]+@([\w-]+\.)+[\w-]{2,4})$/;
        const NAME_REGEX = /^[a-zа-яА-ЯA-Z]{3,30}$/;
        const create = document.getElementById('createPlayer');
        const playerName = document.getElementById('playerName');
        const playerSurName = document.getElementById('playerSurName');
        const playerMail = document.getElementById('playerMail');
        const appElement = document.getElementById('main');
        const registration = document.getElementById('registration');
        const userInfo = document.getElementById('userInfo');
        const settings = document.getElementById('settings');

        if (!create || !playerName || !playerSurName || !playerMail || !appElement || !registration || !userInfo || !settings) throw Error('Error');

        playerSurName.addEventListener('keyup', check);
        playerName.addEventListener('keyup', check);
        playerMail.addEventListener('keyup', check);
        playerSurName.addEventListener('keyup', checkSurName);
        playerName.addEventListener('keyup', checkName);
        playerMail.addEventListener('keyup', checkMail);

        function checkSurName() {
            if (NAME_REGEX.test(String((<HTMLInputElement> playerSurName).value).toLowerCase()) == false) {playerSurName?.setAttribute('class','wrong');}
            else {playerSurName?.setAttribute('class','right');}
        }
        function checkName() {
            if (NAME_REGEX.test(String((<HTMLInputElement> playerName).value).toLowerCase()) == false) {playerName?.setAttribute('class','wrong'); }
            else {playerName?.setAttribute('class','right');}
        }
        function checkMail() {
            if (EMAIL_REGEX.test(String((<HTMLInputElement> playerMail).value).toLowerCase()) == false) {playerMail?.setAttribute('class','wrong'); }
            else {playerMail?.setAttribute('class','right');}
        }

        function check() {
            if (EMAIL_REGEX.test(String((<HTMLInputElement> playerMail).value).toLowerCase()) == false) {(<HTMLInputElement> create).disabled = true;}
            else if (NAME_REGEX.test(String((<HTMLInputElement> playerName).value).toLowerCase()) == false) {(<HTMLInputElement> create).disabled = true;}
            else if (NAME_REGEX.test(String((<HTMLInputElement> playerSurName).value).toLowerCase()) == false) {(<HTMLInputElement> create).disabled = true;}
            else { (<HTMLInputElement> create).disabled = false; }
        }
        create.addEventListener('click', () => {
            iDB1.write((<HTMLInputElement> playerMail).value,(<HTMLInputElement> playerName).value,(<HTMLInputElement> playerSurName).value);
            appElement.innerHTML = ``; 
            new Settings(appElement).start(); 
            registration.style.display = `none`;
            userInfo.textContent = (<HTMLInputElement> playerName).value + ' ' + (<HTMLInputElement> playerSurName).value;
            userInfo.style.display = settings.style.display ='inline';
        });
    }
}


