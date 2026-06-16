const axios = require("axios");
const db = require("../config/db");

const getProfile = async (req, res) => {
    try {
        const username = req.params.username;

        const url = `https://api.github.com/users/${username}`;

        const response = await axios.get(url);

        const accountAgeYears =
            new Date().getFullYear() -
            new Date(response.data.created_at).getFullYear();

        const profile = {
            username: response.data.login,
            name: response.data.name,
            followers: response.data.followers,
            following: response.data.following,
            publicRepos: response.data.public_repos,
            accountAgeYears: accountAgeYears,
            profileUrl: response.data.html_url
        };

        const query = `
        INSERT INTO profiles
        (
            username,
            name,
            followers,
            following,
            public_repos,
            account_age_years,
            profile_url
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            profile.username,
            profile.name,
            profile.followers,
            profile.following,
            profile.publicRepos,
            profile.accountAgeYears,
            profile.profileUrl
        ];

        db.query(query, values, (err, result) => {

            if (err) {
                console.log("error code", err.code)
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(409).json({
                        message: "Profile already analyzed"
                    });
                }

                console.log(err);

                return res.status(500).json({
                    message: "Database Error"
                });
            }

            res.status(200).json({
                message: "Profile analyzed and saved successfully",
                profile
            });
        });

    } catch (error) {

        if (error.response && error.response.status === 404) {
            return res.status(404).json({
                message: "GitHub user not found"
            });
        }

        console.log(error);

        return res.status(500).json({
            message: "Server Error"
        });
    }
};

const getAllProfiles = (req, res) => {
    console.log("getAllProfiles reached");
    const query = "SELECT * FROM profiles";

    db.query(query, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Database Error"
            });
        }
        res.status(200).json(results);
    })
}

const getSingleProfile = (req, res) => {
    const username = req.params.username;

    const query = "SELECT * FROM profiles WHERE username = ?"

    db.query(query, [username], (err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }
        if (results.length === 0) {
            return res.status(404).json({
                message: "Profile not found"
            });
        }
        res.status(200).json(results[0]);
    })
}

module.exports = {
    getProfile,
    getAllProfiles,
    getSingleProfile
};