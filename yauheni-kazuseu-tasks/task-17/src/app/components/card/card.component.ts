import { OnDestroy, SimpleChanges } from '@angular/core';
import { Input, Output, Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnChanges, OnDestroy {

  @Input() str!: string;
  @Output() str1!: string;
  public flag: boolean = true;

  public cards = [
    {name: 'card4'}
  ];
  constructor() { }

  ngOnInit(): void {
    this.cards.push({name: 'card1'});
    this.cards.push({name: 'card2'});
    this.cards.push({name: 'card3'});
  }

  change() {
    this.flag? this.flag = false : this.flag = true; 
  }

  alert(p: HTMLParagraphElement) {
    p.textContent === 'Play' ? p.textContent = 'Train' : p.textContent = 'Play';
  }  


  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.str);
  }

  ngOnDestroy() {
    this.log(`onDestroy`);
  }

  private log(msg: string) {
    console.log(msg);
  }  

  ngAfterViewInit(){
    console.log("all components are loaded");
  }
}