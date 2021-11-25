
// TODO: replace with your production URLs
const DEPLOY_API = 'https://$DEPLOY_API' // e.g. 'https://nextjs.web-templates.io'
const DEPLOY_CDN = 'https://$DEPLOY_CDN' // e.g. 'https://nextjs-gh.web-templates.io'
const USE_DEV_PROXY = true // Use CORS-free URL: http://localhost:3000/api

const isProd = process.env.NODE_ENV === 'production'
const API_URL = isProd ? DEPLOY_API : (USE_DEV_PROXY ? '/' : 'http://localhost:5000')

module.exports = {
    async rewrites() {
        let rules = [];
        if (!isProd) {
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // when it works https://github.com/vercel/next.js/issues/21537
            rules.push({
                source: '/api/:path*',
                destination: 'http://localhost:5000/api/:path*', 
            });
        }
        return rules;
    },

    env: {
        apiBaseUrl: API_URL
    },

    // Use the CDN in production and localhost for development.
    assetPrefix: isProd ? DEPLOY_CDN : '',
}
