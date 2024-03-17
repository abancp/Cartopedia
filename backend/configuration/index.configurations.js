import morgan from "morgan";
import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import dotenv from 'dotenv';
import path from "path";
import db from './mongodb.js'
import socket from "./socket.io.js";


export default function configuration(app) {
    dotenv.config()
    app.use(morgan('common'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.resolve('./public')));
    app.use(cors({ origin: ["http://localhost:3000","https://cartopedia.vercel.app","http://192.168.99.235:3000"], credentials: true}));
    socket(4001,"SocketIO Started : ")
    db.connect((err) => err ? console.log("Mongo db Not connected ", err) : console.log(`Mongodb Connected`))
}
