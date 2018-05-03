module.exports = {
  host: 'localhost',
  port: 3030,

  paginate: {
    default: 10,
    max: 50,
  },

  authentication: {
    secret:
      'a283a4502335e5528b1a05f554c4c7488b9fa2088da3d305509aa1b174241074e4fd16dfb150d33248ecf68af585a0a0b7bbd26a9dc4187c3e581cd192d5b3e8d26797252d7cf7516be170c4bafab5d775e96414171a09ef0a911006b9e8be4eb5e7fb9e9426fecade1ccf764cec81d399942033dda45182bc42108d200bf3487cbb3aa7e736e641a692cba50ec5781c01c53ffc2b888f827e0279e10368378346a74e7801ab2ba01b8a549ae46a08c0e2ab1b1fa734a9154ad21eef775bca1a1571677e9d815d4961bb157af583a03862b50e16784175e4f66c0ef258b11e570bd7b1c413e12c136497737e0762ebed3ae199f7e5e42dba6ed25d615236349a',
    strategies: ['jwt', 'local'],
    path: '/authentication',
    service: 'users',
    jwt: {
      header: {
        typ: 'access',
      },
      audience: 'https://yourdomain.com',
      subject: 'anonymous',
      issuer: 'feathers',
      algorithm: 'HS256',
      expiresIn: '1d',
    },
    local: {
      entity: 'user',
      usernameField: 'email',
      passwordField: 'password',
    },
  },

  mongodb: 'mongodb://votingdbnet:27017/votingdb',
};
