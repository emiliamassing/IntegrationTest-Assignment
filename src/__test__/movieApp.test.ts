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
    /*test('Should display error text', () => {
        document.body.innerHTML = `
            <div id="movie-container">
                <p></p>
            </div>
        `;

        const errorMessage: HTMLParagraphElement = document.querySelector('p') as HTMLParagraphElement;
        errorMessage?.innerHTML('Display error');
    });*/
});