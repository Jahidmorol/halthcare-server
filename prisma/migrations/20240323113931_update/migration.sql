-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'PATIENT',
ALTER COLUMN "needPasswordChange" SET DEFAULT false,
ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
