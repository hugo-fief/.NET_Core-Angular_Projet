import { Component } from '@angular/core';
import { CrudService } from './crud.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'StudentFontEnd';

  constructor(private CrudService: CrudService, private titleService: Title) {
    this.titleService.setTitle('Accueil');
  }

  data: any;
  Form: FormGroup;
  submitted = false;
  EventValue: any = 'Enregistrer';

  ngOnInit(): void {
    this.getdata();

    this.Form = new FormGroup({
      id: new FormControl(null),
      lastName: new FormControl('', [Validators.required]),
      firstMidName: new FormControl('', [Validators.required]),
      enrollementDate: new FormControl('', [Validators.required]),
    });
  }

  getdata(): any {
    this.CrudService.getData().subscribe((data: any[]) => {
      this.data = data;
    });
  }

  deleteData(id: any): any {
    this.CrudService.deleteData(id).subscribe((data: any[]) => {
      this.data = data;
      this.getdata();
    });
  }
  Enregistrer(): any {
    this.submitted = true;

    if (this.Form.invalid) {
      return;
    }
    this.CrudService.postData(this.Form.value).subscribe((data: any[]) => {
      this.data = data;
      this.resetFrom();
    });
  }
  Update(): any {
    this.submitted = true;

    if (this.Form.invalid) {
      return;
    }
    this.CrudService.putData(this.Form.value.id, this.Form.value).subscribe((data: any[]) => {
      this.data = data;
      this.resetFrom();
    });
  }

  EditData(Data: any): any {
    this.Form.controls.id.setValue(Data.id);
    this.Form.controls.lastName.setValue(Data.lastName);
    this.Form.controls.firstMidName.setValue(Data.firstMidName);
    this.Form.controls.enrollementDate.setValue(Data.enrollementDate);
    this.EventValue = 'Update';
  }

  resetFrom(): any {
    this.getdata();
    this.Form.reset();
    this.EventValue = 'Enregistrer';
    this.submitted = false;
  }
}
