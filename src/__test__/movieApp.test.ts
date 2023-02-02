/*** 
* @jest-environment jsdom
*/
import { IMovie } from "../ts/models/Movie";
import * as movieApp from "../ts/movieApp";

describe('Tests for init', () => {
    test('Should spy on handleSubmit()', () =>{
        document.body.innerHTML = `
        <form id="searchForm">
            <input type="text" id="searchText" placeholder="Skriv titel här" />
            <button type="submit" id="search">Sök</button>
        </form>
        `;

        let spyOnHandleSubmit = jest.spyOn(movieApp, 'handleSubmit').mockReturnValue(new Promise<void>((resolve) => {
            resolve();
        }));

        movieApp.init();

        (document.querySelector('#searchForm') as HTMLFormElement)?.submit();
        expect(spyOnHandleSubmit).toHaveBeenCalledTimes(1);
        spyOnHandleSubmit.mockRestore();
    });
});

describe('Tests for createHtml', () => {
    test('Should create elements and display movies', () => {
        document.body.innerHTML = `
            <div id="movie-container"></div>
        `;

        const container = document.querySelector('#movie-container') as HTMLDivElement;

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
        ];

        movieApp.createHtml(movieList, container);
        
        expect(movieList[0].Title).toEqual('The Phantom Menace');
        expect(movieList[1].Title).toEqual('Attack Of The Clones');
        expect(movieList[2].Title).toEqual('Revenge Of The Sith');
    });
});

describe('Tests for disPlayNoResult', () => {
    test('Should create p element and display text', () => {
        document.body.innerHTML = `
            <div id="movie-container"></div>
        `;

        const container = document.querySelector('#movie-container') as HTMLDivElement;
        const newPElement = `<p>Inga sökresultat att visa</p>`;

        movieApp.displayNoResult(container);

        let htmlResult = document.querySelector('#movie-container')?.innerHTML;
        let htmlClass = document.querySelector('#movie-container')?.firstElementChild;

        expect(htmlResult).toEqual(newPElement);
    });
});