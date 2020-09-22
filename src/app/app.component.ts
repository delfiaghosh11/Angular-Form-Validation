import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  viewMode = '';

  form = new FormGroup({
    'associateName': new FormControl('', [
      Validators.required, 
      Validators.minLength(5), 
      Validators.maxLength(30), 
      Validators.pattern("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$")
    ]),
    'associateId': new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]{6}$")
    ]),
    'projectId': new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-zA-Z0-9]{12}$")
    ]),
    'offshore': new FormControl('', Validators.required),
    'onshore': new FormControl('', Validators.required),
    'comments': new FormControl('', Validators.required)
  });

  get associateName(){
    return this.form.get('associateName');
  }

  get associateId(){
    return this.form.get('associateId');
  }

  get projectId(){
    return this.form.get('projectId');
  }

  get offshore(){
    return this.form.get('offshore');
  }

  get onshore(){
    return this.form.get('onshore');
  }

  get comments(){
    return this.form.get('comments');
  }

  submit(form){
    console.log("Successfully Submitted: ", form);
    
  }
}
