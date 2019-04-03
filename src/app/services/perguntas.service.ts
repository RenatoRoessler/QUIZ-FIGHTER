import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { MatSnackBar } from '@angular/material';

import { Pergunta} from '../models';

@Injectable({
  providedIn: 'root'
})
export class PerguntasService {

  readonly PERGUNTAS_COLLECTION: string = 'perguntas';  // noma da tabela no firebalse
  readonly SNACKBAR_DURATION: any = { duration: 5000 };
  private perguntasCollection: AngularFirestoreCollection<Pergunta>;

  constructor(private afs: AngularFirestore,
              private snackBar: MatSnackBar) {
    this.perguntasCollection = this.afs.collection<Pergunta>(
      this.PERGUNTAS_COLLECTION
    );
   }

   obterPerguntas(): Observable<Pergunta[]> {
    console.log('obeter');
    return this.perguntasCollection
      .snapshotChanges() // retorna objeto do tiipo DocumentChangeAction
      .map(this.mapearIds); // pega o retorno e aplica a função
   }

   mapearIds(perguntas: DocumentChangeAction<Pergunta>[]): Pergunta[] {
     return perguntas.map(objPergunta => {
       const pergunta = objPergunta.payload.doc.data() as Pergunta;
       pergunta.id = objPergunta.payload.doc.id;
       return pergunta;
     });
   }

   cadatrar(pergunta: Pergunta) {
     this.perguntasCollection.add(pergunta)
      .then(res => this.snackBar.open(
        'Pergunta adicionada com sucesso',
        'OK', this.SNACKBAR_DURATION))
      .catch(err => this.snackBar.open(
        'Erro ao adicionar pergunta.',
        'Erro', this.SNACKBAR_DURATION));
   }
}
