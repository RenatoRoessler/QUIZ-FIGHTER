import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { JogadorStrategy } from './jogador-strategy';
import { Jogo, DadosJogador } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class Jogador1StrategyService extends JogadorStrategy {

  constructor(
    afs: AngularFirestore,
    router: Router,
    snackBar: MatSnackBar ) {
      // passando para o JogadorStrategy
      super(afs, router, snackBar);
    }

    executar(jogo: Jogo, dadosJogador: DadosJogador) {
      console.log('executar1');
      jogo.dataAtualizacao = new Date().getTime();
      jogo.jogador1 = dadosJogador;
      jogo.qtdJogadores++;
      super.atuaalizarDadosJogoFirebase(jogo);
    }
}
