import axios from "axios";

const Helper = {
    fetchData: async (url: string) => {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch(error) {
            console.log(`Error fetching data from ${url}`);
            return { error: 'Error fetching data' };
        }
    }
}

export default Helper;