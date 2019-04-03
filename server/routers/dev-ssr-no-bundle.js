const Router = require('koa-router')
const axios = require('axios')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')
const MemoryFS = require('memory-fs')
const path = require('path')
const fs = require('fs')

const serverConfig = require('../../build/webpack.config.server')
const serverRender = require('./server-render-no-bundle')

const NativeModule = require('module')
const vm = require('vm')

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
    'server-entry.js'
  )

  try {
    const m = { exports: {} }
    const bundleStr = mfs.readFileSync(bundlePath, 'utf-8')
    const wrapper = NativeModule.wrap(bundleStr)
    const script = new vm.Script(wrapper, {
      filename: 'server-entry.js',
      displayErrors: true
    })
    const result = script.runInThisContext()
    result.call(m.exports, m.exports, require, m)
    bundle = m.exports.default
  } catch (error) {
    console.log('compile error: ' + error)
  }
  console.log(`new bundle is generated`)
})


const handleSSR = async (ctx) => {
  if (!bundle) {
    ctx.body = 'waiting for bundle ok...'
  }

  const clientManifestResp = await axios.get(
    'http://127.0.0.1:8989/public/vue-ssr-client-manifest.json'
  )

  const clientManifest = clientManifestResp.data

  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs'),
    'utf-8'
  )

  const renderer = VueServerRenderer
    .createRenderer({
      inject: false,
      clientManifest
    })

  await serverRender(ctx, renderer, template, bundle)
}

const router = new Router()
router.get('*', handleSSR)

module.exports = router
