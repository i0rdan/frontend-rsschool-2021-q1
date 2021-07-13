import { BaseComponent } from "../base-component";

export class Rule extends BaseComponent {
    constructor() {
        super();
        this.element.innerHTML = `
        <div class="rules">
            <p>
                1. Нажмите кнопку регистрации, заполните <br/>необходимые поля и кликните по кнопки регистрации
            </p>
            <p>
                2. Далее в появившемся окне выберете <br/>все необходимые параметры и нажмите кнопку старт
            </p>
            <p>
                3. Находите одинаковые карточки, переворачивая их
            </p>
            <p>
                4. Кликнув на кнопку с рейтингами<br/> можно увидеть список лучших игроков
            </p>
        </div>
        `;
    }
    show(){
        const stop = document.getElementById('stop');
        if (!stop) throw Error('Error');
        stop.style.display = 'none';
        this.element;
    }
    
}


