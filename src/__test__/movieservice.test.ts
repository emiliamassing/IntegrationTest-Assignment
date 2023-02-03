import { getData } from "../ts/services/movieService";
import { testData } from "../ts/services/__mocks__/movieService";

jest.mock('axios', () =>({
    get: async (url: string) => {
        return new Promise((resolve, reject) => {
            if(url.endsWith('error')) {
                reject([]);
            } else {
                resolve({data: {Search: testData}});
            }
        });
    }
}));

describe('Tests for getData', () => {
    test('Should get data correctly', async () => {
        let dataResponse = await getData('test');

        expect(dataResponse.length).toBe(3);
    });
});
