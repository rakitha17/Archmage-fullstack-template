module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 9090),
  app: {
    keys: env.array('APP_KEYS'),
  },
  url: env('STRAPI_URL'),
});
