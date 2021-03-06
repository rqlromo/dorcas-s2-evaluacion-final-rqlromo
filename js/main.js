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
  var tagCountry;
  var contentPerson;
  parentBox.innerHTML = ' ';
  //console.log(inputSerie);
  //console.log('valor de input serie:', serie);
  //console.log('http://api.tvmaze.com/search/shows?q=' + serie);
  fetch('http://api.tvmaze.com/search/people?q=' + serie)
    .then(function(buscardorSeries){
      return buscardorSeries.json();
    })
    .then(function(buscardorSeriesJSON){
      console.log('json api series:',buscardorSeriesJSON);
      //console.log('tamaño json api series:',buscardorSeriesJSON.length);
      console.log('series de json api series:',buscardorSeriesJSON[0].person);
      console.log('series de json api series:',buscardorSeriesJSON[0].person.name);
      console.log('series de json api series:',buscardorSeriesJSON[0].person.image);
      console.log('country:',buscardorSeriesJSON[0].person.country);
      //console.log('series de json api series:',buscardorSeriesJSON[0].person.image.medium);
      for(var i = 0; i < buscardorSeriesJSON.length; i++){
        tagBoxSeries = document.createElement('div');
        tagBoxSeries.setAttribute('class', 'box-series');
        tagImageSerie = document.createElement('img');
        tagImageSerie.setAttribute('class', 'image-serie');
        //console.log('muestrame todas las url de las imagenes:',buscardorSeriesJSON[i].show.image);
        imageNoExist = buscardorSeriesJSON[i].person.image;
        if (imageNoExist === null ){
          //console.log('entro aqui en algun momento?');
          fillImage = 'https://via.placeholder.com/210x295/d0d0d0/46DAC0/?text=:(';
          tagImageSerie.src = fillImage;
        } else {
          //console.log('me vuelvo loca:', buscardorSeriesJSON[i].show.image);
          imageSerie = buscardorSeriesJSON[i].person.image.medium;
          //console.log('tienes url de imagen?',imageSerie);
          //almacenamos la url de la imagen en el atributo src de la etiqueta imagen
          tagImageSerie.src = imageSerie;
        }
        //pasamos el bucle for por cada elemento del Json y recogemos el titulo
        tileSerie = buscardorSeriesJSON[i].person.name;
        //Creamos el contenido del titulo de la serie
        newContentSerieTitle = document.createTextNode(tileSerie);

        // tagCountry = document.createElement('p');
        // console.log('etiqueta pais:',tagCountry);
        // contentPerson = buscardorSeriesJSON[i].person.country;
        // console.log('pais:',contentPerson);
        // tagCountry.appendChild(contentPerson);
        // tagBoxTitleSerie.appendChild(tagCountry);

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

function enter(event) {
  var keyName = event.key;
  if (keyName === 'Enter') {
    getSerie();
  }
  else {
    // alert('Pulsa la tecla Enter para empezar');
  }
}

window.addEventListener('keydown', enter);

searchSerie.addEventListener('click',getSerie);


