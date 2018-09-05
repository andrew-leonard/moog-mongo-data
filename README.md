# moog-mongo data
Module to allow users to populate a mongo db with Moogsoft Observe specific information. Should only be used for test purposes.

---
## Getting Started
These instructions will get you a copy of the module up and runnning and provide examples for how you would populate your test environment.

### Installing
Simple as running
```
npm install
```
---
## Examples
Detailed below are some examples for you

### populating rollup_indexes
The following command will add in 10 rollup indexes to the collection in mongo. The number that can be added ranges from 1 to 10000.

```
node main.js --rollup_indexes=10
```

### populating heat index
The following command will add in heat indexes for 10 different sources. The number that can be added ranges from 1 to 10000.

```
node main.js --heat_indexes=10
```

### populating event and surrounding data
The following command will add in an event to the system to simulate an anomaly. Supporting datums will also be added

```
node main.js --add_event
```

---
## Contributing
For any contributions, please submit pull requests.

## Authors
*Andrew Leonard* - *Moogsoft*
