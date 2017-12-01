import mongoose from 'mongoose';

export default function (dbConfig) {
    mongoose.Promise = global.Promise;
    mongoose.set('debug', true);
    return new Promise((resolve, reject) => {
        const connection = mongoose.createConnection();
        connection.open(dbConfig.connection,
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(connection);
                }
            });
    });
}