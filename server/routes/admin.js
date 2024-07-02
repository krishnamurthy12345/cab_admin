const express = require("express");
const app = express.Router();
const db = require("../database/db");
app.put("/updateuserInAdmin/:user_id", (req, res) => {
  const userId = req.params.user_id;
  const userData = req.body;
  const updateQuery = `
            UPDATE mas_user
            SET user_Name = ?,
                pass_word = ?,
                first_Name = ?,
                last_Name = ?,
                MobileNo = ?,
                is_AcceptTerms = ?,
                profile_Image = ?,
                Wallet_Amount = ?,
                gender = ?,
                Emergency_No = ?,
                Referal_Code = ?
            WHERE user_id = ?
          `;

  const values = [
    userData.user_Name,
    userData.pass_word,
    userData.first_Name,
    userData.last_Name,
    userData.MobileNo,
    userData.is_AcceptTerms,
    userData.profile_Image,
    userData.Wallet_Amount,
    userData.gender,
    userData.Emergency_No,
    userData.Referal_Code,
    userId,
  ];

  db.query(updateQuery, values, (updateError, results) => {
    if (updateError) {
      console.error("Error updating user data:", updateError);
      return updateError;
    }

    console.log("User data updated successfully.");
    res.status(200).json({
      status: "success",
      message: "User data updated successfully",
      results,
    });
  });
}
);
app.delete("/deleteUserInAdmin/:user_id", (req, res) => {
  const user_id = req.params.user_id;

  const deleteQuery = "DELETE FROM mas_user WHERE user_id = ?";

  db.query(deleteQuery, [user_id], (error, results) => {
    if (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ status: "error", message: "An error occurred while deleting user" });
    } else {
      res.status(200).json({
        status: "success",
        message: "User deleted successfully",
        deletedUser: results.affectedRows > 0,
      });
    }
  });
});


module.exports = app;
