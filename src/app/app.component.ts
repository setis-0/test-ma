import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {DataService} from './data.service';
import {debounceTime, distinctUntilChanged, map, startWith, switchMap} from 'rxjs/operators';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {EmptyObservable} from 'rxjs/observable/EmptyObservable';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form: FormControl;
  filtered: Observable<any[]>;
  type: string;
  yearFormControl: FormControl;
  matcher: MyErrorStateMatcher;
  yearCurrent: number;
  y: number | null;
  error: string;
  status: 'success' | 'error';
  success: string;

  constructor(private service: DataService) {
    this.form = new FormControl();
    this.yearFormControl = new FormControl('', [
      Validators.required,
      Validators.min(1920),
      Validators.max((new Date()).getFullYear()),
      Validators.minLength(4),
      Validators.maxLength(4),
    ]);
    this.yearFormControl.valueChanges.pipe(
      map(result => this.y = result)
    );
    this.y = null;
    this.yearCurrent = (new Date()).getFullYear();
    this.matcher = new MyErrorStateMatcher();
    this.filtered = this.form.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(val => {
        if (val === '') {
          return new EmptyObservable();
        }
        return this.filter(val);
      })
    );

  }


  filter(name: string) {
    let params = {t: name, type: this.type, y: this.yearFormControl.value};
    ['type', 'y'].forEach(value => {
      if (params[value] === undefined || params[value] === 'undefined' || params[value] === '' || params[value] === null) {
        delete params[value];
      }
    });
    return this.service.bySearch(params)
      .pipe(
        map(response => {
          if (response.Response !== false && response.Response !== 'False') {
            console.log('success', response);
            this.status = 'success';
            this.success = response;
            return [response];
          } else {
            console.log('errror', response.Error);
            this.status = 'error';
            this.error = response.Error;
            return [];
          }
        })
      );
  }

}
