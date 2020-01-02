class MachineService {
    axios
    baseUrl

    constructor(axios, apiUrl) {
        this.axios = axios
        this.baseUrl = `${apiUrl}raw`
    }
    get(id) {
        let self = this;
        return self.axios.get(`${self.baseUrl}/detail/${id}`);
    }
    getAll() {
        let self = this;
        return self.axios.get(`${self.baseUrl}`);
    }
    getchart(id) {
        let self = this;
        return self.axios.get(`${self.baseUrl}/getchart/${id}`);
    }

    
    getrpm(id) {
        let self = this;
        return self.axios.get(`${self.baseUrl}/getrpm/${id}`);
    }

    gettime(id,start,end) {
        let self = this;
        return self.axios.get(`${self.baseUrl}/detail/${id}/${start}/${end}`);
    }

    exportexcel(id,start,end) {
        let self = this;
        if(end==NaN && start == NaN)
            return self.axios.get(`${self.baseUrl}/exportexcel/${id}`);
        else if(end==NaN)
            return self.axios.get(`${self.baseUrl}/exportexcel/${id}/${start}`);
        else
        return self.axios.get(`${self.baseUrl}/exportexcel/${id}/${start}/${end}`);
    }
    add(model) {
        let self = this;
        return self.axios.post(`${self.baseUrl}`,model);
    }

    update(model) {
        let self = this;
        return self.axios.put(`${self.baseUrl}`,model);
    }

    remove(id) {
        let self = this;
        return self.axios.delete(`${self.baseUrl}/${id}`);
    }
}

export default MachineService