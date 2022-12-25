import {OnInit, Component} from '@angular/core';
import {ComponentCanDeactivate} from './exit.about.guard';
import {Observable} from "rxjs";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  saved: boolean = false;
  save(){
      this.saved = true;
  }
   
  canDeactivate() : boolean | Observable<boolean>{
   
      if(!this.saved){
          return confirm("Вы хотите покинуть страницу?");
      }
      else{
          return true;
      }
  }

  ngOnInit() {
    
  }

}
