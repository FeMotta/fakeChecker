import natural from "natural";
import { removeStopwords, porBr } from "stopword";
import { Noticia } from "../interfaces/Noticia";

export const preprocessarTexto = (noticia: Noticia): Noticia => {
  const tokenizer = new natural.WordTokenizer();

  if (noticia.texto === undefined) {
    throw new Error("Texto da notícia é undefined");  
  }

  let tokens: string[] | null = tokenizer.tokenize(noticia.texto);
  
  if (tokens === null) {
    tokens = [];
  }

  tokens = removeStopwords(tokens, porBr);

  return {
    ...noticia,
    texto: tokens.join(" "),
  };
};
