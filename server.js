const http = require('http');
const fs  = require('fs');
const url = require('url');

function PalindromeChecker(str){
   let strLower = str.toLowerCase()
    return strLower === strLower.split("").reverse().join("")
  }




  const server = http.createServer((req, res) => {
    if (req.method === 'GET') {

      fs.readFile('index.html', (err, data) => {
        if(err){
          res.writeHead(500, { 'Content-Type': 'text/plain' });
                return res.end('Error loading index.html');
        }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    })
    }  else if (req.method === 'POST'){
      let possiblePalindrome = ''
      req.on('data', chunk => {
        possiblePalindrome += chunk.toString()
      })
      req.on('end', () => {
        const parameters = new URLSearchParams(possiblePalindrome)
        const text = parameters.get('text');

        const result = PalindromeChecker(text);

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
          <h1>Palindrome Checker</h1>
          <p>${text} is ${result ? '' : 'not '}a palindrome.</p>
      `);
      })
    }
  })

  server.listen(4200, () => {
    console.log('Server is running 4200');
});








// const server = http.createServer(function(req, res) {
//   const page = url.parse(req.url).pathname;
//   const params = querystring.parse(url.parse(req.url).query);
//   console.log(page);
//   if (page == '/') {
//     fs.readFile('index.html', function(err, data) {
//       res.writeHead(200, {'Content-Type': 'text/html'});
//       res.write(data);
//       res.end();
//     });
//   }
//   else if (page == '/otherpage') {
//     fs.readFile('otherpage.html', function(err, data) {
//       res.writeHead(200, {'Content-Type': 'text/html'});
//       res.write(data);
//       res.end();
//     });
//   }
//   else if (page == '/otherotherpage') {
//     fs.readFile('otherotherpage.html', function(err, data) {
//       res.writeHead(200, {'Content-Type': 'text/html'});
//       res.write(data);
//       res.end();
//     });
//   }
//   else if (page == '/api') {
//     if('student' in params){
//       if(params['student']== 'leon'){
//         res.writeHead(200, {'Content-Type': 'application/json'});
//         const objToJson = {
//           name: "leon",
//           status: "Boss Man",
//           currentOccupation: "Baller"
//         }
//         res.end(JSON.stringify(objToJson));
//       }//student = leon
//       else if(params['student'] != 'leon'){
//         res.writeHead(200, {'Content-Type': 'application/json'});
//         const objToJson = {
//           name: "unknown",
//           status: "unknown",
//           currentOccupation: "unknown"
//         }
//         res.end(JSON.stringify(objToJson));
//       }//student != leon
//     }//student if
//   }//else if
//   else if (page == '/css/style.css'){
//     fs.readFile('css/style.css', function(err, data) {
//       res.write(data);
//       res.end();
//     });
//   }else if (page == '/js/main.js'){
//     fs.readFile('js/main.js', function(err, data) {
//       res.writeHead(200, {'Content-Type': 'text/javascript'});
//       res.write(data);
//       res.end();
//     });
//   }else{
//     figlet('404!!', function(err, data) {
//       if (err) {
//           console.log('Something went wrong...');
//           console.dir(err);
//           return;
//       }
//       res.write(data);
//       res.end();
//     });
//   }
// });

// server.listen(8000);