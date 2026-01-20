const sumRequestHandler = (req, res) => {
    console.log('Inside Sum Request Handler');
    const body = [];
    req.on('data', chunk => {
        body.push(chunk);
    });
    req.on('end', () => {
        const parsedBody = Buffer.concat(body).toString();
        const num1 = parseInt(parsedBody.split('&')[0].split('=')[1]);
        const num2 = parseInt(parsedBody.split('&')[1].split('=')[1]);
        const sum = num1 + num2;
        res.setHeader('Content-Type', 'text/html');
        res.write(`        
            <html>
                <head>
                    <title>Practice Set</title>
                </head>
                <body>
                    <h1>Calculator Result</h1>
                    <p>The sum of ${num1} and ${num2} is ${sum}</p>
                    <a href="/calculator">Go Back to Calculator</a>
                </body>
            </html>`);
        return res.end();
    });
}

exports.sumRequestHandler = sumRequestHandler;