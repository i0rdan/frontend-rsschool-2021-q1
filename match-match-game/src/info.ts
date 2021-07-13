import { Rule } from "./components/rules/rules";

export class Info {
    private readonly rootElement: HTMLElement;
    private readonly rule: Rule;


    constructor(element: HTMLElement) {
        this.rootElement = element;

        this.rule = new Rule();
        this.rootElement.appendChild(this.rule.element);
    }

    start() {
        this.rule.show();
    }
}