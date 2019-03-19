import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-pre-jogo',
  templateUrl: './pre-jogo.component.html',
  styleUrls: ['./pre-jogo.component.css']
})
export class PreJogoComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  sair() {
    this.afAuth.auth.signOut();
  }

}
