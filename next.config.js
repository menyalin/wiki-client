/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const removeImports = require('next-remove-imports')()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
module.exports = (phase)=> {
  return removeImports({
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  compiler: {  
    styledComponents: true,
  },
})
}