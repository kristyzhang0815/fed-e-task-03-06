module.exports = {
  devServer: {
    proxy: {
      '/front': {
        target: 'http://eduboss.lagou.com',
        changeOrigin: true
      },
      '/boss': {
        target: 'http://eduboss.lagou.com',
        changeOrigin: true
      }
    }
  }
}
