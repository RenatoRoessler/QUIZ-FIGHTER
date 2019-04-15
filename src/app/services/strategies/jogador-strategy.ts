import { AngularFirestore } from '@angular/fire/firestore';
import { Router} from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Jogo, DadosJogador } from '../../models';

export abstract class JogadorStrategy {

  readonly JOGOS_COLLECTION = 'jogos/';
  readonly JOGOS_DOCUMENT = '/jogo/';
  readonly SNACKBAR_DURATION = { duration: 5000 };

  constructor(
    protected afs: AngularFirestore,
    protected router: Router,
    protected snackBar: MatSnackBar ) { }

  abstract executar(jogo: Jogo, dadosJogador: DadosJogador);

  atuaalizarDadosJogoFirebase(jogo: Jogo) {
    console.log('atuaalizarDadosJogoFirebase');
    const jogosCollectionUrl = this.JOGOS_COLLECTION + jogo.id;
    const jogoUrl = this.JOGOS_DOCUMENT + jogo.id;
    this.afs
      .doc<Jogo>(jogosCollectionUrl)
      .update(jogo)
        .then(res => this.router.navigate( [jogoUrl]) )
        .catch(err => this.snackBar.open(
            'Erro ao iniciar o jogo, tente novamente.',
            'Erro', this.SNACKBAR_DURATION));
  }
}
