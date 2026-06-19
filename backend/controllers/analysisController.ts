import { Request, Response } from "express";
import db from "../database/db";

export const getHistory = (
  _req: Request,
  res: Response
): void => {
  db.all(
    `
    SELECT *
    FROM analysis_history
    ORDER BY created_at DESC
    `,
    [],
    (err, rows) => {
      if (err) {
        res.status(500).json({
          success: false,
          error: err.message,
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: rows,
      });
    }
  );
};

export const deleteHistory = (
  req: Request,
  res: Response
): void => {
  const id = req.params.id;

  db.run(
    "DELETE FROM analysis_history WHERE id = ?",
    [id],
    function (err) {
      if (err) {
        res.status(500).json({
          success: false,
          error: err.message,
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "History deleted successfully",
      });
    }
  );
};