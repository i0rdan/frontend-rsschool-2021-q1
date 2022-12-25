"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express_1["default"]();
var port = process.env.PORT || 5000;
var url = 'mongodb+srv://jeka228:joker123@cluster1.dehqj.mongodb.net/example1?retryWrites=true&w=majority';
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var ObjectID = require('mongodb').ObjectID;
MongoClient.connect(url, function (err, client) {
    if (err)
        return console.log(err);
    app.get('/words', function (request, response) {
        client.db('example1').collection('words').find().toArray(function (err, item) {
            if (err)
                response.send({ 'error': 'Error Occured' });
            else
                response.send(item);
        });
    });
    app.get('/categories', function (request, response) {
        client.db('example1').collection('categories').find().toArray(function (err, item) {
            if (err)
                response.send({ 'error': 'Error Occured' });
            else
                response.send(item);
        });
    });
    app.put('/words/:word_name', function (request, response) {
        var word_name = request.params.word_name;
        var details = { 'word_name': word_name };
        var obj = JSON.parse(request.body.body);
        client.db('example1').collection('words').updateOne(details, { $set: obj }, function (err, item) {
            if (err)
                response.send({ 'error': 'Error Occured' });
            else
                response.send(obj);
        });
    });
    app.put('/categories/:category_name', function (request, response) {
        var category_name = request.params.category_name;
        var detailsForCategory = { 'category_name': category_name };
        var detailsForWord = { 'word_category': category_name };
        var obj = JSON.parse(request.body.body);
        client.db('example1').collection('categories').updateOne(detailsForCategory, { $set: obj }, function (err, item) {
            if (err)
                response.send({ 'error': 'Error Occured' });
            else {
                client.db('example1').collection('words').updateMany(detailsForWord, { $set: { 'word_category': obj.category_name } });
                response.send(obj);
            }
        });
    });
    app["delete"]('/words/:word_name', function (request, response) {
        var word_name = request.params.word_name;
        var details = { 'word_name': word_name };
        client.db('example1').collection('words').deleteOne(details, function (err, item) {
            if (err)
                response.send({ 'error': 'Error Occured' });
            else
                response.send('Deleted');
        });
    });
    app["delete"]('/categories/:category_name', function (request, response) {
        var category_name = request.params.category_name;
        var detailsForCategory = { 'category_name': category_name };
        var detailsForWord = { 'word_category': category_name };
        client.db('example1').collection('categories').deleteOne(detailsForCategory, function (err, item) {
            if (err)
                response.send({ 'error': 'Error Occured' });
            else {
                client.db('example1').collection('words').deleteMany(detailsForWord);
                response.send('Deleted');
            }
        });
    });
    app.post('/words', function (request, response) {
        var obj = JSON.parse(request.body.body);
        client.db('example1').collection('words').insertOne(obj, function (err, result) {
            if (err)
                response.send({ 'error': 'Error Occured' });
            else
                response.send(result.ops[0]);
        });
    });
    app.post('/categories', function (request, response) {
        var obj = JSON.parse(request.body.body);
        client.db('example1').collection('categories').insertOne(obj, function (err, result) {
            if (err)
                response.send({ 'error': 'Error Occured' });
            else
                response.send(result.ops[0]);
        });
    });
    app.listen(port, function () { return console.log("Running on port " + port); });
});
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
