export default () => ({
    db_user: process.env.MONGO_INITDB_ROOT_USERNAME,
    db_pass:process.env.MONGO_INITDB_ROOT_PASSWORD,
    db_uri: process.env.DB_HOST || "localhost",    
    db_port: process.env.DB_PORT || 27017,
    db_name: process.env.DB_NAME || "nest"
}); 