CREATE TABLE IF NOT EXISTS analysis_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    file_name TEXT NOT NULL,
    ats_score INTEGER,
    match_percentage INTEGER,
    skills TEXT,
    missing_keywords TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);