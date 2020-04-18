module.exports = {
  devServer: {
    proxy: {
      '/admin/v1': {
        target: 'http://127.0.0.1:7001',
        ws: true,
        changeOrigin: true,
      },
    },
  },
}
