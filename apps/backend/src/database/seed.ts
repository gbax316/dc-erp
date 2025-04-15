import * as bcrypt from 'bcrypt';
import dataSource from './data-source';
import { UserRole } from '../user/entities/user.entity';
import { User } from '../user/entities/user.entity';
import { Church } from '../church/entities/church.entity';

async function seed() {
  try {
    // Initialize the database connection
    await dataSource.initialize();
    console.log('Connected to database');

    // Create default church
    const defaultChurch = new Church();
    defaultChurch.name = 'Dominion City Headquarters';
    defaultChurch.address = '123 Faith Avenue';
    defaultChurch.city = 'Lagos';
    defaultChurch.state = 'Lagos';
    defaultChurch.country = 'Nigeria';
    defaultChurch.postalCode = '100001';
    defaultChurch.phone = '+2341234567890';
    defaultChurch.email = 'info@dominioncity.org';
    defaultChurch.description = 'The headquarters of Dominion City Church';
    defaultChurch.website = 'https://dominioncity.org';
    defaultChurch.foundedDate = new Date('1995-01-01');
    defaultChurch.denomination = 'Pentecostal';

    const savedChurch = await dataSource.manager.save(defaultChurch);
    console.log('Default church created:', savedChurch.name);

    // Create admin user
    const adminUser = new User();
    adminUser.firstName = 'Admin';
    adminUser.lastName = 'User';
    adminUser.email = 'admin@dominioncity.org';
    adminUser.phone = '+2341234567890';
    adminUser.role = UserRole.SUPER_ADMIN;
    adminUser.isEmailVerified = true;
    adminUser.password = 'Admin123!';

    const savedUser = await dataSource.manager.save(adminUser);
    console.log('Admin user created:', savedUser.email);

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the database connection
    if (dataSource.isInitialized) {
      await dataSource.destroy();
      console.log('Database connection closed');
    }
  }
}

// Execute the seed function
seed(); 