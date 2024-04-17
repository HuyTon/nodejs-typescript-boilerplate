import axios from 'axios';
import Helper from '../../src/utils/helper';

describe('Helper fetchData function', ()=> {

    jest.mock('axios');
    
    it('should fetch data successfully', async() => {
        const expectedData = {
            id: 1,
            userId: 1,
            title: "delectus aut autem",
            completed: false
        };
        
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: expectedData });

        const url = "https://jsonplaceholder.typicode.com/todos/1";
        const result = await Helper.fetchData(url);
        
        expect(axios.get).toHaveBeenCalledWith(url);        
        expect(result).toEqual(expectedData);
    });

    it('should throw an error when fetching data fails', async() => {        
        const errorMessage = 'Error fetching data';
        
        (axios.get as jest.Mock).mockRejectedValue(new Error(errorMessage));
        
        const url = "https://jsonplaceholder.typicode.com/todos/1";
        const result = await Helper.fetchData(url);
        
        expect(axios.get).toHaveBeenCalledWith(url);        
        expect(result).toEqual({ error: errorMessage });
    });
});