/*** 
* @jest-environment jsdom
*/
import { IMovie } from "../ts/models/Movie";
import { movieSort } from "../ts/functions";

describe('Tests for movieSort', () => {
    document.body.innerHTML= `
        <div id="movie-container"></div>
    `;

    let movieList: IMovie[] = [
        {Title: 'Empire strikes back', imdbID: 'aaa', Type: 'Movie', Poster:'picture', Year:'1980' },
        {Title: 'Return of the jedi', imdbID: 'bbb', Type: 'Movie', Poster:'picture', Year:'1983' },
        {Title: 'Mandalorian', imdbID: 'ccc', Type: 'Series', Poster:'picture', Year:'2019' }
    ];

    movieSort(movieList);

    expect(movieList[0].Title).toEqual('Empire strikes back');
});