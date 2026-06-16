require("dotenv").config({ path: "../.env" });

const express = require("express");



require("./config/db");

const profileRoutes = require("./routes/profileRoutes")

const app = express();


app.use("/api/profiles", profileRoutes);


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})