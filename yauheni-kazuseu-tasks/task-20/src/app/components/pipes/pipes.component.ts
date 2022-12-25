import { Component, OnInit } from '@angular/core';
import { Observer } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-pipes',
  templateUrl: './pipes.component.html',
  styleUrls: ['./pipes.component.scss']
})
export class PipesComponent implements OnInit {
  a: string = 'Jekka kazusev';
  b: number = 2;
  myDate = new Date(1961, 3, 12);
  object = {a: 1, b: 2, c: 'sdsd'};
  time = new Observable<string>((observer: Observer<string>) => {
    setInterval(() => observer.next(new Date().toString()), 1000);
  });

  constructor() { }

  ngOnInit(): void {
  }

}
