import { Database } from ".";
import { ViewStats } from "./components/view-stats/view-stats";

export class Stats {
    private readonly rootElement: HTMLElement;
    private readonly viewStats: ViewStats;


    constructor(element: HTMLElement) {
        this.rootElement = element;

        this.viewStats = new ViewStats();
        this.rootElement.appendChild(this.viewStats.element);
    }

    start() {
        const iDB1 = new Database();
        iDB1.init('i0rdan');
        this.viewStats.show(iDB1);
    }
}