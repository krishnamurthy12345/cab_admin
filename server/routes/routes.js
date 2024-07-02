const express = require("express");
const app = express.Router();
const db = require("../database/db");
const multer = require("multer");
const path = require("path");


app.post("/Create_user", (req, res) => {
  const userData = req.body;
  const { MobileNo, first_Name, last_Name, is_AcceptTerms, gender } = userData;

  function generateReferralCode(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const codeLength = length || 8;
    let referralCode = "";

    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      referralCode += characters.charAt(randomIndex);
    }

    return referralCode;
  }

  if (!first_Name) {
    res.status(400).json({
      status: "error",
      message: "First Name is required",
    });
    return;
  }

  if (!last_Name) {
    res.status(400).json({
      status: "error",
      message: "Last Name is required",
    });
    return;
  }

  if (!MobileNo) {
    res.status(400).json({
      status: "error",
      message: "Mobile Number is required",
    });
    return;
  }

  if (!is_AcceptTerms) {
    res.status(400).json({
      status: "error",
      message: "You must accept the terms and conditions",
    });
    return;
  }

  if (!gender) {
    res.status(400).json({
      status: "error",
      message: "Gender is required",
    });
    return;
  }

  const Referal_Code = generateReferralCode(7);
  const Date_time = new Date();

  const checkUserQuery = "SELECT user_id FROM abcd.mas_user WHERE MobileNo = ?";
  db.query(checkUserQuery, [MobileNo], (error, results) => {
    if (error) {
      console.error("Error checking user:", error);
      res.status(500).json({ status: "error", message: "An error occurred" });
    } else if (results.length > 0) {
      res.status(400).json({ status: "error", message: "User already exists" });
    } else {
      const sql = `
        INSERT INTO abcd.mas_user (
          user_Name, pass_word, first_Name, last_Name, MobileNo, OTP, OTP_Exp,
          is_AcceptTerms, profile_Image, Wallet_Amount, gender, Emergency_No,Date_time, Referal_Code
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
      `;
      const values = [
        userData.user_Name,
        userData.pass_word,
        userData.first_Name,
        userData.last_Name,
        userData.MobileNo,
        userData.OTP,
        userData.OTP_Exp,
        userData.is_AcceptTerms,
        userData.profile_Image,
        userData.Wallet_Amount,
        userData.gender,
        userData.Emergency_No,
        Date_time,
        Referal_Code, // Use the generated referral code
      ];

      db.query(sql, values, (regError, regResults) => {
        if (regError) {
          console.error("Error inserting data:", regError);
          res
            .status(500)
            .json({ status: "error", message: "Failed to insert data" });
        } else {
          console.log("Data inserted successfully.");
          console.log("User registered with referral code:", Referal_Code, Date_time);
          res.status(200).json({
            status: "success",
            message: "Data inserted successfully",
            results: regResults,
          });
        }
      });
    }
  });
});
app.post("/send_OTP", (req, res) => {
  const { MobileNo } = req.body;

  const OTP = generateOTP();
  const OTP_Exp = new Date(Date.now() + 300000);
  saveOTPInDatabase(MobileNo, OTP, OTP_Exp);
  res
    .status(200)
    .json({ status: "success", message: "OTP sent successfully", OTP: OTP });
});
function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}
function OTP_ExpTimeOut() {
  return (OTP_Exp = new Date(Date.now() + 180000));
}
function saveOTPInDatabase(MobileNo, OTP, OTP_Exp) {
  const sql =
    "UPDATE abcd.mas_user SET MobileNo = ?, OTP = ?, OTP_Exp = ? WHERE MobileNo = ?";
  db.query(sql, [MobileNo, OTP, OTP_Exp, MobileNo], (error, result) => {
    if (error) {
      console.error("Error saving OTP:", error);
    } else {
      console.log("OTP saved successfully.");
    }
  });
}

