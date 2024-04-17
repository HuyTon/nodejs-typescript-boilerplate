import pool from "./db";

const apiKeyData = {
  isValidApiKey: async (apiKey: string) => {
    if (!apiKey) return false;

    try {
      const client = await pool.connect();
      const sql = "SELECT COUNT(*) AS count FROM api_keys WHERE api_key = $1";
      const { rows } = await client.query(sql, [apiKey]);

      if (!rows) {
        return false;
      }

      const count = parseInt(rows[0].count);
      return count > 0;
    } catch (error) {
      console.error("Error validating API key:", error);
      throw error;
    }
  },
};

export default apiKeyData;
