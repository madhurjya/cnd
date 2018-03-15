import BaseRouter from './baseRouter';
import entityByIdMiddleware from '../middleware/middleware-entityById';
import { authenticated } from '../middleware/middleware-security';

class ServiceDescriptionRouter extends BaseRouter {
    constructor(
        serviceDescriptionRepository,
        serviceDescriptionController
    ) {
        super(serviceDescriptionController);
        this.Router.use(authenticated());

        this.Router.route('/search')
            .post(async (req, res) => serviceDescriptionController.search(req, res));

        this.Router.use('/:id', entityByIdMiddleware(serviceDescriptionRepository));

        this.Router.route('/')
            .get(async (req, res) => serviceDescriptionController.get(req, res))
            .post(async (req, res) => serviceDescriptionController.post(req, res));

        this.Router.route('/:id')
            .get(async (req, res) => serviceDescriptionController.getById(req, res))
            .put(async (req, res) => serviceDescriptionController.put(req, res))
            .patch(async (req, res) => serviceDescriptionController.patch(req, res))
            .delete(async (req, res) => serviceDescriptionController.remove(req, res));
    }
}

export default ServiceDescriptionRouter;