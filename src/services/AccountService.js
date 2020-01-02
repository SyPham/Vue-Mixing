
class AccountService {
    axios
    baseUrl

    constructor(axios, apiUrl) {
        this.axios = axios
        this.baseUrl = `${apiUrl}account`
    }

    
}

export default AccountService