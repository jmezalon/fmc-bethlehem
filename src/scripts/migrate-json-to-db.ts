#!/usr/bin/env tsx

import { readFileSync } from 'fs';
import { join } from 'path';
import { initDatabase, createEvent, createGroup, createSermon } from '../lib/database';
import type { Event, Group, Sermon } from '../lib/database';

async function migrateData() {
  console.log('🚀 Starting data migration from JSON files to database...');
  
  try {
    // Initialize database tables
    console.log('📋 Initializing database tables...');
    await initDatabase();
    
    // Get the project root directory
    const projectRoot = join(process.cwd());
    
    // Migrate Events
    console.log('📅 Migrating events...');
    const eventsPath = join(projectRoot, 'data', 'events.json');
    const eventsData = JSON.parse(readFileSync(eventsPath, 'utf-8')) as Event[];
    
    for (const event of eventsData) {
      try {
        await createEvent(event);
        console.log(`✅ Migrated event: ${event.title.en}`);
      } catch (error) {
        console.log(`⚠️  Event ${event.title.en} may already exist, skipping...`);
      }
    }
    
    // Migrate Groups
    console.log('👥 Migrating groups...');
    const groupsPath = join(projectRoot, 'data', 'groups.json');
    const groupsData = JSON.parse(readFileSync(groupsPath, 'utf-8')) as Group[];
    
    for (const group of groupsData) {
      try {
        await createGroup(group);
        console.log(`✅ Migrated group: ${group.name.en}`);
      } catch (error) {
        console.log(`⚠️  Group ${group.name.en} may already exist, skipping...`);
      }
    }
    
    // Migrate Sermons
    console.log('🎤 Migrating sermons...');
    const sermonsPath = join(projectRoot, 'data', 'sermons.json');
    const sermonsData = JSON.parse(readFileSync(sermonsPath, 'utf-8')) as Sermon[];
    
    for (const sermon of sermonsData) {
      try {
        await createSermon(sermon);
        console.log(`✅ Migrated sermon: ${sermon.title.en}`);
      } catch (error) {
        console.log(`⚠️  Sermon ${sermon.title.en} may already exist, skipping...`);
      }
    }
    
    console.log('🎉 Data migration completed successfully!');
    console.log(`📊 Migration summary:`);
    console.log(`   - Events: ${eventsData.length} items`);
    console.log(`   - Groups: ${groupsData.length} items`);
    console.log(`   - Sermons: ${sermonsData.length} items`);
    
  } catch (error) {
    console.error('❌ Error during migration:', error);
    process.exit(1);
  }
}

// Run the migration
migrateData().then(() => {
  console.log('✨ Migration script completed');
  process.exit(0);
}).catch((error) => {
  console.error('💥 Migration failed:', error);
  process.exit(1);
});
