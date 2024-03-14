const express = require("express");
const cors = require("cors");
require('dotenv').config();
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(`${MONGO_URI}/backendtutorial`).then(() => {
    console.log("connected to DB");
}).catch((err) => {
    console.log(err);
})

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

// schema 
const schemaData = mongoose.Schema({
    title: String,
    note: String,
}, {
    timestamps: true,
})
// model 
const noteModel = mongoose.model("Note", schemaData)


// api's

// read 
app.get("/", async (req, res) => {
    const data = await noteModel.find({});
    res.json({
        success: true,
        data: data
    })
})
// create data // save data in mongoDB
app.post("/create", async (req, res) => {
    console.log(req.body);
    const data = new noteModel(req.body);
    await data.save();
    res.send({ success: true, message: "data save succesfully" });
})

// update data 
app.put("/update", async (req, res) => {
    console.log(req.body);
    const { id, ...rest } = req.body;
    const data = await noteModel.updateOne({ _id: id }, rest)
    res.send({
        success: true,
        message: "data updated succesfully",
        data: data,
    })
})

// delete api 
app.delete("/delete/:id", async (req, res) => {
    // console.log(req.body);
    const id = req.params.id;
    const data = await noteModel.deleteOne({ _id: id });
    res.send({
        success: true,
        message: "data deleted succesfully",
        data: data,
    })
})

app.listen(PORT, () => {
    console.log("server is running ");
})