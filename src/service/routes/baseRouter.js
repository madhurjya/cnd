import express from 'express';

class BaseRouter {
    constructor() {
        this._router = express.Router();
    }

    get Router() {
        return this._router;
    }
}

export default BaseRouter;