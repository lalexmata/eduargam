export const enviroments = {
  database: {
    driver: 'mysql',
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT || 3306,
    username: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || 'root',
    name: process.env.DATABASE_NAME || 'eduargam',
  }
  /*database: {
    driver: 'mysql' || 'mysql',
    host: process.env.DATABASE_HOST || 'eduargam-des.c11fqquocnvk.us-east-1.rds.amazonaws.com',
    port: process.env.DATABASE_PORT || 3306,
    username: process.env.DATABASE_USER || 'admin',
    password: process.env.DATABASE_PASSWORD || 'TNHheEcDw0QvMqKnF3qx',
    name: process.env.DATABASE_NAME || 'eduargam-des',
  }*/
}
