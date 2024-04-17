import path from "path";
import dotenv from "dotenv";
import { Pool, PoolConfig } from 'pg';

dotenv.config({path: path.resolve(__dirname, '../../.env')});

// Create PostgreSQL connection pool
// Using a connection pool is generally preferred over a single connection object for several reasons:
// 1. Resource Management: Connection pools manage a pool of connections, allowing multiple clients to use them concurrently.
// This ensures efficient utilization of database resources and prevents resource exhaustion in high-traffic applications.
// 2. Connection Reuse: With a connection pool, connections are reused rather than being created and destroyed for each client request.
//    Reusing connections reduces overhead and improves performance, especially in applications with frequent database interactions.
// 3. Connection Pooling: Connection pools maintain a fixed number of connections that are ready to handle client requests.
//    When a client request arrives, it acquires a connection from the pool and releases it back to the pool after use.
//    This eliminates the overhead of establishing new connections for each request.
// 4. Concurrency Management: Connection pools handle concurrency by ensuring that multiple clients can use connections simultaneously
//    without interfering with each other. This is essential for applications with concurrent access to the database, such as web servers
//    handling multiple requests concurrently.
// 5. Connection Management: Connection pools handle connection establishment, validation, and maintenance automatically.
//    They monitor the health of connections and can automatically close or reestablish connections if necessary, reducing
//    the complexity of connection management in the application code.
// 6. Acquiring Connections: When your application needs to execute a query or perform a database operation, it acquires a connection
//    from the pool using pool.getConnection() or pool.query(). The pool ensures that a connection is available and returns it to your application for use.
// 7. Automatic Reconnection: If a connection is lost or becomes invalid (e.g., due to network issues), the connection pool automatically
//    attempts to reconnect or replace the connection with a new one. You do not need to handle connection errors manually in most cases.
// Define a custom PoolConfig type that extends PoolConfig
interface CustomPoolConfig extends PoolConfig {
  connectionLimit?: number;
}

const pool = new Pool({
  connectionLimit: process.env.POOL_CONNECTION_LIMIT as unknown as number,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
} as CustomPoolConfig);

// Event handler for error event
pool.on('error', (error: Error) => {
  console.error(`PostgreSQL connection pool error: ${error.message}`);
});

export default pool;
