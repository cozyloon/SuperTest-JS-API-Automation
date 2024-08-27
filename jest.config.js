module.exports = {
    testMatch: ['**/tests/*.js'],
    reporters: [
        'default',
        [
            'jest-html-reporters',
            {
                publicPath: './Report',
                filename: 'report.html',
                pageTitle: 'SuperTest and Jest API Test Report',
                overwrite: true,
                expand: true,
            },
        ],
    ],
    globalSetup: './globalSetup.js',
};
