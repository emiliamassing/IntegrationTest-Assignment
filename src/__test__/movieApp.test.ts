/*** 
* @jest-environment jsdom
*/
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