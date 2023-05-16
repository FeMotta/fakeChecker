import axios from "axios";
import fs from "fs";
import { load } from "cheerio";

import { Noticia } from "../interfaces/Noticia";
import { ConfiguracaoSite } from "../interfaces/ConfiguracaoSite";

export const coletaDadosSite = async (config: ConfiguracaoSite): Promise<Noticia[]> => {
  const response = await axios.get(config.urlBase);
  const html = response.data;
  const $ = load(html);
  const links: string[] = [];
  const titulos: string[] = [];

  $(config.seletorLink).each((i, element) => { // Percorre todos os elementos com a classe .feed-post-link
    const link = $(element).attr("href");
    const titulo = $(element).text();
    if (link) {
      links.push(link);
      titulos.push(titulo);
    }
  });

  const noticias: (Noticia | null)[] = await Promise.all(links.map(async (link, i) => { // Faz uma requisição para cada link
    const newsResponse = await axios.get(link);
    const newsHtml = newsResponse.data;
    const news$ = load(newsHtml);
    const texto = news$(config.seletorTexto).text();

    if (!texto) { // Se não tiver texto, retorna null
      return null;
    }

    return {
      titulo: titulos[i],
      link: link,
      texto,
    };

  }));

  const noticiasFiltradas = noticias.filter(noticia => noticia !== null) as Noticia[]; // Filtra as noticias que não são nulas  

  return noticiasFiltradas;
};

export const coletaDados = async (): Promise<void> => {
  const sites: ConfiguracaoSite[] = [
    {
      urlBase: "https://g1.globo.com",
      seletorLink: ".feed-post-link",
      seletorTexto: ".content-text__container"
    },
    {
      urlBase: "https://www.tecmundo.com.br/novidades",
      seletorLink: ".tec--card__title__link",
      seletorTexto: ".tec--article__body"
    },
  ];

  const promises = sites.map(site => coletaDadosSite(site));
  const todasNoticias = (await Promise.all(promises)).flat();

  fs.writeFileSync("noticias.json", JSON.stringify(todasNoticias, null, 2));
};
