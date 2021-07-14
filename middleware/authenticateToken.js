const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccount');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

async function decodeIDToken(req, res, next) {
  // const header = req.headers?.authorization;
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {

    const idToken = req.headers.authorization.split('Bearer ')[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req['currentUser'] = decodedToken;
    } catch (err) {
      console.log(err);
    }
  }

  next();
}

module.exports = decodeIDToken;