import { GenerateAdminPanels } from "../adminHeader/adminHeader";

export function GenerateLoginFiled() {
    const main = document.getElementById('main');

    if(!main) throw Error;

    main.innerHTML = `
        <div class="authorizationForm">
            <div>
                <label for="authoLogin">Login:(Admin)</label>
                <input type="text" id="authoLogin" name="authoLogin">
            </div>
            <div>
                <label for="authoPassword">Password:(Admin)</label>
                <input type="password" id="authoPassword" name="authoPassword">
            </div>
            <div>
                <button id="authoSubmit">Войти</button>
            </div>
        </div> 
    `
    events();
}

function events() {
    const loginField = document.getElementById('authoLogin');
    const passField = document.getElementById('authoPassword');
    const loginButton = document.getElementById('authoSubmit');
    const adminLogin = 'Admin';
    const adminPass = 'Admin';

    if(!loginButton || !loginField || !passField) throw Error;

    loginButton.addEventListener('click', () => {
        if((<HTMLInputElement> loginField).value === adminLogin && (<HTMLInputElement> passField).value === adminPass) GenerateAdminPanels();
        else alert('Incorrect login or password');
    });
}