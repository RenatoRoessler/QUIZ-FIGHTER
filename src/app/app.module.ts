import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth'; // para authenticação
import { AngularFirestoreModule } from '@angular/fire/firestore'; // respnsavel pelo banco de dados

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent,
         PreJogoComponent,
         AdminComponent,
         PerguntaFormDialogComponent } from './components';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatInputModule,
  MatButtonModule,
  MatListModule,
  MatSnackBarModule,
  MatTableModule,
  MatPaginatorModule,
  MatDialogModule,
  MatSelectModule,
  MatIconModule,
  MatTooltipModule,
  MatSlideToggleModule
} from '@angular/material';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PreJogoComponent,
    AdminComponent,
    PerguntaFormDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase), // inicializando oa conexão passando os dados
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    MatSlideToggleModule,
    ReactiveFormsModule
  ],
  providers: [],
  entryComponents: [
    PerguntaFormDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
