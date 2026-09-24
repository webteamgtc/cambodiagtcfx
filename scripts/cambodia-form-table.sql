-- Run against the googlecampaign database (DB_DATABASE in .env.local).
-- Table name matches default CAMBODIA_FORM_TABLE=cambodia-form

IF NOT EXISTS (
  SELECT 1 FROM sys.tables WHERE name = N'cambodia-form'
)
BEGIN
  CREATE TABLE [cambodia-form] (
    id INT IDENTITY(1, 1) NOT NULL PRIMARY KEY,
    application_reference NVARCHAR(100) NOT NULL,
    email NVARCHAR(255) NOT NULL,
    full_name NVARCHAR(255) NULL,
    phone NVARCHAR(64) NULL,
    locale NVARCHAR(32) NULL,
    form_data NVARCHAR(MAX) NOT NULL,
    created_at DATETIME2 NOT NULL CONSTRAINT DF_cambodia_form_created_at DEFAULT (SYSUTCDATETIME())
  );

  CREATE INDEX IX_cambodia_form_email ON [cambodia-form] (email);
  CREATE INDEX IX_cambodia_form_reference ON [cambodia-form] (application_reference);
END;
