const { sumRequestHandler } = require('./sum');

const requestHandler = (req, res) => {
  console.log(req.url, req.method);
  if(req.url == '/'){
    res.setHeader('Content-Type', 'text/html');
    res.write(`        
        <html>
            <head>
                <title>Practice Set</title>
            </head>
            <body>
                <h1>Welcome to Calculator</h1>
                <a href="/calculator">Go to Calculator</a>
            </body>
        </html>`);
    return res.end();
  }else if(req.url.toLowerCase() === '/calculator'){
    res.setHeader('Content-Type', 'text/html');
    res.write(`        
        <html>
            <head>
                <title>Practice Set</title>
            </head>
            <body>
                <h1>Calculator</h1>
                <form action="/calculator-result" method="POST">
                    <input type="number" name="num1" placeholder="Enter First Number" required>
                    <input type="number" name="num2" placeholder="Enter Second Number" required>
                    <button type="submit" value="Sum">Calculate Sum</button>
                </form>
            </body>
        </html>`);
    return res.end();
  }else if(req.url.toLowerCase() === '/calculator-result' && req.method === 'POST'){
    return sumRequestHandler(req, res);
  }

  res.setHeader('Content-Type', 'text/html');
    res.write(`        
        <html>
            <head>
                <title>Practice Set</title>
            </head>
            <body>
                <h1>404 Page Does not Exist</h1>
                <a href="/">Go to Home</a>
            </body>
        </html>`);
    return res.end();
};

module.exports = requestHandler;