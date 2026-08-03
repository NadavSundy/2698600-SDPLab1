CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    title TEXT NOT NULL
        CHECK (length(trim(title)) > 0),

    description TEXT NOT NULL DEFAULT '',

    due_date TEXT NOT NULL,

    topic TEXT NOT NULL
        CHECK (length(trim(topic)) > 0),

    status TEXT NOT NULL DEFAULT 'TODO'
        CHECK (status IN ('TODO', 'IN_PROGRESS', 'COMPLETE')),

    archived_at TEXT DEFAULT NULL,

    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);