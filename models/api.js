const db = require('../util/database');

module.exports = class Parts {
    constructor(id, item) {
        this.id = id;
        this.item = item;
    };

    static fetchAll() {
        return db.execute('SELECT * FROM parts');
    };

};