import { initDatabase, createEvent, createGroup, createSermon } from '@/lib/database';
import eventsData from '../../data/events.json';
import groupsData from '../../data/groups.json';
import sermonsData from '../../data/sermons.json';

async function migrateData() {
  console.log('Starting data migration...');
  
  try {
    // Initialize database tables
    await initDatabase();
    console.log('Database initialized');

    // Migrate events
    console.log('Migrating events...');
    for (const event of eventsData) {
      try {
        await createEvent(event);
        console.log(`✓ Migrated event: ${event.title.en}`);
      } catch (error) {
        console.error(`✗ Failed to migrate event ${event.title.en}:`, error);
      }
    }

    // Migrate groups
    console.log('Migrating groups...');
    for (const group of groupsData) {
      try {
        await createGroup(group);
        console.log(`✓ Migrated group: ${group.name.en}`);
      } catch (error) {
        console.error(`✗ Failed to migrate group ${group.name.en}:`, error);
      }
    }

    // Migrate sermons
    console.log('Migrating sermons...');
    for (const sermon of sermonsData) {
      try {
        await createSermon(sermon);
        console.log(`✓ Migrated sermon: ${sermon.title.en}`);
      } catch (error) {
        console.error(`✗ Failed to migrate sermon ${sermon.title.en}:`, error);
      }
    }

    console.log('Data migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

// Run migration if this script is executed directly
if (require.main === module) {
  migrateData().then(() => {
    console.log('Migration script finished');
    process.exit(0);
  }).catch((error) => {
    console.error('Migration script failed:', error);
    process.exit(1);
  });
}

export { migrateData };
