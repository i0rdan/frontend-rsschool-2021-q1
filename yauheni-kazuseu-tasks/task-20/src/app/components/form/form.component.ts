import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

export class User{
  constructor(public name: string,
      public email: string,
      public phone: string){}
}

@Component({
  selector: 'my-app',
  templateUrl: './form.component.html'
})
export class FormComponent { 

  user: User = new User("", "", "");
  addUser(){
      console.log(this.user);
  }
}