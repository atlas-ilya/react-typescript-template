const plugins = [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@loadable/babel-plugin',
    [
        'babel-plugin-import',
        {
            libraryName: '@mui/material',
            libraryDirectory: '',
            camel2DashComponentName: false,
        },
        'core',
    ],
    [
        'babel-plugin-import',
        {
            libraryName: '@mui/icons-material',
            libraryDirectory: '',
            camel2DashComponentName: false,
        },
        'icons',
    ],
];

if (process.env.NODE_ENV === 'development') {
    plugins.push('react-refresh/babel');
}




const presets = ['@babel/preset-env', '@babel/preset-react'];

module.exports = {
    presets,
    plugins,
};
