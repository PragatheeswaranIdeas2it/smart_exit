module.exports = {
    // ... other configurations
    resolve: {
        fallback: {
            buffer: require.resolve('buffer/'),
            url: require.resolve('url/'),
            assert: require.resolve('assert/'),
            crypto: require.resolve('crypto-browserify'),
            fs: false, // Consider using a mock for file system operations if needed
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            os: require.resolve('os-browserify/browser'),
            path: require.resolve('path-browserify'),
            process: require.resolve('process/browser'),
            querystring: require.resolve('querystring-es3'),
            stream: require.resolve('stream-browserify'),
            tls: false, // Consider using a mock for TLS if needed
            util: require.resolve('util/'),
            zlib: require.resolve('browserify-zlib'),
        },
    },
}
