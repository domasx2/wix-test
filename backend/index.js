import express from 'express';

const ENV = process.NODE_ENV || 'development';
const app = express();

app.set('views', './backend/views');
app.set('view engine', 'pug');

app.get('*',  function (req, res) {
    res.render('index', {ENV});
});

app.listen(3000, () => console.log('app listening on 3000'));

