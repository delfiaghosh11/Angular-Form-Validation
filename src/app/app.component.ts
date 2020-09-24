import { TopicValidators } from './topic.validators';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, Form } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  viewMode = 'others';
  imageSrc: string;

  // tslint:disable-next-line: typedef
  ngOnInit(){}

  offshores = [
    {'id': 1, 'name': "Chennai"},
    {'id': 2, 'name': "Bangalore"},
    {'id': 3, 'name': "Hyderabad"},
    {'id': 4, 'name': "Pune"},
    {'id': 5, 'name': "Kochi"}
  ];

  onshores = [
    {'id': 1, 'name': "US"},
    {'id': 2, 'name': "Non US"}
  ];

  skills = [
    {'id': 1, 'name': "HTML5,CSS3,JS"},
    {'id': 2, 'name': "Angular 8"},
    {'id': 3, 'name': "Express JS"},
    {'id': 4, 'name': "SASS"},
    {'id': 5, 'name': "React JS"},
    {'id': 6, 'name': "Node JS"},
    {'id': 7, 'name': "ES5,ES6,ES7..."},
    {'id': 8, 'name': "Veu JS"},
    {'id': 9, 'name': "Mango DB"},
    {'id': 10, 'name': "Bootstrap 4"},
    {'id': 11, 'name': "Typescript"}
  ];

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
    // 'offshore': new FormControl('', Validators.required),
    // 'onshore': new FormControl('', Validators.required),
    'location': new FormControl('', Validators.required),
    'topic': new FormArray([], TopicValidators.minLength(5)),
    'file': new FormControl('', [Validators.required]),
    'comments': new FormControl('', Validators.required)
  });

  setLocation(e){
    if (e.target.value === 'offshore') {
      this.viewMode='offshore';
      this.form.addControl('offshore', new FormControl('', Validators.required));
      this.form.removeControl('onshore');
      this.form.get('location').reset;
      this.form.get('location').setValue("on");
      // console.log(this.form.get('location'));
      
    } else {
      this.viewMode='onshore';
      this.form.addControl('onshore', new FormControl('', Validators.required));
      this.form.removeControl('offshore');
      this.form.get('location').reset;
      this.form.get('location').setValue("on");
      // console.log(this.form.get('location'));
    }
  }

  changeTopic(el){
    if (((this.form.get('topic').value).find(item => item === el.name)) === el.name) {
      (this.form.get('topic') as FormArray).removeAt((this.form.get('topic') as FormArray).controls.findIndex(item => item === el));
      // console.log(this.form.get('topic'));
    } else {
      (this.form.get('topic')as FormArray).push(new FormControl(el.name, TopicValidators.minLength(5)));
      // console.log(this.form.get('topic'));
    }
  }

  onFileChange(event) {
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
        // this.imageSrc = reader.result as string;
     
        this.form.patchValue({
          fileSource: reader.result
        });
   
      };
   
    }
  }

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

  get location(){
    return this.form.get('location');
  }

  get topic(){
    return this.form.get('topic');
  }

  get file(){
    return this.form.get('file');
  }

  get comments(){
    return this.form.get('comments');
  }

  submit(form){
    console.log("Successfully Submitted: ", form);
  }
}
