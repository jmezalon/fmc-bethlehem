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

export interface MultiLanguageText {
  en: string;
  es: string;
  fr: string;
  ht: string;
}

export interface Event {
  id: string;
  title: MultiLanguageText;
  date: string;
  time: string;
  location: MultiLanguageText;
  description: MultiLanguageText;
  category: MultiLanguageText;
  image?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Group {
  id: string;
  name: MultiLanguageText;
  description: MultiLanguageText;
  dayOfWeek: string;
  time: string;
  language: string;
  lifeStage: string;
  location: MultiLanguageText;
  contactEmail: string;
  leader: MultiLanguageText;
  capacity: number;
  currentMembers: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface Sermon {
  id: string;
  title: MultiLanguageText;
  speaker: MultiLanguageText;
  date: string;
  duration: string;
  description: MultiLanguageText;
  videoUrl: string;
  thumbnail: string;
  series: MultiLanguageText;
  created_at?: Date;
  updated_at?: Date;
}

// Initialize database tables
export async function initDatabase() {
  try {
    // Form submissions table
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
    
    // Events table
    await sql`
      CREATE TABLE IF NOT EXISTS events (
        id VARCHAR(255) PRIMARY KEY,
        title JSONB NOT NULL,
        date DATE NOT NULL,
        time VARCHAR(20) NOT NULL,
        location JSONB NOT NULL,
        description JSONB NOT NULL,
        category JSONB NOT NULL,
        image TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;
    
    // Groups table
    await sql`
      CREATE TABLE IF NOT EXISTS groups (
        id VARCHAR(255) PRIMARY KEY,
        name JSONB NOT NULL,
        description JSONB NOT NULL,
        day_of_week VARCHAR(20) NOT NULL,
        time VARCHAR(20) NOT NULL,
        language VARCHAR(50) NOT NULL,
        life_stage VARCHAR(50) NOT NULL,
        location JSONB NOT NULL,
        contact_email VARCHAR(255) NOT NULL,
        leader JSONB NOT NULL,
        capacity INTEGER NOT NULL,
        current_members INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;
    
    // Sermons table
    await sql`
      CREATE TABLE IF NOT EXISTS sermons (
        id VARCHAR(255) PRIMARY KEY,
        title JSONB NOT NULL,
        speaker JSONB NOT NULL,
        date DATE NOT NULL,
        duration VARCHAR(20) NOT NULL,
        description JSONB NOT NULL,
        video_url TEXT NOT NULL,
        thumbnail TEXT NOT NULL,
        series JSONB NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;
    
    // Create indexes for better query performance
    await sql`CREATE INDEX IF NOT EXISTS idx_form_submissions_type ON form_submissions(type)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_form_submissions_submitted_at ON form_submissions(submitted_at DESC)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_events_date ON events(date DESC)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_groups_day_of_week ON groups(day_of_week)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_sermons_date ON sermons(date DESC)`;
    
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

// EVENTS CRUD OPERATIONS
export async function getAllEvents(): Promise<Event[]> {
  try {
    const result = await sql`
      SELECT id, title, date, time, location, description, category, image, created_at, updated_at
      FROM events
      ORDER BY date DESC
    `;
    
    return result.rows.map(row => ({
      id: row.id,
      title: row.title,
      date: row.date,
      time: row.time,
      location: row.location,
      description: row.description,
      category: row.category,
      image: row.image,
      created_at: row.created_at,
      updated_at: row.updated_at
    }));
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
}

export async function createEvent(event: Omit<Event, 'created_at' | 'updated_at'>): Promise<void> {
  try {
    await sql`
      INSERT INTO events (id, title, date, time, location, description, category, image)
      VALUES (
        ${event.id},
        ${JSON.stringify(event.title)},
        ${event.date},
        ${event.time},
        ${JSON.stringify(event.location)},
        ${JSON.stringify(event.description)},
        ${JSON.stringify(event.category)},
        ${event.image || null}
      )
    `;
    console.log('Event created successfully:', event.id);
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
}

export async function deleteEvent(id: string): Promise<void> {
  try {
    await sql`DELETE FROM events WHERE id = ${id}`;
    console.log('Event deleted successfully:', id);
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
}

// GROUPS CRUD OPERATIONS
export async function getAllGroups(): Promise<Group[]> {
  try {
    const result = await sql`
      SELECT id, name, description, day_of_week, time, language, life_stage, location, contact_email, leader, capacity, current_members, created_at, updated_at
      FROM groups
      ORDER BY name->>'en' ASC
    `;
    
    return result.rows.map(row => ({
      id: row.id,
      name: row.name,
      description: row.description,
      dayOfWeek: row.day_of_week,
      time: row.time,
      language: row.language,
      lifeStage: row.life_stage,
      location: row.location,
      contactEmail: row.contact_email,
      leader: row.leader,
      capacity: row.capacity,
      currentMembers: row.current_members,
      created_at: row.created_at,
      updated_at: row.updated_at
    }));
  } catch (error) {
    console.error('Error fetching groups:', error);
    throw error;
  }
}

export async function createGroup(group: Omit<Group, 'created_at' | 'updated_at'>): Promise<void> {
  try {
    await sql`
      INSERT INTO groups (id, name, description, day_of_week, time, language, life_stage, location, contact_email, leader, capacity, current_members)
      VALUES (
        ${group.id},
        ${JSON.stringify(group.name)},
        ${JSON.stringify(group.description)},
        ${group.dayOfWeek},
        ${group.time},
        ${group.language},
        ${group.lifeStage},
        ${JSON.stringify(group.location)},
        ${group.contactEmail},
        ${JSON.stringify(group.leader)},
        ${group.capacity},
        ${group.currentMembers}
      )
    `;
    console.log('Group created successfully:', group.id);
  } catch (error) {
    console.error('Error creating group:', error);
    throw error;
  }
}

export async function deleteGroup(id: string): Promise<void> {
  try {
    await sql`DELETE FROM groups WHERE id = ${id}`;
    console.log('Group deleted successfully:', id);
  } catch (error) {
    console.error('Error deleting group:', error);
    throw error;
  }
}

// SERMONS CRUD OPERATIONS
export async function getAllSermons(): Promise<Sermon[]> {
  try {
    const result = await sql`
      SELECT id, title, speaker, date, duration, description, video_url, thumbnail, series, created_at, updated_at
      FROM sermons
      ORDER BY date DESC
    `;
    
    return result.rows.map(row => ({
      id: row.id,
      title: row.title,
      speaker: row.speaker,
      date: row.date,
      duration: row.duration,
      description: row.description,
      videoUrl: row.video_url,
      thumbnail: row.thumbnail,
      series: row.series,
      created_at: row.created_at,
      updated_at: row.updated_at
    }));
  } catch (error) {
    console.error('Error fetching sermons:', error);
    throw error;
  }
}

export async function createSermon(sermon: Omit<Sermon, 'created_at' | 'updated_at'>): Promise<void> {
  try {
    await sql`
      INSERT INTO sermons (id, title, speaker, date, duration, description, video_url, thumbnail, series)
      VALUES (
        ${sermon.id},
        ${JSON.stringify(sermon.title)},
        ${JSON.stringify(sermon.speaker)},
        ${sermon.date},
        ${sermon.duration},
        ${JSON.stringify(sermon.description)},
        ${sermon.videoUrl},
        ${sermon.thumbnail},
        ${JSON.stringify(sermon.series)}
      )
    `;
    console.log('Sermon created successfully:', sermon.id);
  } catch (error) {
    console.error('Error creating sermon:', error);
    throw error;
  }
}

export async function deleteSermon(id: string): Promise<void> {
  try {
    await sql`DELETE FROM sermons WHERE id = ${id}`;
    console.log('Sermon deleted successfully:', id);
  } catch (error) {
    console.error('Error deleting sermon:', error);
    throw error;
  }
}
