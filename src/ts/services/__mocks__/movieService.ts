import { IMovie } from "../../models/Movie";

let testData: IMovie[] = [
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

export async function getData(): Promise<IMovie[]> {
    return new Promise((resolve) => {
        resolve(testData);
    });
};