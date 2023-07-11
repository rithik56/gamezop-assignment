/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
};

const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
})

module.exports = withPWA({})
