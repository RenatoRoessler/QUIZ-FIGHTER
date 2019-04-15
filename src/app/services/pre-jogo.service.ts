import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';

import { Jogo } from '../models';
import { JogadorStrategy, Jogador1StrategyService, Jogador2StrategyService } from './strategies';

@Injectable({
  providedIn: 'root'
})
export class PreJogoService {

  readonly JOGOS_COLLECTION = 'jogos/';
  readonly JOGOS_QTD_JOGADORES = 'qtdJogadores';

  personagem: string;
  jogos: Observable<DocumentChangeAction<Jogo>[]>;
  jogo: Jogo;
  jogoDoc: AngularFirestoreDocument<Jogo>;
  nomeJogador: string;
  jogadorStrategy: JogadorStrategy;

  constructor(
    private afs: AngularFirestore,
    private jogador1StrategyService: Jogador1StrategyService,
    private jogador2StrategyService: Jogador2StrategyService
  ) { }

  obterJogosDisponiveis() {
    this.jogos = this.afs.collection<Jogo>(
      this.JOGOS_COLLECTION,
      ref => ref.where(this.JOGOS_QTD_JOGADORES, '<=', 1 )
                .orderBy(this.JOGOS_QTD_JOGADORES, 'desc'))
    .snapshotChanges();
    console.log('jogos', this.jogos);
  }

  selecionarPersonagem(personagem: string) {
    this.personagem = personagem;
    this.jogo = null; // necessário para um segundo jogo
    this.jogos.subscribe((jogosDoc: DocumentChangeAction<Jogo>[]) => {
      for (const i in jogosDoc) {
        if (!this.jogo) {
          this.selecionarJogo(jogosDoc[i]);
        }
      }
    });
  }

  selecionarJogo(jogoDoc: DocumentChangeAction<Jogo>) {
    const jogo = jogoDoc.payload.doc;
    this.jogo = jogo.data() as Jogo;
    this.jogo.id = jogo.id;
    this.iniciarJogo();
  }

  iniciarJogo() {
    console.log('inciar jogo');
    if (this.jogo.qtdJogadores === 0) {
      console.log('1');
      this.jogadorStrategy = this.jogador1StrategyService;
    } else {
      console.log('2');
      this.jogadorStrategy = this.jogador2StrategyService;
    }

    const dadosJogador = {
      nome: this.nomeJogador,
      personagem: this.personagem
    };
    this.personagem = null;
    this.jogadorStrategy.executar(this.jogo, dadosJogador);

  }

}
