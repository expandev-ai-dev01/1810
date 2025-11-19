/*
  Security Schema Structure
  Authentication and authorization tables
*/

IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'security')
BEGIN
  EXEC('CREATE SCHEMA [security]');
END
GO
