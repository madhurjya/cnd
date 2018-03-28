import Axios from "axios";

class DockerManager {
    constructor(url, version) {
        this._client = Axios.create({
            baseURL: url.replace('{version}', version)
        });
    }

    get Client() {
        return this._client;
    }

    async createService(name, serviceDefinition) {
        const { data } = await this.Client.post('/services/create', serviceDefinition);
        return data;
    }
}

export default DockerManager;