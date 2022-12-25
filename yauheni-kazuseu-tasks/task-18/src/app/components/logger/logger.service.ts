import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  write(logMessage: string) {
    console.log(logMessage);
  }
}
