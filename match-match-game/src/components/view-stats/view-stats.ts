import { Database } from "../..";
import { BaseComponent } from "../base-component";

export class ViewStats extends BaseComponent {
    constructor() {
        super();
    }
    
    show(iDB: Database){
        this.element.innerHTML = '<input type="button" name="" id="showStats" value="Показать рейтинг">';
        this.element;
        iDB.init("i0rdan");
        const showStats = document.getElementById('showStats');
        if (!showStats) throw new Error('Error');
        showStats.addEventListener('click', () => {iDB.readAllPoints();});
    }
    
}

