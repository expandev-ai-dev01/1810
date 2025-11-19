/*
  Config Schema Structure
  System-wide settings and configurations
*/

IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'config')
BEGIN
  EXEC('CREATE SCHEMA [config]');
END
GO
