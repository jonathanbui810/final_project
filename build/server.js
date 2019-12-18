const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/*
 * The 'express.static' middleware provides some services Express can use to
 * serve files from a directory - in this case, the 'public' subdirectory of
 * this project.
 *
 * The 'app.use' function attaches middleware to our Express application, so
 * that when the application is running, it can serve static files. In this
 * case, we mount it over the entire app: any web request that GETs a path that
 * exists in the 'public' directory will be handled by the middleware. The
 * middleware also serves the 'index.html' file in a directory (if it exists)
 * whenever a client requests the directory itself.
 *
 * The 'public' directory for this project, in turn, contains all the HTML,
 * Javascript, and CSS files needed to run a simple chat client connected to
 * this server. Accessing this server's root URL will serve 'public/index.html',
 * which contains our chat client. This gives users an easy way to connect to
 * the server and interact with other users.
 *
 * See also:
 *  - Express: Serving static files in Express
 *    https://expressjs.com/en/starter/static-files.html
 *  - Express: express.static()
 *    https://expressjs.com/en/4x/api.html#express.static
 *  - Express: Using middleware
 *    https://expressjs.com/en/guide/using-middleware.html
 *  - Express: app.use()
 *    https://expressjs.com/en/4x/api.html#app.use
 */
app.use(express.static('public'));


/**Pass data from FY 18 */
app.get('/api', (req, res) => {
  const baseURL = 'https://data.princegeorgescountymd.gov/resource/2qma-7ez9.json';
  await fetch(baseURL, {
    method: 'GET'
  })
    .then((r) => r.json())
    .then((data) => {
      let payeename = data.map(c =c.payee_name);
      let agency = data.map(c = c.agency);
      let zip = data.map(c = c.zip_code);
      let amount = data.map(c = c.amount);
      let describe = data.map(c = c.payment_description);
      let arr = [];
      let arr2 = [];
      for(let i = 0; i<1000; i++) {
        arr2 = [payeename[i], agency[i], zip[i], amount[i], describe[i]]
        arr.push(arr2)
      }
      res.json(arr);
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/error');
    });
})

/**Pass Data from FY17 */
app.get('/api', (req, res) => {
  const baseURL = 'https://data.princegeorgescountymd.gov/resource/364y-gm2b.json';
  await fetch(baseURL, {
    method: 'GET'
  })
    .then((r) => r.json())
    .then((data) => {
      let payeename = data.map(c =c.payee_name);
      let agency = data.map(c = c.agency);
      let zip = data.map(c = c.zip_code);
      let amount = data.map(c = c.amount);
      let describe = data.map(c = c.payment_description);
      let arr = [];
      let arr2 = [];
      let i = 0;
      for(i = 0; i<1000; i++) {
        arr2 = [payeename[i], agency[i], zip[i], amount[i], describe[i]]
        arr.push(arr2)
      }
      res.json(arr);
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/error');
    });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
