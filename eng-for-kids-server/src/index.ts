import express, { request } from 'express'

const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const url = 'mongodb+srv://jeka228:joker123@cluster1.dehqj.mongodb.net/example1?retryWrites=true&w=majority';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
let ObjectID = require('mongodb').ObjectID;
MongoClient.connect(url, (err, client) => {
    if(err) return console.log(err);
    
    app.get('/words', (request, response) => {
        client.db('example1').collection('words').find().toArray((err, item) => {
            if(err) response.send({'error': 'Error Occured'});
            else response.send(item);
        });
    });

    app.get('/categories', (request, response) => {
        client.db('example1').collection('categories').find().toArray((err, item) => {
            if(err) response.send({'error': 'Error Occured'});
            else response.send(item);
        });
    });

    app.put('/words/:word_name', (request, response) => {
        const word_name = request.params.word_name;
        const details = {'word_name': word_name};
        const obj = JSON.parse(request.body.body);
        client.db('example1').collection('words').updateOne(details, {$set: obj}, (err, item) => {
            if(err) response.send({'error': 'Error Occured'});
            else response.send(obj);
        });
    });

    app.put('/categories/:category_name', (request, response) => {
        const category_name = request.params.category_name;
        const detailsForCategory = {'category_name': category_name};
        const detailsForWord = {'word_category': category_name}
        const obj = JSON.parse(request.body.body);
        client.db('example1').collection('categories').updateOne(detailsForCategory,{$set: obj}, (err, item) => {
            if(err) response.send({'error': 'Error Occured'});
            else {
                client.db('example1').collection('words').updateMany(detailsForWord,{$set: {'word_category': obj.category_name}});
                response.send(obj);
            }
        });
    });

    app.delete('/words/:word_name', (request, response) => {
        const word_name = request.params.word_name;
        const details = {'word_name': word_name};
        client.db('example1').collection('words').deleteOne(details, (err, item) => {
            if(err) response.send({'error': 'Error Occured'});
            else response.send('Deleted');
        });
    });

    app.delete('/categories/:category_name', (request, response) => {
        const category_name = request.params.category_name;
        const detailsForCategory = {'category_name': category_name};
        const detailsForWord = {'word_category': category_name};
        client.db('example1').collection('categories').deleteOne(detailsForCategory, (err, item) => {
            if(err) response.send({'error': 'Error Occured'});
            else {
                client.db('example1').collection('words').deleteMany(detailsForWord);
                response.send('Deleted');   
            }
        });
    });
    
    app.post('/words', (request, response) => {
        const obj = JSON.parse(request.body.body);
        client.db('example1').collection('words').insertOne(obj, (err, result) => {
            if(err) response.send({'error': 'Error Occured'});
            else response.send(result.ops[0]);
        });
    });

    app.post('/categories', (request, response) => {
        const obj = JSON.parse(request.body.body);
        client.db('example1').collection('categories').insertOne(obj, (err, result) => {
            if(err) response.send({'error': 'Error Occured'});
            else response.send(result.ops[0]);
        });
    });
    
    app.listen(port, () => console.log(`Running on port ${port}`));
})

//Update word
// var myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

// var urlencoded = new URLSearchParams();
// urlencoded.append("body", JSON.stringify(car));

// var requestOptions = {
//   method: 'PUT',
//   headers: myHeaders,
//   body: urlencoded,
//   redirect: 'follow'
// };

// fetch("http://localhost:5000/words/drop", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));