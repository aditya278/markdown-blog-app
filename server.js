const express = require('express');
const mongoose = require('mongoose');
const articleRouter = require('./routes/articles');
const Article = require('./models/article');
const methodOverride = require('method-override');
const app = express();

const PORT = process.env.PORT || 5000;

//Connect to the DB
mongoose.connect('mongodb://localhost/blog',{
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true
});

//We'll write all views in ejs
//then view engine will convert that ejs code to html
app.set('view engine', 'ejs');

//This will allow express to access all the data being sent from the form in the body
app.use(express.urlencoded({ extended : false }));

//If we provide any method as _method in any form situation, this will allow us to override that method
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({
        createdAt : 'desc'
    });
    res.render('articles/index', { articles : articles });
})

//Tell our app to use the Article Router when the route is /articles
app.use('/articles', articleRouter);

app.listen(PORT, () => {
    console.log('Server Started at Port: ',PORT);
});