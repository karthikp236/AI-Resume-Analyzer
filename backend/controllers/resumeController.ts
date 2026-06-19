import { Request, Response } from "express";
import db from "../database/db";

import { extractTextFromPDF } from "../services/pdfParser";
import { extractSkills } from "../services/skillExtractor";
import { calculateATSScore } from "../services/atsService";
import { calculateMatchPercentage } from "../services/matchCalculator";
import { getMissingKeywords } from "../services/keywordMatcher";
import { generateSuggestions } from "../services/openaiService";

export const uploadResume = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
      return;
    }

    const extractedText = await extractTextFromPDF(
      req.file.path
    );

    const resumeSkills = extractSkills(
      extractedText
    );

    const atsScore = calculateATSScore(
      resumeSkills,
      extractedText
    );

    const jobDescription =
      (req.body.jobDescription as string) || "";

    const jobSkills = extractSkills(
      jobDescription
    );

    const matchPercentage =
      calculateMatchPercentage(
        resumeSkills,
        jobSkills
      );

    const missingKeywords =
      getMissingKeywords(
        resumeSkills,
        jobSkills
      );

    const suggestions =
      generateSuggestions(
        missingKeywords,
        atsScore
      );

    db.run(
      `
      INSERT INTO analysis_history
      (
        file_name,
        ats_score,
        match_percentage,
        skills,
        missing_keywords
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        req.file.originalname,
        atsScore,
        matchPercentage,
        JSON.stringify(resumeSkills),
        JSON.stringify(missingKeywords),
      ],
      (err) => {
        if (err) {
          console.error(
            "Database Insert Error:",
            err
          );
        }
      }
    );

    res.status(200).json({
      success: true,
      message:
        "Resume uploaded successfully",

      fileName: req.file.filename,
      originalName:
        req.file.originalname,

      extractedText:
        extractedText.substring(
          0,
          1000
        ),

      skills: resumeSkills,

      atsScore,

      matchPercentage,

      missingKeywords,

      suggestions,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Resume Analysis Failed",
    });
  }
};