import { BaseComponent } from "../base-component";
import { App } from "../../app";

export class ChooseSettings extends BaseComponent {
    constructor() {
        super();
        this.element.innerHTML = `
        <div class="form-wrapper">
            <form>
                <p>Выберете размер поля</p>
                <div>
                    <input type="radio" id="choiceFor44"
                    name="fieldSize" value="4" checked>
                    <label for="choiceFor44">4 на 4</label>
                
                    <input type="radio" id="choiceFor55"
                    name="fieldSize" value="5">
                    <label for="choiceFor55">5 на 5</label>
                
                    <input type="radio" id="choiceFor66"
                    name="fieldSize" value="6">
                    <label for="choiceFor66">6 на 6</label>
                </div>
                <p>Выберете тип карточек</p>
                <div>
                    <input type="radio" id="choiceForCar"
                    name="cardType" value="nature" checked>
                    <label for="choiceForCar">Природа</label>
                
                    <input type="radio" id="choiceForSimpson"
                    name="cardType" value="simpson">
                    <label for="choiceForSimpson">Сипмсоны</label>
                
                    <input type="radio" id="choiceForAnimal"
                    name="cardType" value="animal">
                    <label for="choiceForAnimal">Животные</label>
                </div>
                <div>
                <button id="saveStart" type="button">Сохранить и начать</button>
                </div>
            </form>
        </div>
        `;
    }
    
    show(){
        this.element;
        const appElement = document.getElementById('main');
        const saveStart = document.getElementById('saveStart');
        const radioField = document.getElementsByName('fieldSize');
        const radioType = document.getElementsByName('cardType');
        let checkedField: string, checkedType: string;

        if (!saveStart || !radioField || !radioType || !appElement) throw Error('Error');

        saveStart.addEventListener('click', () => { 
            for(let i= 0; i < radioField.length; i++){
                if (( <HTMLInputElement> radioField[i]).checked == true) checkedField = ( <HTMLInputElement> radioField[i]).value;  
            } 
            for(let i= 0; i < radioType.length; i++){
                if (( <HTMLInputElement> radioType[i]).checked == true) checkedType = ( <HTMLInputElement> radioType[i]).value;  
            } 
            appElement.innerHTML ='';
            new App(appElement).start(checkedType, checkedField);
        });
}
    
}


