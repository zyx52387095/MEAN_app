const jwt = require('jsonwebtoken');

const tokenSecret= 'comp308-class-a3-11';

function createToken(val){
           // generate a signed son web token with the contents of user object and return it in the response
      return jwt.sign(val, tokenSecret);

}

function verifyToken(token){
    console.log(token);
    return jwt.verify(token,tokenSecret);
}

module.exports={createToken:createToken, verifyToken:verifyToken};