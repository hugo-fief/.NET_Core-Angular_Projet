import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserApiService } from './core/api/user.api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { UserDto } from './core/dto/user.dto';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  public users$: Observable<UserDto[]> = new Observable<UserDto[]>();
  private unsubscribe$ = new Subject<void>();

  public title = 'CRUD';
  public isFormSubmitted = false;
  public buttonLabel: string = 'Enregistrer';
  public usersForm: FormGroup = new FormGroup({});

  constructor(
    private userApiService: UserApiService, 
    private titleService: Title, 
    private datePipe: DatePipe
  ) {
    this.titleService.setTitle('Accueil');
  }

  ngOnInit(): void {
    this.getAllUsers();

    this.usersForm = new FormGroup({
      id: new FormControl(null),
      surname: new FormControl('', [Validators.required]),
      givenName: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
    });
  }

  getAllUsers(): void {
    this.users$ = this.userApiService.getAllUsers().pipe(takeUntil(this.unsubscribe$));
  }

  deleteUser(userId: string): void {
    this.userApiService.deleteUserById(userId).subscribe(() => {
      this.resetForm();
    });
  }

  userTrackBy(index: number, user: UserDto): string {
    return user.id;
  }

  public onSubmit(): void {
    if (this.buttonLabel == 'Update') {
      this.updateStudent();
    } else {
      this.saveStudent();
    }
  }

  saveStudent(): void {
    this.isFormSubmitted = true;

    if (this.usersForm.invalid) {
      return;
    }

    this.userApiService.createUser(this.usersForm.value).subscribe(() => {
      this.resetForm();
    });
  }

  updateStudent(): void {
    this.isFormSubmitted = true;

    if (this.usersForm.invalid) {
      return;
    }

    this.userApiService.updateUser(this.usersForm.value.id, this.usersForm.value).subscribe(() => {
      this.resetForm();
    });
  }

  editUser(user: UserDto): void {
    this.usersForm.controls['id'].setValue(user.id);
    this.usersForm.controls['surname'].setValue(user.surname);
    this.usersForm.controls['givenName'].setValue(user.givenName);

    let formattedDate = this.datePipe.transform(user.date, 'yyyy-MM-dd');
    this.usersForm.controls['date'].setValue(formattedDate);

    this.buttonLabel = 'Update';
  }

  private resetForm(): void {
    this.getAllUsers();
    this.usersForm.reset();
    this.buttonLabel = 'Enregistrer';
    this.isFormSubmitted = false;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
