'use strict';

var inputSerie = document.querySelector('.input-serie');
var searchSerie = document.querySelector('.search-serie');
var body = document.querySelector('body');
var parentBox = document.createElement('div');
parentBox.setAttribute('class', 'wrapper');

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
  var tagBoxTitleSerie;
  var tagBoxPosition;
  var tagFavouriteStar;
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
        tagBoxSeries.setAttribute('class', 'box-series');
        tagImageSerie = document.createElement('img');
        tagImageSerie.setAttribute('class', 'image-serie');
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
          //almacenamos la url de la imagen en el atributo src de la etiqueta imagen
          tagImageSerie.src = imageSerie;
        }
        //pasamos el bucle for por cada elemento del Json y recogemos el titulo
        tileSerie = buscardorSeriesJSON[i].show.name;
        //Creamos el contenido del titulo de la serie
        newContentSerieTitle = document.createTextNode(tileSerie);

        // Cremaos nuestras etiquetas
        tagTitleSerie = document.createElement('p');
        tagBoxTitleSerie = document.createElement('div');
        tagBoxPosition = document.createElement('div');
        tagFavouriteStar = document.createElement('div');


        // Le damos clase a nuestras etiquetas
        tagTitleSerie.setAttribute('class', 'title-serie');
        tagBoxTitleSerie.setAttribute('class', 'box-title-serie');
        tagBoxPosition.setAttribute('class', 'box-position');
        tagFavouriteStar.setAttribute('class', 'favourite-star');


        // Creamos la esructura insetarnos unas etiquetas en otras
        tagTitleSerie.appendChild(newContentSerieTitle);
        tagBoxTitleSerie.appendChild(tagTitleSerie);
        tagBoxPosition.appendChild(tagBoxTitleSerie);
        tagBoxPosition.appendChild(tagImageSerie);
        tagBoxSeries.appendChild(tagBoxPosition);
        tagBoxSeries.appendChild(tagFavouriteStar);
        parentBox.appendChild(tagBoxSeries);
        body.appendChild(parentBox);

        //Escuchamos el evento, cuando cliquemos una imagen se selecciona como favorita
        tagBoxSeries.addEventListener('click',favourites);
      }
    });
}

function favourites(event){
  console.log(event.currentTarget);
  event.currentTarget.classList.toggle('background');
}

searchSerie.addEventListener('click',getSerie);


