import { sql } from '@vercel/postgres';

export interface FormSubmission {
  id: string;
  type: string;
  submitted_at: Date;
  name: string;
  email: string;
  phone?: string;
  data: Record<string, any>;
}

// Initialize database tables
export async function initDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS form_submissions (
        id VARCHAR(255) PRIMARY KEY,
        type VARCHAR(50) NOT NULL,
        submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        data JSONB NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;
    
    // Create index for better query performance
    await sql`
      CREATE INDEX IF NOT EXISTS idx_form_submissions_type ON form_submissions(type)
    `;
    
    await sql`
      CREATE INDEX IF NOT EXISTS idx_form_submissions_submitted_at ON form_submissions(submitted_at DESC)
    `;
    
    console.log('Database tables initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

// Save form submission to database
export async function saveSubmission(submission: {
  id: string;
  type: string;
  name: string;
  email: string;
  phone?: string;
  data: Record<string, any>;
}) {
  try {
    await sql`
      INSERT INTO form_submissions (id, type, name, email, phone, data)
      VALUES (${submission.id}, ${submission.type}, ${submission.name}, ${submission.email}, ${submission.phone || null}, ${JSON.stringify(submission.data)})
    `;
    
    console.log('Submission saved to database:', submission.id);
  } catch (error) {
    console.error('Error saving submission to database:', error);
    throw error;
  }
}

// Get all submissions with optional type filter
export async function getSubmissions(type?: string) {
  try {
    let result;
    
    if (type && type !== 'all') {
      result = await sql`
        SELECT id, type, submitted_at, name, email, phone, data
        FROM form_submissions
        WHERE type = ${type}
        ORDER BY submitted_at DESC
      `;
    } else {
      result = await sql`
        SELECT id, type, submitted_at, name, email, phone, data
        FROM form_submissions
        ORDER BY submitted_at DESC
      `;
    }
    
    // Transform the data to match the expected format
    return result.rows.map(row => ({
      id: row.id,
      type: row.type,
      submittedAt: row.submitted_at,
      name: row.name,
      email: row.email,
      phone: row.phone,
      ...row.data
    }));
  } catch (error) {
    console.error('Error fetching submissions from database:', error);
    throw error;
  }
}

// Get submission by ID
export async function getSubmissionById(id: string) {
  try {
    const result = await sql`
      SELECT id, type, submitted_at, name, email, phone, data
      FROM form_submissions
      WHERE id = ${id}
      LIMIT 1
    `;
    
    if (result.rows.length === 0) {
      return null;
    }
    
    const row = result.rows[0];
    return {
      id: row.id,
      type: row.type,
      submittedAt: row.submitted_at,
      name: row.name,
      email: row.email,
      phone: row.phone,
      ...row.data
    };
  } catch (error) {
    console.error('Error fetching submission by ID:', error);
    throw error;
  }
}
