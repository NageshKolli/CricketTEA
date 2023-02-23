const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();

const dbPath = path.join(__dirname, "cricketTeam.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();
//API 1
app.get("/players/", async (request, response) => {
  const getPlayersQuery = `
    SELECT
      cricket_team.player_id AS playerId,
      cricket_team.player_name AS playerName,
      cricket_team.jersey_number AS jerseyNumber,
      cricket_team.role AS role
    FROM
      cricket_team ORDER BY player_id`;
  const playersArray = await db.all(getPlayersQuery);
  response.send(playersArray);
});

module.exports = express;
