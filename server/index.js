const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const cookeiparser = require('cookie-parser');
const pool = require('./src/db');

const user = require('./src/routes/userRoute');
const bazar = require('./src/routes/bazarRoute');
const meal = require('./src/routes/mealRoute');
const preference = require('./src/routes/preferenceRoute');
const transaction = require('./src/routes/transactionRoute');
const mess = require('./src/routes/messRoute');
const currentlyLoggedIn = require('./src/routes/currentlyLoggedIn');
const userDataRoute = require('./src/routes/userDataRoute');
const dashRouter = require('./src/routes/dashboard');
const Logout = require('./src/routes/logout');
const MonthlyBill = require('./src/routes/bill');

// cron jobs
const { registerCronJobs } = require('./src/cron');

const port = 5000;

app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookeiparser('megamind'));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    store: new pgSession({
      pool: pool,
    }),
    key: '__uid__',
    secret: 'megamind',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 24 * 7 * 1000, //One week
      HttpOnly: true,
      secure: false,
      domain: 'localhost',
      sameSite: 'lax',
    },
  }),
);

//routes

app.use('/auth', require('./src/routes/loginRegister'));
app.use('/api/logout', Logout);

app.use(function (req, res, next) {
  // console.log('cookies = ', req.cookies);
  // console.log('signed cookies = ', req.signedCookies)
  if (!req.session.user) {
    return res.status(403).json({
      message: 'Forbidden',
    });
  }

  next();
});

app.use('/api/user', user);
app.use('/api/bazar', bazar);
app.use('/api/meal', meal);
app.use('/api/preference', preference);
app.use('/api/transaction', transaction);
app.use('/api/mess', mess);
app.use('/api/isloggedin', currentlyLoggedIn);
app.use('/api/userdata', userDataRoute);
app.use('/api/dash', dashRouter);
app.use('/api/bill', MonthlyBill);

app.listen(port, () => {
  console.log(`server has started at port ${port}`);
});

console.log('registering cron jobs...');
registerCronJobs();
console.log('cron jobs started');
