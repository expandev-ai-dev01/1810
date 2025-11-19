/*
  Functional Schema Structure
  Business logic tables and entities
*/

IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'functional')
BEGIN
  EXEC('CREATE SCHEMA [functional]');
END
GO
