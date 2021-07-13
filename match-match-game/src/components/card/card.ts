import './card.scss'
import { BaseComponent } from "../base-component";

export class Card extends BaseComponent {
    isFlipped = false;
    constructor(readonly image: string) {
        super('div', ['card-container']);

        this.element.innerHTML = `
            <div class="card">
                <div class="card__front" style="background-image: url('./images/${image}')"></div>
                <div class="card__back"></div>
            </div>
        `;
    }

    flipToBack(){
        this.isFlipped = true;
        return this.flip(true);
    }

    flipToFront() {
        this.isFlipped = false;
        return this.flip();
    }

    private flip(isFront = false): Promise<void> {
        return new Promise((resolve) => {
            this.element.classList.toggle('flipped', isFront);
            this.element.addEventListener('transitionend', ()=> resolve(), {
                once: true,
            })
        })
    }
}