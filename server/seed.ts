import { db } from './db';
import { courses } from '@shared/schema';

async function seedCourses() {
  try {
    console.log('Checking for existing courses...');
    const existingCourses = await db.select().from(courses);
    console.log('Existing courses:', existingCourses.length);
    
    if (existingCourses.length === 0) {
      console.log('Adding seed courses...');
      const initialCourses = [
        {
          name: 'Beginner English',
          description: 'Build a strong foundation in English grammar, vocabulary, and basic conversation.',
          duration: '12 weeks',
          sessionsPerWeek: 2,
          level: 'Beginner'
        },
        {
          name: 'Intermediate English',
          description: 'Enhance your English skills with advanced grammar and fluent conversation practice.',
          duration: '16 weeks',
          sessionsPerWeek: 2,
          level: 'Intermediate'
        },
        {
          name: 'Business English',
          description: 'Master professional English for the workplace, including presentations and correspondence.',
          duration: '10 weeks',
          sessionsPerWeek: 3,
          level: 'Advanced'
        }
      ];
      
      for (const course of initialCourses) {
        await db.insert(courses).values(course);
      }
      
      console.log('Seed courses added successfully');
    } else {
      console.log('Courses already exist. Skipping seed data.');
    }
  } catch (error) {
    console.error('Error adding seed courses:', error);
  }
}

// Run the seed function
seedCourses()
  .then(() => {
    console.log('Seeding completed');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Seeding failed:', err);
    process.exit(1);
  });