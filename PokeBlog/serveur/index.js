let express = require('express'),
    app = express(),
    http = require('http').createServer(app),  // build http server on top of the express one
    io = require('socket.io')(http, {
          cors: {
            origin: "http://localhost:3001",
            methods: ["GET", "POST"]
          }
        }),
    port = process.env.PORT || 3031,
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser');

//add socket to middleware
app.use((req, res, next)=>{
  res.locals.io= io;
  next();
  return;
});

io.on('connection', function (socket) {
  console.log("new user connect")
});


// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(
    'mongodb+srv://kevin94:kevin94@cluster0.jzrm5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

app.use(bodyParser.urlencoded({ limit: '50mb', extended: false, parameterLimit: 50000 }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());

const auth = require('./services/AuthService');
app.use(auth.service);

let auth_routes = require('./api/routes/AuthRoute');
auth_routes(app);

let post_routes = require('./api/routes/PostRoutes'); //importing route
post_routes(app); //register the route

let category_routes = require('./api/routes/CategoryRoutes'); //importing route
category_routes(app); //register the route

http.listen(port);
console.log('API is listening on port: ' + port);



