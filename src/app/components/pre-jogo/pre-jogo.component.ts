import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { PreJogoService } from '../../services';
import { Jogo } from '../../models';


@Component({
  selector: 'app-pre-jogo',
  templateUrl: './pre-jogo.component.html',
  styleUrls: ['./pre-jogo.component.css']
})
export class PreJogoComponent implements OnInit {

  readonly P_FADA_VERMELHA = 'fada-vermelha';
  readonly P_ELFO_VERDE = 'elfo-verde';
  readonly P_ELFO_AZUL = 'elfo-azul';
  readonly P_ARQUEIRA = 'arqueira';


  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private preJogoService: PreJogoService) { }

  ngOnInit() {
    this.validarAuthenticacao();
    this.preJogoService.obterJogosDisponiveis();
  }

  validarAuthenticacao() {
    this.afAuth.authState.subscribe(authState => {
      if (authState) {
        this.preJogoService.nomeJogador = authState.email.split('@')[0];
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  selecionarPersonagem(personagem: string) {
    if (this.preJogoService.personagem) {
      return;
    }
    this.preJogoService.selecionarPersonagem(personagem);
  }

  get personagem() {
    return this.preJogoService.personagem;
  }

  sair() {
    this.afAuth.auth.signOut();
  }

}
