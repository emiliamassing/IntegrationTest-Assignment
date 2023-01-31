/*** 
* @jest-environment jsdom
*/
import { IMovie } from "../ts/models/Movie";
import { movieSort } from "../ts/functions";

describe('Tests for movieSort', () => {

    test('Should sort movies if list isnt empty', () => {
        document.body.innerHTML= `
            <div id="movie-container"></div>
        `;

        let movieList: IMovie[] = [
            {Title: 'Empire Strikes Back', imdbID: 'aaa', Type: 'Movie', Poster: 'picture', Year: '1980' },
            {Title: 'Return Of The Jedi', imdbID: 'bbb', Type: 'Movie', Poster: 'picture', Year: '1983' },
            {Title: 'Mandalorian', imdbID: 'ccc', Type: 'Series', Poster: 'picture', Year: '2019' }
        ];

        movieSort(movieList);

        expect(movieList[0].Title).toEqual('Empire Strikes Back');
        expect(movieList[1].Title).toEqual('Mandalorian');
        expect(movieList[2].Title).toEqual('Return Of The Jedi');
    });
});