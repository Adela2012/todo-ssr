const Router = require('koa-router')
const axios = require('axios')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')
const MemoryFS = require('memory-fs')
const path = require('path')
const fs = require('fs')

const serverConfig = require('../../build/webpack.config.server')

const serverCompiler = webpack(serverConfig)

const mfs = new MemoryFS()
serverCompiler.outputFileSystem = mfs

let bundle 
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(i => console.log(i))
  stats.warnings.forEach(i => console.warn(i))

  const bundlePath = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json'
  )

  bundle = mfs.readFileSync(mfs.readFileSync(bundlePath, 'utf-8'))

  const handleSSR = async (ctx) => {
    if (bundle) {
      ctx.body = 'waiting for bundle ok...'
    }

    const clientManifestResp = await axios.get('http://127.0.0.1:8989/vue-ssr-client-manifest.json')

    const clientManifest = clientManifestResp.data

    const template = fs.readFileSync(path.join(__dirname, '../server.template.ejs'))

    const renderer = VueServerRenderer.createBundleRenderer(bundle, {
      inject: false,
      clientManifest
    })
  }
})