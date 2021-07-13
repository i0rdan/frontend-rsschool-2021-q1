import { Game } from "./components/game/game";
import { ImageCategoryModel } from "./models/image-category-model";

export class App {
    private readonly rootElement: HTMLElement;
    private readonly game: Game;


    constructor(element: HTMLElement) {
        this.rootElement = element;

        this.game = new Game();
        this.rootElement.appendChild(this.game.element);
    }

    async start(cardStyle: string, fieldSize: string) {
        const res = await fetch('./images.json');
        const stop = document.getElementById('stop');
        if (!stop) throw Error('Error');
        stop.style.display = 'inline';
        const cat: ImageCategoryModel[] = await res.json();
        var images: string[];
        const cat1 = cat[0];
        if (cardStyle == 'simpson') { 
            images = cat1.images_simpsons.map((name) => `${cat1.category_simpsons}/${name}`);
            images.length = Number(fieldSize);
            this.game.newGame(images);
        }
        else if (cardStyle == 'nature') { 
            images = cat1.images_nature.map((name) => `${cat1.category_nature}/${name}`);
            images.length = Number(fieldSize);
            this.game.newGame(images);
        }
        else if (cardStyle == 'animal') { 
            images = cat1.images_animals.map((name) => `${cat1.category_animals}/${name}`);
            images.length = Number(fieldSize);
            this.game.newGame(images);
        }
    }
}