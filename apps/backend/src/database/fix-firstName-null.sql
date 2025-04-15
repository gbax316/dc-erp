-- First, check if any records have null firstName and update them with fallback values
UPDATE users SET 
  firstName = 'User' 
WHERE firstName IS NULL;

-- Then alter the column to disallow nulls after all records have been fixed
ALTER TABLE users
ALTER COLUMN firstName SET NOT NULL; 