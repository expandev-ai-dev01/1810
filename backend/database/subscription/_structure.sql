/*
  Subscription Schema Structure
  Account and tenant management
*/

IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'subscription')
BEGIN
  EXEC('CREATE SCHEMA [subscription]');
END
GO
