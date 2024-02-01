import { MovieDetail } from "@/typings";

export function getState(data: MovieDetail) {
  var originalLang: string = data.original_language;
  
  var originalSpoke = data.spoken_languages.filter(spoke => spoke.iso_639_1 === originalLang);
  if (originalSpoke.length >= 1)
    originalLang = originalSpoke[0].name;
   
  return originalLang;
}

export function moneyFormat(num: any): string  {
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  
  return currencyFormatter.format(num);
}