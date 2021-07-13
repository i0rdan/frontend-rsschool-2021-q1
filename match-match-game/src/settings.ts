import { ChooseSettings } from "./components/choosesettings/choosesettings";


export class Settings {
    private readonly rootElement: HTMLElement;
    private readonly settings: ChooseSettings;


    constructor(element: HTMLElement) {
        this.rootElement = element;

        this.settings = new ChooseSettings();
        this.rootElement.appendChild(this.settings.element);
    }

    start() {
        this.settings.show();
    }
}