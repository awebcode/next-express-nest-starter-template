-- AlterTable
ALTER TABLE "User" ALTER COLUMN "providerId" DROP NOT NULL,
ALTER COLUMN "providerId" SET DEFAULT 'credential';
