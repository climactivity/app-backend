export default () =>{
    console.log(process.env)
    return {
      use_static_assets: process.env.SERVE_STATIC || true,
      db_user: process.env.MONGO_INITDB_ROOT_USERNAME || 'mongouser',

      db_pass:
        process.env.MONGO_INITDB_ROOT_PASSWORD ||
        'Atu46bAj3vD2OnUJiYH3iLD3T9OOlm9e',
      db_uri: process.env.DB_HOST || 'localhost',
      db_port: process.env.DB_PORT || 27017,
      db_name: process.env.DB_NAME || 'nest',
      nk_server_host: process.env.NK_SERVER_HOST || '',
      nk_server_key: process.env.NK_SERVER_KEY || '',
    };
};
