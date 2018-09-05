// Module to insert events to mongo and corresponding datums
const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const url = 'mongodb://localhost:32811/';

var dbObj;
var dbClient;
const collection = 'events';

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
    addEvent: function() {
        connect().then(() => {
            const eventDoc = {
                timed_at_ms: 1514836800000,
                severity: 5,
                class: 'moog:test:Test',
                source: 'localhost',
                type: 'abc'
            }
            dbObj.collection('rollup_indexes').insert(docs, (err, res) => {
                if (err) throw err;
                console.log('event document inserted');
                // dbClient.close();
            });

            const datums = [{
                data: { value: 4 },
                written_at_ms: 1514836795000,
                year: 2018,
                moob: 'moog:test:Test',
                timezone: 'UTC',
                fully_qualified_moob: 'moog:test:Test',
                week: 1,
                source: 'localhost',
                minute: 59,
                second: 55,
                additional_data: '',
                hour: 11,
                metric: 'abc',
                engine: {
                    LEARNING: false,
                    WATCH_KEY: 'value',
                    DETECTOR_CLASS: 'CSigmaDetector',
                    kurtosis: null,
                    lowThreshold: 1,
                    highThreshold: 7,
                },
                timed_at_ms: 1514836795000,
                key: '',
                processed: true
            }, {
                data: { value: 10 },
                written_at_ms: 1514836800000,
                year: 2018,
                moob: 'moog:test:Test',
                timezone: 'UTC',
                fully_qualified_moob: 'moog:test:Test',
                week: 1,
                source: 'localhost',
                minute: 0,
                second: 0,
                additional_data: '',
                hour: 12,
                metric: 'abc',
                engine: {
                    LEARNING: false,
                    WATCH_KEY: 'value',
                    DETECTOR_CLASS: 'CSigmaDetector',
                    kurtosis: null,
                    lowThreshold: 1,
                    highThreshold: 7,
                    EVENT_SUMMARY: {
                        severity: 5,
                    },
                    severity: 5,
                },
                timed_at_ms: 1514836800000,
                key: '',
                processed: true
            }, {
                data: { value: 5 },
                written_at_ms: 1514836805000,
                year: 2018,
                moob: 'moog:test:Test',
                timezone: 'UTC',
                fully_qualified_moob: 'moog:test:Test',
                week: 1,
                source: 'localhost',
                minute: 0,
                second: 5,
                additional_data: '',
                hour: 12,
                metric: 'abc',
                engine: {
                    LEARNING: false,
                    WATCH_KEY: 'value',
                    DETECTOR_CLASS: 'CSigmaDetector',
                    kurtosis: null,
                    lowThreshold: 1,
                    highThreshold: 7,
                },
                timed_at_ms: 1514836805000,
                key: '',
                processed: true
            }];
            dbObj.collection('rollups.raw').insertMany(datums, (err, res) => {
                if (err) throw err;
                console.log('datums inserted to mongo');
                dbClient.close();
            });
        });
    }
}
