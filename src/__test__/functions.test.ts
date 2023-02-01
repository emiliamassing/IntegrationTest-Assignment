/*** 
* @jest-environment jsdom
*/
import { IMovie } from "../ts/models/Movie";
import * as functions from "../ts/functions";

describe('Tests for movieSort', () => {

    test('Should sort movies when desc is true, accending', () => {
        document.body.innerHTML= `
            <div id="movie-container"></div>
        `;

        let movieList: IMovie[] = [
            {
                Title: 'The Phantom Menace',
                imdbID: 'tt0120915',
                Type: 'movie', 
                Poster: 'picture', 
                Year: '1999' 
            },
            {   Title: 'Attack Of The Clones',
                imdbID: 'tt0121765', 
                Type: 'movie',
                Poster: 'picture', 
                Year: '2003'
            },
            {   Title: 'Revenge Of The Sith',
                imdbID: 'tt0121766', 
                Type: 'movie',
                Poster: 'picture',
                Year: '2005' 
            },
            {   Title: 'Revenge Of The Sith',
                imdbID: 'tt0121766', 
                Type: 'movie',
                Poster: 'picture',
                Year: '2005' 
            },
        ];

        functions.movieSort(movieList, true);

        expect(movieList[0].Title).toEqual('Attack Of The Clones');
        expect(movieList[1].Title).toEqual('Revenge Of The Sith');
        expect(movieList[2].Title).toEqual('Revenge Of The Sith');
        expect(movieList[3].Title).toEqual('The Phantom Menace');
    });

    test('Should sort movies when desc is false, deccending', () => {
        document.body.innerHTML= `
            <div id="movie-container"></div>
        `;

        let movieList: IMovie[] = [
            {
                Title: 'The Phantom Menace',
                imdbID: 'tt0120915',
                Type: 'movie', 
                Poster: 'picture', 
                Year: '1999' 
            },
            {   Title: 'Attack Of The Clones',
                imdbID: 'tt0121765', 
                Type: 'movie',
                Poster: 'picture', 
                Year: '2003'
            },
            {   Title: 'Revenge Of The Sith',
                imdbID: 'tt0121766', 
                Type: 'movie',
                Poster: 'picture',
                Year: '2005' 
            },
            {   Title: 'Revenge Of The Sith',
                imdbID: 'tt0121766', 
                Type: 'movie',
                Poster: 'picture',
                Year: '2005' 
            },
        ];

        functions.movieSort(movieList, false);

        expect(movieList[0].Title).toEqual('The Phantom Menace');
        expect(movieList[1].Title).toEqual('Revenge Of The Sith');
        expect(movieList[2].Title).toEqual('Revenge Of The Sith');
        expect(movieList[3].Title).toEqual('Attack Of The Clones');
    });
});