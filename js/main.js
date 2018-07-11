'use strict';

var inputSerie = document.querySelector('.input-serie');
var searchSerie = document.querySelector('.search-serie');
var body = document.querySelector('body');

function getSerie(){
  var serie = inputSerie.value;
  var tileSerie;
  var tagTitleSerie;
  var newContentSerieTitle;
  var tagImageSerie;
  var imageNoExist;
  //var fillImage;
  var imageSerie;
  //console.log(inputSerie);
  //console.log('valor de input serie:', serie);
  //console.log('http://api.tvmaze.com/search/shows?q=' + serie);
  fetch('http://api.tvmaze.com/search/shows?q=' + serie)
    .then(function(buscardorSeries){
      return buscardorSeries.json();
    })
    .then(function(buscardorSeriesJSON){
      //console.log('json api series:',buscardorSeriesJSON);
      console.log('tamaño json api series:',buscardorSeriesJSON.length);
      //console.log('series de json api series:',buscardorSeriesJSON[0].show);
      //console.log('series de json api series:',buscardorSeriesJSON[0].show.name);
      //console.log('series de json api series:',buscardorSeriesJSON[0].show.image);
      //console.log('series de json api series:',buscardorSeriesJSON[0].show.image.original);
      for(var i = 0; i < buscardorSeriesJSON.length; i++){
        //pasamos el bucle for por cada elemento del Json y recogemos el titulo
        tileSerie = buscardorSeriesJSON[i].show.name;
        //Cremaos nuestra etiqueta parrafo
        tagTitleSerie = document.createElement('p');
        //Creamos el contenido del titulo de la serie
        newContentSerieTitle = document.createTextNode(tileSerie);
        //Insertamos el parrafo en el body
        body.appendChild(tagTitleSerie);
        //insertamos el titulo en el parrafo
        tagTitleSerie.appendChild(newContentSerieTitle);
        tagImageSerie = document.createElement('img');
        console.log('muestrame todas las url de las imagenes:',buscardorSeriesJSON[i].show.image);
        imageNoExist = buscardorSeriesJSON[i].show.image;
        if (imageNoExist === null ){
          console.log('entro aqui en algun momento?');
          tagImageSerie.src = 'https://via.placeholder.com/210x295/cccccc/666666/?text=TV';
        } else {
          //console.log('me vuelvo loca:', buscardorSeriesJSON[i].show.image);
          imageSerie = buscardorSeriesJSON[i].show.image.medium;
          //console.log('tienes url de imagen?',imageSerie);
          //Cremaos nuestra etiqueta imagen
          //insertamos imagen en body
          body.appendChild(tagImageSerie);
          tagImageSerie.src = imageSerie;
        }
      }
    });
}



searchSerie.addEventListener('click',getSerie);
