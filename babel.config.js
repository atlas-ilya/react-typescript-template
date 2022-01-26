const plugins = [];

if (process.env.NODE_ENV === 'development') {
    plugins.push('react-refresh/babel');
}

plugins.push(
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@loadable/babel-plugin'
);


const presets = ['@babel/preset-env', '@babel/preset-react'];

module.exports = {
    presets,
    plugins,
};
