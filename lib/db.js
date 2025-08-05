const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || 'mydb.123456789012.us-east-1.rds.amazonaws.com',
  user: process.env.MYSQL_USER || 'admin',
  password: process.env.MYSQL_PASSWORD,
  database: 'car_workshop_booking',
});