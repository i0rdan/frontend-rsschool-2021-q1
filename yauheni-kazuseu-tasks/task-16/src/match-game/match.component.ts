import { Component } from '@angular/core';
     
@Component({
    selector: 'h2',
    template: `
        <label>Введите имя:</label>
        <input [(ngModel)]="name" placeholder="name">
        <p [title]="name">аа</p>
        <h1>Добро пожаловать {{name}}!</h1>
        <button (click)="change()">Change</button>`
})
export class Match_game { 
    name= '';
    change() {
        this.name = 'Evgene';
    }
}