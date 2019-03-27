let repo;

if (process.env.NODE_ENV === 'development') {
    repo = require('./enmap-repository');
} else {
    repo = require('./firebase-repository');
}

export default repo.default;
