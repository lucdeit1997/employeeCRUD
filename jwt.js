const jwt = require('jsonwebtoken');
const SECERT_KEY = "asdasd32asndmasd2sa3s4dndjuothgfh";

function signPromise(obj)
{
    return new Promise((resolve, reject)=>{
        jwt.sign(obj, SECERT_KEY, (err, result) =>{
            if(err =>{
                return reject(err);
            })
            resolve(result);
        })
    })
}
function verifyPromise(obj)
{
    return new Promise( (resolve, reject) =>{
        jwt.verify(obj, SECERT_KEY, (err, result) =>{
            if(err) return reject(err);
            resolve(result);
        })
    })
}

// signPromise({name: 'khanhney'})
// .then(result => console.log(result))
// .catch(err => console.log(err.message));

// const verify = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoia2hhbmhuZXkiLCJpYXQiOjE1MDc0NDIzOTV9.rOGqZhFK8Su6zE1it1iYWbP26kmrjYGJNZ8p2P7zBIk';

// verifyPromise(verify)

module.exports = { signPromise, verifyPromise };