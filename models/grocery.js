const db = require('../util/database');

module.exports = class Grocery {
    constructor(id, item) {
        this.id = id;
        this.item = item;
    };

    static fetchAll() {
        return db.execute('SELECT * FROM groceries');
        // return [{
        //         id: 1,
        //         item: 'milk',
        //     },
        //     {
        //         id: 2,
        //         item: 'bread',
        //     },
        // ];

    };

};