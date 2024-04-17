import pool from "../data/db";

interface Token {
    name: string;
    symbol: string;
    totalSupply: number;
    metadata: any;
}

const createToken = async (name: string, symbol: string, totalSupply: number, metadata: any) => {
    const token: Token = {
        name,
        symbol,
        totalSupply,
        metadata
    };

    return token;
}

const insertTokenIntoDatabase = async (token: Token) => {
    try {
        const { name, symbol, totalSupply, metadata } = token;
        const sql = "INSERT INTO tokens(name, symbol, total_supply, metadata) VALUES($1, $2, $3, $4) RETURNING *";
        const { rows } = await pool.query(sql, [name, symbol, totalSupply, JSON.stringify(metadata)]);

        if(!rows || rows.length === 0) {
            throw Error("Error creating token");
        }    
        return rows[0];

    } catch(error) {
        throw Error(`Error creating token ${error}`);
    }
}

export default {createToken};