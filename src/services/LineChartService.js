class LineChartService {
    axios
    baseUrl

    constructor(axios, apiUrl) {
        this.axios = axios
        this.baseUrl = `${apiUrl}raw`
    }
   
    getchart(id) {
        let self = this;
        return self.axios.get(`${self.baseUrl}/getchart/${id}`);
    }

}

export default LineChartService