import { Registration } from "./components/registration/registration";

export class Form {
    private readonly rootElement: HTMLElement;
    private readonly registration: Registration;


    constructor(element: HTMLElement) {
        this.rootElement = element;

        this.registration = new Registration();
        this.rootElement.appendChild(this.registration.element);
    }

    start() {
        this.registration.show();
    }
}