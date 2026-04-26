module.exports = ({ env }) => ({
  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '7d',
      },
    },
  },
  upload: {
    config: {
      sizeLimit: 10 * 1024 * 1024, // 10mb
    },
  },
});
