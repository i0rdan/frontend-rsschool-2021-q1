import { delay } from "../../shared/delay";
import { BaseComponent } from "../base-component";
import { Card } from "../card/card";
import { CardsField } from "../game-field/cards-field";
import {App} from '../../app';
import { Database } from "../..";
import { Info } from "../../info";

export class Game extends BaseComponent {
    private readonly cardsField: CardsField;
    private interval = setInterval(this.myClock, 1000);
    private activeCard?: Card;
    private isAnimation = false;
    private minute!: number;
    private iDB1 = new Database();
    constructor() {
        super();   
        this.cardsField = new CardsField();
        this.element.innerHTML = `<div id="siteTime">0:0</div>`;
        this.element.appendChild(this.cardsField.element);
        this.iDB1.init('i0rdan');
    }
    newGame(images: string[]) {
        this.cardsField.clear();
        const cards = images.concat(images).map(url => new Card(url)).sort(() => Math.random() - .5);

        cards.forEach( (card) => card.element.addEventListener('click', () => this.cardHandler(card)));
        this.cardsField.addCards(cards);
    }

    myClock() { 
        let timer = document.getElementById("siteTime"); 
        if (!timer) {
            throw Error('No app');
        }
        let minutsAndSeconds = timer.textContent?.split(':');
        if (!minutsAndSeconds) throw Error('No minutes');
        let minuts = Number(minutsAndSeconds[0]);
        let seconds = Number(minutsAndSeconds[1]);
        seconds++;
        if (seconds == 60) {minuts++; seconds=0;}
        timer.innerHTML = minuts + ':' + seconds;
      }

    private async cardHandler(card: Card) {
        if (this.isAnimation) return;
        if (!card.isFlipped) return;
        let endgame = 0;
        for(let i = 0; i < this.cardsField.element.children.length; i++){
            if (this.cardsField.element.children[i].className.split(' ')[1] == 'flipped') endgame++;
        }
        
        this.isAnimation = true;
        await card.flipToFront();

        if (!this.activeCard){ 
            this.activeCard = card;
            this.isAnimation = false;
            return;
        } 
        
        if (this.activeCard.image != card.image) {
            await delay(3000);
            await Promise.all([card.flipToBack(), this.activeCard.flipToBack()]);
        }

        this.activeCard = undefined;
        this.isAnimation = false;

        if(endgame == 1) {
            const userInfo = document.getElementById('userInfo')?.textContent?.split(' ');
            const appElement = document.getElementById('main');
            let timer = document.getElementById("siteTime");
            if (!appElement || !userInfo || !timer) throw Error('No app');
            let minutsAndSeconds = timer.textContent?.split(':');
            if (!minutsAndSeconds) throw Error('No minutes');
            let minuts = Number(minutsAndSeconds[0]);
            let seconds = Number(minutsAndSeconds[1]);
            if (!appElement || !userInfo) {
                clearInterval(this.interval);
                throw Error('No app');
            };
            this.iDB1.writeInPoints(userInfo[0],userInfo[1], minuts*2+seconds*2);
            clearInterval(this.interval);
            alert('Поздравляем');
            appElement.innerHTML = ``;
            new Info(appElement).start();
        }
    }
}


