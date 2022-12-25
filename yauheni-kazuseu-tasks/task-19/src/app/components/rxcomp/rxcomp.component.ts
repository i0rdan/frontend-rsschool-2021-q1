import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-rxcomp',
  templateUrl: './rxcomp.component.html',
  styleUrls: ['./rxcomp.component.scss']
})
export class RxcompComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {
    this.observable.subscribe(this.observer);
    const obs = of(1,2,3).subscribe({
      next: console.log
    });
  }

  public observable = new Observable(observer => {
    observer.next(1);
    observer.next(2);
    observer.complete();
  })

  public observer = {
    next: (value: any) => console.log(value),
    error: (error: Error) => console.error(error), 
    complete: () => console.log("completed")
  }


}
