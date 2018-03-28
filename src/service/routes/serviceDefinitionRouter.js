import BaseRouter from './baseRouter';
import entityByIdMiddleware from '../middleware/middleware-entityById';
import { authenticated } from '../middleware/middleware-security';

class ServiceDefinitionRouter extends BaseRouter {
    constructor(
        serviceDefinitionRepository,
        serviceDefinitionController
    ) {
        super(serviceDefinitionController);
        this.Router.use(authenticated());

        this.Router.route('/search')
            .post(async (req, res) => serviceDefinitionController.search(req, res));

        this.Router.use('/:id', entityByIdMiddleware(serviceDefinitionRepository));

        this.Router.route('/')
            .get(async (req, res) => serviceDefinitionController.get(req, res))
            .post(async (req, res) => serviceDefinitionController.post(req, res));

        this.Router.route('/:id')
            .get(async (req, res) => serviceDefinitionController.getById(req, res))
            .put(async (req, res) => serviceDefinitionController.put(req, res))
            .patch(async (req, res) => serviceDefinitionController.patch(req, res))
            .delete(async (req, res) => serviceDefinitionController.remove(req, res));
    }
}

export default ServiceDefinitionRouter;