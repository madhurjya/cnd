import ApiController from "./apiController";
import * as HttpStatus from '../../common/constants/httpStatus';

class ServiceController extends ApiController {
    constructor(serviceManager) {
        super();
        this._serviceManager = serviceManager;
    }

    get ServiceManager() {
        return this._serviceManager;
    }

    async createService(req, res) {
        try {
            const serviceInstance = await this.ServiceManager.createService(
                req.params.serviceDefinitionId,
                req.user
            );
            res.status(HttpStatus.Created).json(serviceInstance);
        } catch (error) {
            res.status(HttpStatus.InternalServerError).send(error.message);
        }
    }

    async getById(req, res) {
        try {
            const serviceInstance = await this.ServiceManager.getServiceById(
                req.params.id,
                req.user
            );
            if (serviceInstance) {
                res.status(HttpStatus.OK).json(serviceInstance);
            } else {
                res.status(HttpStatus.NotFound).send('Service Instance was not found');
            }
        } catch (error) {
            res.status(HttpStatus.InternalServerError).send(error.message);
        }
    }
}

export default ServiceController;