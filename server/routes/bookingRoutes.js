const express = require("express");
const app = express.Router();
const db = require("../database/db");

app.post("/trans_booking", (req, res) => {    
  const booking = req.body;

  booking.from_Place = JSON.stringify(booking.from_Place);
  booking.to_Place = JSON.stringify(booking.to_Place);

  db.query("INSERT INTO trans_booking SET ?", booking, (error, results) => {
    if (error) {
      console.error("Error inserting booking data:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json({ message: "Booking created successfully" });
    }
  });
}); 
 
app.post("/mas_vehicles", (req, res) => {
  const vehicle = req.body;

  vehicle.vehicle_Name = JSON.stringify(vehicle.vehicle_Name);
  vehicle.vehicle_Number = JSON.stringify(vehicle.vehicle_Number);
  vehicle.vehicle_Type = JSON.stringify(vehicle.vehicle_Type);

  db.query("INSERT INTO mas_vehicle SET ?", vehicle, (error, results) => {
    if (error) {
      console.error("Error inserting vehicle data:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json({ message: "Vehicle created successfully" });
    }
  });
});

app.post("/mas_fav_Place", (req, res) => {
  const favoritePlace = req.body;

  favoritePlace.place_Name = JSON.stringify(favoritePlace.place_Name);
  favoritePlace.latitude = JSON.stringify(favoritePlace.latitude);
  favoritePlace.longitude = JSON.stringify(favoritePlace.longitude);

  db.query(
    "INSERT INTO mas_fav_place SET ?",
    favoritePlace,
    (error, results) => {
      if (error) {
        console.error("Error inserting favorite place data:", error);
        res.status(500).json({ error: "Internal server error" });
      } else {
        res.json({ message: "Favorite place created successfully" });
      }
    }
  );
});

module.exports = app;
