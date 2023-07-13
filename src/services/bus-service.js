import axios from 'axios';

const BUS_API_BASE_URL = "http://localhost:8080/api/v1/buses";

class BusService {

    createBus(bus) {
        return axios.post(BUS_API_BASE_URL, bus);
    }

    updateEmployee(bus, busId) {
        return axios.put(BUS_API_BASE_URL + '/' + busId, bus);
    }

    deleteEmployee(busId) {
        return axios.delete(BUS_API_BASE_URL + '/' + busId);
    }

    getBuses() {
        return axios.get(BUS_API_BASE_URL);
    }

    getBusById(busId) {
        return axios.get(BUS_API_BASE_URL + '/' + busId);
    }
}

export default new BusService()