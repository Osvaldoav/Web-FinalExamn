import React from 'react';

export default function Item({pelicula}){
 const {film_ID, film_title, year, rating} = pelicula;

  return(
   <div>
     <p>{film_ID}</p>
     <p>{film_title}</p>
     <p>{year}</p>
     <p>{rating}</p>
   </div>
 );
};