export default ({ env }) => ({
  upload: {
    config: {
      provider: "local",
      providerOptions: {
        sizeLimit: 10000000, // 10MB مثلا
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
});
