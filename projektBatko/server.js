var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require('path');
 
 
mongoose.connect('mongodb://sebastian:agh2017projekt@ds151068.mlab.com:51068/restaurant');
 
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json({limit: '5mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());
app.disable('etag');
 
var Schema = mongoose.Schema;

var mealSchema = new Schema({
    name: String,
    price: Number,
    category: String,
    img: String,
    description: String
});
var Meals = mongoose.model('Meals', mealSchema);

var mealCategorySchema = new Schema({
    name: String,
    code: String
});
var MealCategories = mongoose.model('MealCategories', mealCategorySchema);

var mealCommentSchema = new Schema({
    meal_id: String,
    comment: String,
    rating: Number
});
var MealComments = mongoose.model('mealComments', mealCommentSchema);

var mealPhotoSchema = new Schema({
    meal_id: String,
    img: String
});
var MealPhotos = mongoose.model('mealPhotos', mealPhotoSchema);

app.listen(8080);
console.log("App listening on port 8080");
 
app.get('index', function (req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, 'public') });
  });
 
 
app.get('/api/meals', function (req, res) {
    Meals.find(function (err, meals) {
        if (err)
            res.send(err)
        res.json(meals);
    });
});
 
app.post('/api/meals', function (req, res) {
    new Meals(req.body).save(function(err){
        if (err)
            res.send(err);
        console.log('New meal saved');
        res.send();
    });
    console.log(req.body);
    console.log('Post meal');
});
 
app.delete('/api/meals', function(req,res){
    console.log(req.query.id);
        Meals.remove({_id: req.query.id}, function(err){
           if(err){
               res.send(err);
           } else{
                res.send();
           }
        });
});

app.put('/api/meals', function(req,res){
    Meals.findOneAndUpdate({_id: req.body._id},req.body, {upsert:true, new: true, update: true}, function (err, meal) {
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.json(meal);
        }
    })
});


app.get('/api/meal_categories', function (req, res) {
    MealCategories.find(function (err, mealCategories) {
        if (err)
            res.send(err)
        res.json(mealCategories);
    });
});

app.post('/api/meal_categories', function (req, res) {
    new MealCategories(req.body).save(function(err){
        if (err)
            res.send(err);
        console.log('New meal category saved');
        res.send();
    });
    console.log(req.body);
    console.log('Post meal category');
});

app.put('/api/meal_categories', function(req,res){
    MealCategories.findOne({_id: req.body._id}, function(err, mealCategory){
        if(err){
            res.send(err);
        }else{
            console.log(req.body);
            for (var field in Meals.schema.paths) {
                if ((field !== '_id') && (field !== '__v')) {
                    if (req.body[field] !== undefined) {
                        mealCategory[field] = req.body[field];
                    }
                }
            }
            mealCategory.save();
            res.json(mealCategory);
        }
    })
});

app.delete('/api/meal_categories', function(req,res){
    console.log(req.query.id);
    Meals.remove({_id: req.query.id}, function(err){
        if(err){
            res.send(err);
        } else{
            res.send();
        }
    });
});

app.get('/api/meal_comments', function (req, res) {
    if(req.query.meal_id){
        MealComments.find({meal_id : req.query.meal_id}, function(err, mealComments) {
            if (err)
                res.send(err);
            res.json(mealComments);
        })
    }else{
        MealComments.find(function (err, mealComments) {
            if (err)
                res.send(err);
            res.json(mealComments);
        });
    }
});

app.post('/api/meal_comments', function (req, res) {
    new MealComments(req.body).save(function(err){
        if (err)
            res.send(err);
        console.log('New meal comment saved');
        res.send();
    });
    console.log(req.body);
    console.log('Post meal comment');
});

app.delete('/api/meal_comments', function(req,res){
    console.log(req.query.id);
    MealComments.remove({_id: req.query.id}, function(err){
        if(err){
            res.send(err);
        } else{
            res.send();
        }
    });
});

app.put('/api/meal_comments', function(req,res){
    MealComments.findOneAndUpdate({_id: req.body._id},req.body, {upsert:true, new: true, update: true}, function (err, mealComment) {
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.json(mealComment);
        }
    });
});







//------------------------------------------------------------------------------


app.get('/api/meal_photos', function (req, res) {
    if(req.query.meal_id){
        MealPhotos.find({meal_id : req.query.meal_id}, function(err, mealPhotos) {
            if (err)
                res.send(err);
            res.json(mealPhotos);
        })
    }else{
        MealPhotos.find(function (err, mealPhotos) {
            if (err)
                res.send(err);
            res.json(mealPhotos);
        });
    }
});

app.post('/api/meal_photos', function (req, res) {
    new MealPhotos(req.body).save(function(err){
        if (err)
            res.send(err);
        console.log('New meal photo saved');
        res.send();
    });
    console.log(req.body);
    console.log('Post meal photo');
});

app.delete('/api/meal_photos', function(req,res){
    console.log(req.query.id);
    MealPhotos.remove({_id: req.query.id}, function(err){
        if(err){
            res.send(err);
        } else{
            res.send();
        }
    });
});

app.put('/api/meal_photos', function(req,res){
    MealPhotos.findOneAndUpdate({_id: req.body._id},req.body, {upsert:true, new: true, update: true}, function (err, mealPhoto) {
        if(err){
            console.log(err);
            res.send(err);
        }else{
            res.json(mealPhoto);
        }
    });
});



