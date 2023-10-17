import morgan from "morgan";
import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import dotenv from 'dotenv';
import path from "path";
import db from './mongodb.js'
import socket from "./socket.io.js";


export default function configuration(app) {
    app.use(morgan('common'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.resolve('./public')));
    app.use(cors());
    dotenv.config()
    socket(4000,"SocketIO Started : ")
    db.connect((err) => err ? console.log("Mongo db Not conneted ", err) : console.log(`Mongodb Connected`))
}
