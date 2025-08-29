export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 8080), // Azure سيضبط PORT تلقائياً
  app: {
    keys: env.array('APP_KEYS', ['defaultKey1', 'defaultKey2']),
  },
});
