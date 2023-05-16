import axios from "axios";
import { load } from "cheerio";
import fs from "fs";

interface Noticia {
  titulo: string;
  link: string;
  texto: string;
}

export const coletaDados = async (): Promise<void> => {
  const response = await axios.get("https://g1.globo.com/ultimas-noticias/");
  const html = response.data;
  const $ = load(html);
  const links: string[] = [];
  const titulos: string[] = [];

  $(".feed-post-link").each((i, element) => {
    const link = $(element).attr("href");
    const titulo = $(element).text();
    if (link) {
      links.push(link);
      titulos.push(titulo);
    }
  });

  const noticias: Noticia[] = await Promise.all(links.map(async (link, i) => {
    // Faz uma requisição para a página de cada notícia
    const newsResponse = await axios.get(link);
    const newsHtml = newsResponse.data;
    const news$ = load(newsHtml);

    // Extrai o texto da notícia
    const texto = news$(".content-text__container").text();

    // Retorna a notícia
    return {
      titulo: titulos[i],
      link: link,
      texto,
    };
  }));

  // Salva os dados em um arquivo
  fs.writeFileSync("noticias.json", JSON.stringify(noticias, null, 2));
};
