module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    ADMIN_SERVER: '"/api"',
   });
//    const adminServer = axios.create({
//     baseURL: process.env.ADMIN_SERVER,
//    });