app.post("/verify_OTP", (req, res) => {
  const { MobileNo, OTP } = req.body;

  const currentTimestamp = new Date();

  const sql =
    "SELECT * FROM abcd.mas_user WHERE MobileNo = ? and OTP = ? and OTP_Exp > ?";
  db.query(sql, [MobileNo, OTP, currentTimestamp], (error, results) => {
    if (error) {
      console.error("Error verifying OTP:", error);
      res.status(500).json({ status: "error", message: "An error occurred" });
    } else if (results.length > 0) {
      const OTP_verified = true;
      saveOTPVerifiedDatabase(MobileNo, OTP_verified);
      res.status(200).json({
        status: "success",
        message: "OTP verified and login successfully",
        OTP_Exp: results[0].OTP_Exp,
      });
    } else {
      res.status(400).json({ status: "error", message: "Invalid OTP" });
    }
  });
});
function saveOTPVerifiedDatabase(MobileNo, OTP_verified) {
  const sql = "UPDATE abcd.mas_user SET OTP_verified= ? WHERE MobileNo = ?";
  db.query(sql, [OTP_verified, MobileNo], (error, result) => {
    if (error) {
      console.error("Error saving OTP:", error);
    } else {
      console.log("OTP saved successfully.", result);
    }
  });
}
app.post("/login", (req, res) => {
  const { MobileNo } = req.body;

  const sql = "SELECT * FROM abcd.mas_user WHERE MobileNo = ?";

  db.query(sql, [MobileNo], (error, result) => {
    if (error) {
      console.error("Error during login:", error);
      res
        .status(500)
        .json({ status: "error", message: "An error occurred during login" });
    } else if (result.length > 0) {
      const OTP = generateOTP();
      const OTP_Exp = OTP_ExpTimeOut();
      saveOTPInDatabase(MobileNo, OTP, OTP_Exp);
      res
        .status(200)
        .json({
          status: "success",
          message: "OTP send successful",
          OTP: OTP,
          result,
        });
    } else {
      res
        .status(400)
        .json({ status: "error", message: "Invalid MobileNo or user_ID" });
    }
  });
});
app.put("/update_user/:user_id", (req, res) => {
  const userId = req.params.user_id;
  const userData = req.body;
  const mobileNo = userData.MobileNo;

  const checkUserQuery = "SELECT user_id FROM abcd.mas_user WHERE user_id = ?";
  db.query(checkUserQuery, [userId], (checkUserError, checkUserResults) => {
    if (checkUserError) {
      console.error("Error checking user in the database:", checkUserError);
      return checkUserError;
    }

    if (checkUserResults.length === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    const checkMobileNoQuery =
      "SELECT user_id FROM mas_user WHERE MobileNo = ? AND user_id != ?";
    db.query(
      checkMobileNoQuery,
      [mobileNo, userId],
      (checkMobileNoError, checkMobileNoResults) => {
        if (checkMobileNoError) {
          console.error(
            "Error checking MobileNo in the database:",
            checkMobileNoError
          );
          return checkMobileNoError;
        }

        if (checkMobileNoResults.length > 0) {
          return res.status(409).json({
            status: "error",
            message: "Mobile Number is already in use.",
          });
        }

        const updateQuery = `
          UPDATE abcd.mas_user
          SET user_Name = ?,
              pass_word = ?,
              first_Name = ?,
              last_Name = ?,
              MobileNo = ?,
              OTP = ?,
              OTP_Exp = ?,
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
          userData.OTP,
          userData.OTP_Exp,
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
  });
});
app.get("/totalUsers", (req, res) => {
  const page = req.query.page || 1; // Get the page number from the query parameter or default to page 1
  const itemsPerPage = 10; // Number of items to fetch per page
  const offset = (page - 1) * itemsPerPage; // Calculate the offset

  const selectQuery = `SELECT * FROM abcd.mas_user ORDER BY user_id DESC LIMIT ? OFFSET ?`;

  db.query(selectQuery, [itemsPerPage, offset], (error, results) => {
    if (error) {
      console.error("Error retrieving user data:", error);
      return res.status(500).json({ status: "error", message: "An error occurred" });
    }

    if (results.length === 0) {
      return res.status(404).json({ status: "error", message: "No user records found" });
    }

    res.status(200).json({ status: "success", results });
  });
});

app.get("/totalUserCount", (req, res) => {
  const countUsersQuery = "SELECT COUNT(DISTINCT user_id) AS totalUsers FROM mas_user";

  db.query(countUsersQuery, (error, results) => {
    if (error) {
      console.error("Error counting users:", error);
      res.status(500).json({ status: "error", message: "An error occurred" });
    } else {
      const totalUsers = results[0].totalUsers;
      res.status(200).json({
        status: "success",
        message: "Total number of users",
        totalUsers: totalUsers,
      });
    }
  });
});


app.get("/getuser", (req, res) => {
  const selectQuery = `SELECT * FROM mas_user `;

  db.query(selectQuery, (error, results) => {
    if (error) {
      console.error("Error retrieving user data:", error);
      return error;
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Database empty" });
    }

    res.status(200).json({ status: "success", results });
  });
});

app.get("/pendingUsers", (req, res) => {
  const selectQuery = "SELECT * FROM mas_user WHERE profile_Image IS NULL AND Emergency_No IS NULL";

  db.query(selectQuery, (error, results) => {
    if (error) {
      console.error("Error retrieving user data:", error);
      return res.status(500).json({ status: "error", message: "An error occurred" });
    }

    const pendingUsers = results.length;

    res.status(200).json({
      status: "success",
      message: "Total pending users without profile image or Emergency contact",
      pendingUsersCount: pendingUsers,
    });
  });
});



app.get("/freshUsers", (req, res) => {
  const currentDate = new Date();
  const tenDaysAgo = new Date(currentDate);
  tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

  const selectQuery = `
    SELECT COUNT(*) AS freshUsers 
    FROM mas_user 
    WHERE Date_time >= ?;
  `;

  db.query(selectQuery, [tenDaysAgo], (error, results) => {
    if (error) {
      console.error("Error counting fresh users:", error);
      res.status(500).json({ status: "error", message: "An error occurred" });
    } else {
      const freshUsers = results[0].freshUsers;
      res.status(200).json({
        status: "success",
        message: "Total number of fresh users in the last 10 days",
        freshUsers: freshUsers,
      });
    }
  });
});

// app.get("/freshUsers", (req, res) => {
//   const currentDate = new Date();
//   const fifteenMinutesAgo = new Date(currentDate.getTime() - 15 * 60 * 1000); // 15 minutes in milliseconds

//   const selectQuery = `
//     SELECT COUNT(*) AS freshUsers 
//     FROM mas_user 
//     WHERE Date_time >= ?;
//   `;

//   db.query(selectQuery, [fifteenMinutesAgo], (error, results) => {
//     if (error) {
//       console.error("Error counting fresh users:", error);
//       res.status(500).json({ status: "error", message: "An error occurred" });
//     } else {
//       const freshUsers = results[0].freshUsers;
//       res.status(200).json({
//         status: "success",
//         message: "Total number of fresh users in the last 15 minutes",
//         freshUsers: freshUsers,
//       });
//     }
//   });
// });




app.post("/mas_UserAddress/:user_id", (req, res) => {
  const {
    addresstype_id,
    address,
    city_Name,
    state_Name,
    pincode,
    latitude,
    longitude,
    is_Default,
  } = req.body;

  const user_id = req.params.user_id;

  const userExistQuery = "SELECT user_id FROM mas_user WHERE user_id = ?";
  db.query(userExistQuery, [user_id], (userExistError, userExistRows) => {
    if (userExistError) {
      console.error("Error checking for existing user:", userExistError);
      res.status(500).json({ error: "Error checking for an existing user" });
    } else if (userExistRows.length === 0) {
      res.status(400).json({ error: "User ID does not exist" });
    } else {
      const query = "INSERT INTO mas_UserAddress SET ?";

      const newAddress = {
        addresstype_id,
        user_id,
        address,
        city_Name,
        state_Name,
        pincode,
        latitude,
        longitude,
        is_Default,
      };

      db.query(query, newAddress, (insertError, result) => {
        if (insertError) {
          console.error("Error adding user address:", insertError);
          res.status(500).json({ error: "Error adding user address" });
        } else {
          res.status(201).json({
            message: "User address added successfully",
            insertId: result.insertId,
          });
        }
      });
    }
  });
});

app.post("/add_emergency_contact/:user_id", (req, res) => {
  const user_id = req.params.user_id;
  const { emg_Contact } = req.body;

  const checkUserQuery = "SELECT user_id FROM mas_user WHERE user_id = ?";
  db.query(checkUserQuery, [user_id], (checkUserError, checkUserResults) => {
    if (checkUserError) {
      console.error("Error checking user in the database:", checkUserError);
      res
        .status(500)
        .json({
          status: "error",
          message: "An error occurred in check primary",
        });
    } else if (checkUserResults.length === 0) {
      res.status(404).json({ status: "error", message: "User not found" });
    } else {
      const checkMobileNoQuery =
        "SELECT user_id FROM mas_user_emg_Contact WHERE  emg_Contact= ? and user_id = ?";
      db.query(
        checkMobileNoQuery,
        [emg_Contact, user_id],
        (checkMobileNoError, checkMobileNoResults) => {
          if (checkMobileNoError) {
            console.error(
              "Error checking MobileNo in the database:",
              checkMobileNoError
            );
            res
              .status(500)
              .json({ status: "error", message: "An error occurred" });
          } else if (checkMobileNoResults.length > 0) {
            res
              .status(409)
              .json({
                status: "error",
                message: "Mobile Number is already in use.",
              });
          } else {
            const query =
              "INSERT INTO mas_user_emg_Contact (user_id, emg_Contact) VALUES (?, ?)";
            const values = [user_id, emg_Contact];
            db.query(query, values, (error, result) => {
              if (error) {
                console.error("Error adding emergency contact:", error);
                res
                  .status(500)
                  .json({
                    status: "error",
                    message: "Error adding emergency contact",
                  });
              } else {
                res
                  .status(201)
                  .json({
                    status: "success",
                    message: "Emergency contact added successfully",
                  });
              }
            });
          }
        }
      );
    }
  });
});

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/images");
  },
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage });
app.put("/upload/:user_id", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const user_id = req.params.user_id;
  const imageUrl = `/images/${req.file.filename}`;

  db.query(
    "SELECT * FROM mas_user WHERE user_id = ?",
    [user_id],
    (err, results) => {
      if (err) {
        console.error("Error checking user ID:", err);
        res.status(500).send("Error checking user ID.");
      } else if (results.length === 0) {
        res.status(404).send("userid not found.");
      } else {
        console.log(imageUrl);
        const updateQuery =
          "UPDATE mas_user SET profile_Image = ? WHERE user_id = ?";
        db.query(updateQuery, [imageUrl, user_id], (err, result) => {
          if (err) {
            console.error("Error uploading image:", err);
            res.status(500).send("Error uploading image.");
          } else {
            console.log("Image uploaded:", result.insertId);
            res.status(200).send("Image uploaded successfully.");
          }
        });
      }
    }
  );
});
app.post("/addresstypes/:user_id", (req, res) => {
  const user_id = req.params.user_id; // Get user_id from the URL parameter
  const { addresstype } = req.body; // Get addresstype from the request body

  const sql =
    "INSERT INTO mas_AddressType (addresstype, user_id) VALUES (?, ?)";
  db.query(sql, [addresstype, user_id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res
      .status(201)
      .json({
        message: "Address type added successfully",
        insertId: result.insertId,
      });
  });
});

app.get("/addresstypes/:user_id", (req, res) => {
  const getAddress = req.params.user_id;
  const sql = "SELECT * FROM mas_AddressType where user_id=?";
  db.query(sql, getAddress, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json({ addressTypes: results });
  });
});

app.get("/user_details", (req, res) => {
  const userId = req.params.user_id;

  const query = `
    SELECT
    u.*,
    e.*,
    a.*
FROM mas_user AS u
LEFT JOIN mas_user_emg_Contact AS e ON u.user_id = e.user_id
LEFT JOIN mas_UserAddress AS a ON u.user_id = a.user_id

     `;

  db.query(query, [userId], (error, results) => {
    if (error) {
      console.error("Error retrieving user details:", error);
      res.status(500).json({ status: "error", message: "An error occurred" });
    } else if (results.length === 0) {
      res.status(404).json({ status: "error", message: "User not found" });
    } else {
      res.status(200).json({ status: "success", results });
    }
  });
});

app.delete("/deleteUser/:user_id", (req, res) => {

  const userId = req.params.user_id;

  if (isNaN(userId)) {
    return res.status(400).json({ status: 'error', message: 'Invalid user ID' });
  }

  const deleteQuery = 'DELETE FROM mas_user WHERE user_id = ?';

  db.query(deleteQuery, [userId], (deleteError, deleteResults) => {
    if (deleteError) {
      console.error('Error deleting user:', deleteError);
      return res.status(500).json({ status: 'error', message: 'Failed to delete user' });
    }

    if (deleteResults.affectedRows === 0) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    console.log('User deleted successfully.');
    res.status(200).json({ status: 'success', message: 'User deleted successfully' });
  });
});

module.exports = app;
