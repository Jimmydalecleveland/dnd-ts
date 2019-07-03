"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
app.get('/', function (req, res) { return res.send('DND Typescript!'); });
app.listen(3000, function () { return console.log("Express Typescript running on 3000"); });
