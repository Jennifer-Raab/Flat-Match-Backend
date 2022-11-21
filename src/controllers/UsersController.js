import pool from "../db/db.js";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const getSingleUserByEmail = async(req, res) => {
    try { 
        const { email, password } = req.body;
        console.log(" req.body",  req.body);
        
        const {rows: [found]} = await pool.query(`SELECT * FROM users WHERE email = $1 AND active = true LIMIT 1`, [email]);
        console.log("found", found);
          if (!found) res.status(404).send("User not found");
          // const match = await bcrypt.compare(password, found.passwort);
          const match = (password === found.passwort) ? true : false;
          if (!match) res.status(400).send("Password incorrect");
         
          console.log("found.id", found.id);
            const token = jwt.sign({ id: found.id }, process.env.JWT_SECRET);
            res.status(201).json({ token });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getSingleUserByToken = async(req, res) => {
    try { 
        console.log("req.userId", req.userId);
        const id = req.userId; 
        
        const {rows: [found]} = await pool.query(`SELECT * FROM users WHERE id = $1 AND active = true LIMIT 1`, [id]);
        console.log("found", found);
        res.status(200).json(found);
    } catch (error) {
        res.status(500).send(error.message);
    }
};