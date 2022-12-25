import { Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data: any = [
    {name: 'card1', id: 1},
    {name: 'card2', id: 2},
    {name: 'card3', id: 3},
    {name: 'card4', id: 4},
    {name: 'card5', id: 5},
    {name: 'card6', id: 6},
    {name: 'card7', id: 7}
  ];

  constructor(private logService: LoggerService) {}
      
  getData(): string[] {
    this.logService.write('операция получения данных'); 
    return this.data;
  }

  getDataInfo(id: number): any {
    this.logService.write('операция получения данных'); 
    let namee: string;
    this.data.forEach((element: any) => {
      //if (element['id'] === id) namee = element['name'];
      //return element;
    });
    for (let index = 0; index < this.data.length; index++) {
      if (this.data[index].id === id) {
        namee = this.data[index].name;
        return {name: namee, id: id}
      }
    }
  }
}
