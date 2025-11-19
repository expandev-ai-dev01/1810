import dotenv from 'dotenv';

// Load environment variables for testing
dotenv.config({ path: '.env.test' });

// Mock console methods to keep test output clean if needed
// global.console.log = jest.fn();
