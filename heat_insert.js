const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const url = 'mongodb://localhost:27017/';

var dbObj;
var dbClient;
const collection = 'events.heats';

var connect = function() {
    return new Promise((res, rej) => {
        if (dbObj) {
            res();
        }
        MongoClient.connect(url, function(err, client) {
            if (err) {
                throw err;
                rej();
            }
            dbClient = client;
            dbObj = dbClient.db('moog');
            console.log('connected to mongodb');
            res();
        });
    });
};

module.exports = {
    /**
     * Insert a single document to mongo rollup_indexes collection;
     */
    addDocument: function() {
        connect().then(() => {
            dbObj.collection(collection).remove({}).then(() => {
                fs.readFile('./google-10000-english.txt', 'utf-8', (err, data) => {
                    if (err) throw err;
                    const words = data.split('\n');
                    const newObj = {
                        metric: 'cpu',
                        counts: 2,
                        confidence: 0,
                        source: words[0],
                        timed_at_ms: new Date().getTime()
                    }

                    dbObj.collection(collection).insertOne(newObj, function(err, res) {
                        if (err) throw err;
                        console.log("1 document inserted");
                        dbClient.close();
                    });
                });
            });
        });
    },
    /**
     * Insert a number of documents to mongo rollup_indexes collection
     * @param {Integer} numberOfDocs - number of documents to insert
     */
    addMultipleDocuments: function(numberOfDocs) {
        // Do a multiple insert
        connect().then(() => {
            dbObj.collection(collection).remove({}).then(() => {
                fs.readFile('./google-10000-english.txt', 'utf-8', (err, data) => {
                    if (err) throw err;
                    const words = data.split('\n');
                    const docs = [];
                    for(let i = 0; i < numberOfDocs; i += 1) {
                        docs.push({
                            metric: 'cpu',
                            counts: 2,
                            confidence: 0,
                            source: words[i],
                            timed_at_ms: new Date().getTime()
                        });
                    }

                    dbObj.collection(collection).insertMany(docs, (err, res) => {
                        if (err) throw err;
                        console.log(`${docs.length} documents inserted`);
                        dbClient.close();
                    });
                });
            });
        })
    }
}
