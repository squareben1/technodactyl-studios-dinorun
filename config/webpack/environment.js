const { environment } = require('@rails/webpacker')

var webpack = require('webpack');
environment.plugins.append(
  'Provide',
  new webpack.ProvidePlugin({
    $: 'jquery',
  })
)

environment.plugins.prepend('Provide', new webpack.ProvidePlugin({
   jasmineRequire: 'jasmine-core/lib/jasmine-core/jasmine.js',
}))

module.exports = environment