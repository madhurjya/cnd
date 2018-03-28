import { getValueByPath } from '../../common/lib/utilities';
import RepositoryOfT from './repositoryOfT';

class ModelOfTRepository extends RepositoryOfT {
    constructor(model, readOnly = []) {
        super(model);
        this._readOnly = [
            '_id',
            '__v',
            'created.by',
            'created.on',
            ...readOnly
        ];
    }

    _get(query) {
        return this.Model.find(query);
    }

    async get(query) {
        return this.Model.find(query);
    }

    async getById(id) {
        return this.Model.findById(id);
    }

    async create(entity) {
        const newEntity = new (this.Model)(entity);
        return newEntity.save();
    }

    async patch(entity, changes) {
        entity.schema.eachPath(path => {
            if (this._readOnly.indexOf(path) > -1) {
                return;
            } else {
                const updatedValue = getValueByPath(changes, path);
                if (updatedValue !== undefined) {
                    entity.set(path, updatedValue);
                }
            }
        });
        return entity.save();
    }

    async remove(entity) {
        if (!(entity instanceof this.Model)) {
            throw new TypeError('Invalid entity');
        }
        return entity.remove();
    }

    async update(entity, updatedEntity) {
        entity.schema.eachPath(path => {
            if (this._readOnly.indexOf(path) > -1) {
                return;
            } else {
                const updatedValue = getValueByPath(updatedEntity, path);
                entity.set(path, updatedValue);
            }
        });
        return entity.save();
    }
}

export default ModelOfTRepository;