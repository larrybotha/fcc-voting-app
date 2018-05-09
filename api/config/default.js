module.exports = {
  host: 'localhost',
  port: 3030,
  public: '../public',

  paginate: {
    default: 10,
    max: 50,
  },

  authentication: {
    secret: 'voting-secret',
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
