require('sucrase/register'); // subset of babel
const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const { engine }  = require('express-handlebars');
// dotcom-server-react is a tool that enables us to run both handlebars and react in the same app. You don't need to spend time figuring out how it works.
const { PageKitReactJSX } = require('@financial-times/dotcom-server-react-jsx');
const jsxRenderer = new PageKitReactJSX();

const app = express();
app.engine('.jsx', jsxRenderer.engine);
app.engine('handlebars', engine({layoutsDir: path.join(app.settings.views, 'handlebars', 'layouts')}));
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
    res.render('start')
});

/*
* START HERE FOR JSX TEMPLATING
*/
app.get('/jsx', (req, res) => {
    const templateData = {
      pageTitle: 'Home',
      content: 'Hello World!'
    };

    res.render('jsx/Main.jsx', templateData);
  });
/*
* END JSX TEMPLATING
*/


/*
* START HERE FOR HANDLEBARS TEMPLATING
*/

app.get('/handlebars', async function (req, res) {
    // This object is passed to the Handlebars template.
    const templateData = {
        pageTitle: 'Home',
        content: 'Hello World!'
    };

    // This renders the Handlebars view at `views/home.handlebars`.
    res.render('handlebars/home', templateData);
});
/*
* END HANDLEBARS TEMPLATING
*/

if(process.env.NODE_ENV !== 'test') {
	app.listen(port, () => {console.log(`Running on http://localhost:${port}`)});
}

// Export the app so that we can test it in `test/app.spec.js`
module.exports = app;
