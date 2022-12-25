import { Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data: any = [
    {name: 'card1'},
    {name: 'card2'},
    {name: 'card3'},
    {name: 'card4'},
    {name: 'card5'},
    {name: 'card6'},
    {name: 'card7'}
  ];

  constructor(private logService: LoggerService) {}
      
  getData(): string[] {
    this.logService.write('операция получения данных'); 
    return this.data;
  }
}
