import { OnDestroy, SimpleChanges } from '@angular/core';
import { Input, Output, Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {DataService} from '../data/data.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  providers: [DataService],
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnChanges, OnDestroy {

  @Input() str!: string;
  @Output() str1!: string;
  public flag: boolean = true;

  public cards!: any;
  id: number;
  constructor(private activateRoute: ActivatedRoute, private dataService: DataService){
      this.id = activateRoute.snapshot.params['id'];
  }
  
  ngOnInit(): void {
    this.cards = this.dataService.getData();
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

  details(id:number) {
    console.log(this.dataService.getDataInfo(id));
  }
}