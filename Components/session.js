const session = require('express-session');
const FileStore = require('session-file-store')(session);

const sessionMiddleware=(session({
    secret: "someSecret",
    saveUninitialized: true,
    resave: false,
    cookie: {
        maxAge: 86400000, // 24 hours in milliseconds
    }
}));

module.exports = sessionMiddleware;
