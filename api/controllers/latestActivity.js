import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getActivities = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    jwt.verify(token, "secretkey", (err, userInfo) => {
      const q = `SELECT la.* FROM latestactivities la JOIN relationships r ON r.followedUserId = la.userId
            WHERE r.followerUserId = (?) ORDER BY la.updatedAt DESC`;

      db.query(q, [userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
      });
    });
  });
};

export const addActivity = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q1 = "SELECT name, profilePic from users WHERE id = ?";

    db.query(q1, [userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);

      const username = data[0].name;
      const profilePic = data[0].profilePic;

      const q2 =
        "INSERT INTO latestactivities (`userId`, `username`, `changed`, `profilePic`, `updatedAt`) VALUES (?)";

      const values = [
        userInfo.id,
        username,
        req.query.changed,
        profilePic,
        moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      ];

      db.query(q2, [values], (err2, data) => {
        if (err2) return res.status(500).json(err2);
        return res.status(200).json("Latest activity updated");
      });
    });
  });
};
