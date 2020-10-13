const express = require('express');
const articleRouter = require('./routes/articles');
const app = express();

const PORT = process.env.PORT || 5000;

//We'll write all views in ejs
//then view engine will convert that ejs code to html
app.set('view engine', 'ejs');


//Tell our app to use the Article Router when the route is /articles
app.use('/articles', articleRouter);

app.get('/', (req, res) => {
    const artiles = [{
        title : 'Test Articles',
        createdAt : new Date(),
        description : 'Test Description'
    },
    {
        title : 'Test Articles 2',
        createdAt : new Date(),
        description : 'Test Description 2' 
    }]
    res.render('articles/index', { articles : artiles });
})

app.listen(PORT, () => {
    console.log('Server Started at Port: ',PORT);
});