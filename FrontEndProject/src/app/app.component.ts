import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserApiService } from './core/api/user.api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { UserDto } from './core/dto/user.dto';
import { takeUntil, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  public users$: Observable<UserDto[]> = new Observable<UserDto[]>();

  public usersForm: FormGroup;
  public title = 'CRUD';
  public isFormSubmitted = false;
  public buttonLabel = 'Enregistrer';

  constructor(
    private userApiService: UserApiService, 
    private titleService: Title, 
    private datePipe: DatePipe
  ) {
    this.titleService.setTitle('Accueil');
    this.usersForm = this.createFormGroup();
  }

  public ngOnInit(): void {
    this.fetchAllUsers();
  }

  private createFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      surname: new FormControl('', Validators.required),
      givenName: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
    });
  }

  public fetchAllUsers(): void {
    this.users$ = this.userApiService.getAllUsers().pipe(
      takeUntil(this.unsubscribe$),
      catchError(error => {
        console.error('Error fetching users', error);
        return [];
      })
    );
  }

  public deleteUser(userId: string): void {
    this.userApiService.deleteUserById(userId).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe({
      next: () => this.resetForm(),
      error: (error: string) => console.error('Error deleting user', error)
    });
  }

  public userTrackBy(index: number, user: UserDto): string {
    return user.id;
  }

  public onSubmit(): void {
    this.isFormSubmitted = true;
    if (this.usersForm.invalid) return;

    const { id, ...formData } = this.usersForm.value;

    console.log('formData', typeof(formData));
    console.log('id', typeof(id));

    id ? this.updatingUser(id, formData) : this.creatingUser(formData);
  }

  private updatingUser(id: any, formData: any): void {
    this.userApiService.updateUser(id, formData).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe({
      next: () => this.resetForm(),
      error: (error: string) => console.error('Error updating user', error)
    });
  }

  private creatingUser(formData: any): void {
    this.userApiService.createUser(formData).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe({
      next: () => this.resetForm(),
      error: (error: string) => console.error('Error creating user', error)
    });
  }

  public editUser(user: UserDto): void {
    const { id, surname, givenName, date } = user;
    this.usersForm.setValue({
      id,
      surname,
      givenName,
      date: this.datePipe.transform(date, 'yyyy-MM-dd')
    });
    this.buttonLabel = 'Update';
  }

  private resetForm(): void {
    this.fetchAllUsers();
    this.usersForm.reset();
    this.buttonLabel = 'Enregistrer';
    this.isFormSubmitted = false;
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
