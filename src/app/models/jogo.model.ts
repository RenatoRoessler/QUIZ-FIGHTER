import { Pergunta, DadosJogador } from './';

export interface Jogo {
    qtdJoadores: number;
    vezJogar?: number;
    placar?: {
      jogador1: { acertos: number },
      jogador2: { acertos: number }
    };
    questoes?: Pergunta[];
    questaoNum?: number;
    questaoSel?: number;
    questaoCorreta?: boolean;
    questaoAtualizacao?: number;
    jogador1?: DadosJogador;
    jogador2?: DadosJogador;
    id?: string;
}
