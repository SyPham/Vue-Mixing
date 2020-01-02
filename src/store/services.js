import Axios from 'axios'
import exampleService from '../services/ExampleService'
import studentService from '../services/StudentService'
import accountService from '../services/AccountService'
import machineService from '../services/MachineService'
import linechartService from '../services/LineChartService'
import locationService from '../services/LocationService'
import rawService from '../services/RawService'
let apiUrl = 'http://10.4.4.224:8092/'
// Axios Configuration
Axios.defaults.headers.common.Accept = 'application/json'

export default {
    exampleService: new exampleService(Axios),
    studentService: new studentService(Axios, apiUrl),
    accountService: new accountService(Axios,apiUrl),
    machineService: new machineService(Axios,apiUrl),
    linechartService: new linechartService(Axios,apiUrl),
    locationService: new locationService(Axios,apiUrl),
    rawService: new rawService(Axios,apiUrl)
}