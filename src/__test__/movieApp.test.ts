/*** 
* @jest-environment jsdom
*/
import { IMovie } from "../ts/models/Movie";
import * as movieApp from "../ts/movieApp";
import { getData } from "../ts/services/__mocks__/movieService";
import * as movieService from "../ts/services/movieservice";

jest.mock('../ts/services/movieservice.ts');

beforeEach(() => {
    document.body.innerHTML = '';
});

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

describe('Tests for handleSubmit', () => {
    test('Should use getData correctly and create html if movie is found', async () => {
        document.body.innerHTML = `
        <form id="searchForm">
            <input type="text" id="searchText" placeholder="Skriv titel här" />
            <button type="submit" id="search">Sök</button>
        </form>
        <div id="movie-container"></div>
        `;

        let searchText = (document.querySelector('#searchText') as HTMLInputElement);
        searchText.value = 'The Phantom Menace';

        let movies: IMovie [] = await getData('The Phantom Menace');
        let createdContainer = document.getElementsByClassName('movie');

        await movieApp.handleSubmit();

        expect(movies[0].Title).toBe('The Phantom Menace');
        expect(createdContainer).toBeTruthy;
    });

    test('Should spy on createHtml()', async () => {
        document.body.innerHTML = `
        <form id="searchForm">
            <input type="text" id="searchText" placeholder="Skriv titel här" />
            <button type="submit" id="search">Sök</button>
        </form>
        <div id="movie-container"></div>
        `;

        let searchText = (document.querySelector('#searchText') as HTMLInputElement);
        searchText.value = 'The Phantom Menace';

        const createHtmlSpy = jest.spyOn(movieApp, 'createHtml').mockReturnValue();

        await movieApp.handleSubmit();

        expect(createHtmlSpy).toHaveBeenCalled();
        createHtmlSpy.mockRestore();
    });

    test('Should call on displayNoResult if there are no movies', async () => {
        document.body.innerHTML = `
        <form id="searchForm">
            <input type="text" id="searchText" placeholder="Skriv titel här" />
            <button type="submit" id="search">Sök</button>
        </form>
        <div id="movie-container"></div>
        `;

        let searchText = (document.querySelector('#searchText') as HTMLInputElement);
        searchText.value = '';

        const disPlayNoResultSpy = jest.spyOn(movieApp, 'displayNoResult').mockReturnValue();

        await movieApp.handleSubmit();

        expect(disPlayNoResultSpy).toHaveBeenCalled();
        disPlayNoResultSpy.mockRestore();
    });

    test('Should get error and call on displayNoResult', async () =>{
        document.body.innerHTML = `
        <form id="searchForm">
            <input type="text" id="searchText" placeholder="Skriv titel här" />
            <button type="submit" id="search">Sök</button>
        </form>
        <div id="movie-container"></div>
        `;

        const searchText = document.querySelector('#searchText') as HTMLInputElement;
        searchText.value = 'error';

        let disPlayNoResultSpy = jest.spyOn(movieApp, 'displayNoResult').mockReturnValue(); 

        await movieApp.handleSubmit();

        expect(disPlayNoResultSpy).toBeCalled();
        disPlayNoResultSpy.mockRestore();
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
        expect(movieList.length).toBe(3);

        expect(container.innerHTML).toContain('h3');
        expect(container.innerHTML).toContain('img');
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