const { createVuePlugin } = require('vite-plugin-vue2');
import { viteSingleFile } from "vite-plugin-singlefile"

module.exports = {
  plugins: [
    createVuePlugin(),
    viteSingleFile(),
  ],
  base: './',
  server: {
    proxy: {
      '/uploads/': {
        target: `http://127.0.0.1:4742/`,
        rewrite: (path) => path.replace(/^\/uploads\//, '/uploads/'),
      },
      '/api/': {
        target: `http://127.0.0.1:4742/`,
        rewrite: (path) => path.replace(/^\/api\//, '/api/'),
      },
    },
  },
};
