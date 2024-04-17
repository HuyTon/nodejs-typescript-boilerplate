import pool from "../data/db";

const formatUserData = (user: any) => {
    return {
        id: user.id,
        name: user.name,
        email: user.email
    };
};

const createUser = async (name: string, email: string) => {
    try {
        const sql = "INSERT INTO users(name, email) VALUES($1, $2) RETURNING *";
        const { rows } = await pool.query(sql, [name, email]);

        if(!rows || rows.length === 0) {
            throw Error("Error creating user");
        }    
        return formatUserData(rows[0]);

    } catch(error) {
        throw Error(`Error creating user ${error}`);
    }
}

const updateUser = async (id: number, name: string, email: string) => {
    try {
        const sql = "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *";
        const { rows } = await pool.query(sql, [name, email, id]);

        if(!rows || rows.length === 0) {
            throw Error("Error updating user");
        }    
        return formatUserData(rows[0]);

    } catch(error) {
        throw Error(`Error updating user ${error}`);
    }
}

const deleteUser = async (id: number) => {
    try {
        const sql = "DELETE FROM users WHERE id = $1 RETURNING *";
        const { rows } = await pool.query(sql, [id]);

        if(!rows || rows.length === 0) {
            throw Error("Error deleting user");
        }    
        return formatUserData(rows[0]);

    } catch(error) {
        throw Error(`Error deleting user ${error}`);
    }
}

const getUsers = async (page: number, limit: number, sortField: string, sortOrder: string) => {
    try {
        const offset = (page - 1) * limit;
        const sql = `SELECT * FROM users
        ORDER BY ${sortField} ${sortOrder.toUpperCase()}
        LIMIT $1 OFFSET $2
        `;
        const {rows} = await pool.query(sql, [limit, offset]);

        if(!rows || rows.length === 0) {
            return null;
        }    
        return rows.map(formatUserData);
    } catch (error) {
        throw Error(`Error get users ${error}`);
    }     
}

export default {createUser, updateUser, deleteUser, getUsers};