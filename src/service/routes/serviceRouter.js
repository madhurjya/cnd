import BaseRouter from './baseRouter';
import entityByIdMiddleware from '../middleware/middleware-entityById';
import { authenticated } from '../middleware/middleware-security';

class ServiceRouter extends BaseRouter {
    constructor(
        serviceController
    ) {
        super(serviceController);
        this.Router.use(authenticated());

        this.Router.route('/:serviceDefinitionId')
            .post(async (req, res) => serviceController.createService(req, res));

        this.Router.route('/instance/:id')
            .get(async (req, res) => serviceController.getById(req, res));
        //     .put(async (req, res) => serviceDefinitionController.put(req, res))
        //     .patch(async (req, res) => serviceDefinitionController.patch(req, res))
        //     .delete(async (req, res) => serviceDefinitionController.remove(req, res));
    }
}

export default ServiceRouter;