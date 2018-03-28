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

    async inspectService(id) {
        const { data } = await this.Client.get(`/services/${id}`);
        return data;
    }

    async createService(name, serviceDefinition) {
        try {
            const { data } = await this.Client.post(
                '/services/create',
                Object.assign({}, serviceDefinition, { name })
            );
            return await this.inspectService(data.ID);
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.message);
            } else if (error.request) {
                throw error;
            } else {
                throw error;
            }
        }
    }
}

export default DockerManager;