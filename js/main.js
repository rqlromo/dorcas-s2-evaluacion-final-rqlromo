'use strict';

var inputSerie = document.querySelector('.input-serie');
var searchSerie = document.querySelector('.search-serie');
var body = document.querySelector('body');
var parentBox = document.createElement('div');

function getSerie(){
  var serie = inputSerie.value;
  var tileSerie;
  var tagTitleSerie;
  var newContentSerieTitle;
  var tagImageSerie;
  var imageNoExist;
  var fillImage;
  var imageSerie;
  var tagBoxSeries;
  var listSeries;
  parentBox.innerHTML = ' ';
  //console.log(inputSerie);
  //console.log('valor de input serie:', serie);
  //console.log('http://api.tvmaze.com/search/shows?q=' + serie);
  fetch('http://api.tvmaze.com/search/shows?q=' + serie)
    .then(function(buscardorSeries){
      return buscardorSeries.json();
    })
    .then(function(buscardorSeriesJSON){
      //console.log('json api series:',buscardorSeriesJSON);
      //console.log('tamaño json api series:',buscardorSeriesJSON.length);
      //console.log('series de json api series:',buscardorSeriesJSON[0].show);
      //console.log('series de json api series:',buscardorSeriesJSON[0].show.name);
      //console.log('series de json api series:',buscardorSeriesJSON[0].show.image);
      //console.log('series de json api series:',buscardorSeriesJSON[0].show.image.original);
      for(var i = 0; i < buscardorSeriesJSON.length; i++){
        tagBoxSeries = document.createElement('div');
        tagImageSerie = document.createElement('img');
        //console.log('muestrame todas las url de las imagenes:',buscardorSeriesJSON[i].show.image);
        imageNoExist = buscardorSeriesJSON[i].show.image;
        if (imageNoExist === null ){
          //console.log('entro aqui en algun momento?');
          fillImage = 'https://via.placeholder.com/210x295/d0d0d0/46DAC0/?text=:(';
          tagImageSerie.src = fillImage;
        } else {
          //console.log('me vuelvo loca:', buscardorSeriesJSON[i].show.image);
          imageSerie = buscardorSeriesJSON[i].show.image.medium;
          //console.log('tienes url de imagen?',imageSerie);
          //Cremaos nuestra etiqueta imagen
          //insertamos imagen en body
          tagImageSerie.src = imageSerie;
        }
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
        tagBoxSeries.appendChild(tagTitleSerie);
        tagBoxSeries.appendChild(tagImageSerie);
        parentBox.appendChild(tagBoxSeries);
        body.appendChild(parentBox);
        tagBoxSeries.setAttribute('class', 'box-series');
        listSeries = document.querySelectorAll('.box-series');
        tagBoxSeries.addEventListener('click',favourites);
      }
      console.log('listSeries',listSeries);
    });
}

function favourites(event){
  console.log(event.currentTarget);
  event.currentTarget.classList.add('background');
}

searchSerie.addEventListener('click',getSerie);


