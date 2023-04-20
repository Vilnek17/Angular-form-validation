import { Component, OnInit } from '@angular/core';
import {FormGroup, NgModel,FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'home-work';
  // submit(form:any){
  //   if(form.valid){
  //     console.log(form.value);
  //   } else {
  //     form.control.markAllAsTouched()
  //   }
  // }
 
  form!: FormGroup
  ngOnInit(){
           this.form = new FormGroup({
            login: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z0-9]+$')]),
            email: new FormControl('', [Validators.required, Validators.email],  [this.correctEmail]),
            password: new FormControl('', [Validators.required, Validators.minLength(7)]),
           })
  }
  submit(){
    if(this.form.valid){
      console.log(this.form.value);
    } else {
      this.form.markAllAsTouched()
    }
}
correctEmail(control: any): Promise<any> {
  return new Promise(async resolve => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    console.log(users);
    setTimeout(() => {
      const email = control.value;
      const emailSubsist = users.some((user: any) => user.email === email);
      resolve(emailSubsist ? { emailSubsist: true } : null);
    }, 2000);
  });
  }

}