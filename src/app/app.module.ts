import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatSliderModule} from '@angular/material';
import {DataService} from './data.service';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule
  ],

  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
