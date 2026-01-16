Meet the new Neon Auth - now built on Better Auth, branchable, and fully integrated within Neon
Learn more

Kittypau
Free

All OK


Upgrade

Projects
People
Billing
Integrations
Settings
Feedback
Collapse menu
Kittypau's projects

New project

Import data
Compute
42.01
CU-hrs
Storage
0.06
GB
History
0.01
GB
Network transfer
0.04
GB
Usage since Jan 5, 2026. Metrics may be delayed by an hour and are not updated for inactive projects. Learn more.
1 Project
Search...
Name
Region
Created at
Storage
Compute last active at
Branches
Integrations
kittypau_a1
AWS US East 1 (N. Virginia)	Jan 5, 2026 3:54 pm	
98.55 MB
Jan 16, 2026 12:13 pm	
4

Passwordless connect with psql:
psql -h pg.neon.tech

Kittypau
Free

kittypau_a1

All OK


Upgrade

Dashboard
Branches
Integrations
Settings

production

production
Overview
Monitoring
SQL Editor
Tables
Backup & Restore
Data Masking
Beta
Data API
Auth
Feedback
Collapse menu
Project dashboard

Connect
Share
Branches
4 / 10
Compute
42.19 / 100
CU-hrs
Storage
0.06 / 0.5
GB
Network transfer
0.04 / 5
GB
Usage since Jan 5, 2026. Metrics may be delayed by an hour and are not updated for inactive projects. Learn more.
Monitoring
View all metrics
Branch
production
Default
Compute
Primary
Active

Refresh

4 Branches
View all
Name
Primary compute
Created by
production
Default
.25 ↔ 2 CU
Active
preview/main
.25 ↔ 2 CU
Idle
development
.25 ↔ 1 CU
Idle
vercel-dev
.25 ↔ 2 CU
Idle
Preview Workflow
You don't have any preview branches yet. Improve your workflow by adding database branching to your development previews.


Install an integration
Neon Auth
Manage
Branch

production

production
Your app has 1 user!
View users
Project settings
Manage
Region	
AWS US East 1 (N. Virginia)
Default compute size	.25 ↔ 2 CU
History retention	6 hours
Postgres version
17
Kittypau
Free

kittypau_a1

All OK


Upgrade

Dashboard
Branches
Integrations
Settings

production

production
Overview
Monitoring
SQL Editor
Tables
Backup & Restore
Data Masking
Beta
Data API
Auth
Feedback
Collapse menu
4 Branches

New Branch 4/10
Instantly branch your data to deliver faster, safer experimentation, and more reliable CI/CD processes. Learn more.
Branches
4 / 10
Compute
42.19 / 100
CU-hrs
Storage
0.06 / 0.5
GB
Network transfer
0.04 / 5
GB
Usage since Jan 5, 2026. Metrics may be delayed by an hour and are not updated for inactive projects. Learn more.
Search...
Branch
Parent
Compute
Primary compute
Storage
Created by
Compute last active
production
Default
-
41.38 CU-hrs	
.25 ↔ 2 CU
Active
53.98 MB
Kittypau
now	
development
production
0.15 CU-hrs	
.25 ↔ 1 CU
Idle
539.88 kB
Kittypau
Jan 10, 2026 1:28 am	
preview/main
production
0.5 CU-hrs	
.25 ↔ 2 CU
Idle
631.97 kB
Vercel
Jan 10, 2026 2:21 am	
vercel-dev
production
0.15 CU-hrs	
.25 ↔ 2 CU
Idle
476.88 kB
Vercel
Jan 10, 2026 1:27 am	
Kittypau
Free

kittypau_a1

All OK


Upgrade

Dashboard
Branches
Integrations
Settings

production

production
Overview
Monitoring
SQL Editor
Tables
Backup & Restore
Data Masking
Beta
Data API
Auth
Feedback
Collapse menu
Monitoring
production

Upgrade to export metrics
Metrics
Active queries
Query performance
System operations
Compute
Primary
Active
Last hour
Last day
Other

Refresh
Compute settings
Min
0.25 CU (~1 GB RAM)
Max
2 CU (~8 GB RAM)
Autosuspend delay
5 minutes (default)

Edit endpoint
RAM

CPU

Deadlocks

Rows

Kittypau
Free

kittypau_a1

All OK


Upgrade

Dashboard
Branches
Integrations
Settings

production

production
Overview
Monitoring
SQL Editor
Tables
Backup & Restore
Data Masking
Beta
Data API
Auth
Feedback
Collapse menu
SQL Editor
production

Saved
History
create auth tables for users, accounts, sessions, and verification
Jan 15, 2026 - 11:14pm
list all tables in public schema
Jan 15, 2026 - 11:09pm
current timestamp
Jan 15, 2026 - 11:08pm
hourly average humidity from telemetry data
Jan 12, 2026 - 1:49pm
temperature readings for DEVICE_001 over time
Jan 12, 2026 - 1:49pm
device telemetry averages and sample count
Jan 12, 2026 - 1:48pm
telemetry summary with device count and stat aggregations
Jan 12, 2026 - 1:48pm
\d telemetry;
Jan 11, 2026 - 12:02am
\d telemetry;
Jan 10, 2026 - 4:20am
recent telemetry and device status
Jan 10, 2026 - 2:24am
schema overview for telemetry and device_status tables
Jan 10, 2026 - 1:53am
\q
Jan 10, 2026 - 1:22am
add weight, ldr, wifi_status, and sensor_health columns
Jan 10, 2026 - 1:19am
\d telemetry
Jan 9, 2026 - 5:35pm
\d devices
Jan 9, 2026 - 5:33pm
\dt
Jan 9, 2026 - 5:32pm
create tables for IoT device monitoring and data collection
Jan 8, 2026 - 1:08pm
latest 5 telemetry readings with device info
Jan 7, 2026 - 12:59am
create telemetry table with device and timestamp indexes
Jan 7, 2026 - 12:58am
retrieve all telemetry data
Jan 7, 2026 - 12:54am
create telemetry table with device data
Jan 7, 2026 - 12:53am
Untitled

Save
Primary
Active
neondb


1
2
3
4
⌄
session_token TEXT UNIQUE NOT NULL
user_id TEXT NOT NULL
expires TIMESTAMP NOT NULL

Ready to connect

Run
CREATE SCHEMA "public";
CREATE SCHEMA "neon_auth";
CREATE TYPE "device_mode" AS ENUM('comedero', 'bebedero', 'collar', 'unknown');
CREATE TYPE "user_role" AS ENUM('owner', 'carer');
CREATE TABLE "account" (
	"id" text PRIMARY KEY,
	"user_id" text NOT NULL,
	"provider" text NOT NULL,
	"provider_account_id" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" bigint,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text
);
CREATE TABLE "consumption_events" (
	"id" serial PRIMARY KEY,
	"device_id" integer NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL,
	"amount_grams" real NOT NULL,
	"duration_seconds" integer NOT NULL
);
CREATE TABLE "device_health" (
	"id" serial PRIMARY KEY,
	"device_id" text NOT NULL,
	"sensor" text,
	"status" text,
	"code" text,
	"created_at" timestamp DEFAULT now()
);
CREATE TABLE "device_health_reports" (
	"id" serial PRIMARY KEY,
	"device_id" integer NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL,
	"firmware_version" text,
	"report" text NOT NULL,
	"overall_status" text NOT NULL
);
CREATE TABLE "device_status" (
	"id" serial PRIMARY KEY,
	"device_id" text NOT NULL,
	"state" text,
	"firmware" text,
	"uptime" integer,
	"created_at" timestamp DEFAULT now(),
	"wifi_status" text,
	"sensor_health" text
);
CREATE TABLE "devices" (
	"id" serial PRIMARY KEY,
	"household_id" integer NOT NULL,
	"device_id" text NOT NULL CONSTRAINT "devices_device_id_unique" UNIQUE,
	"name" text NOT NULL,
	"type" text DEFAULT 'unknown' NOT NULL,
	"mode" device_mode DEFAULT 'unknown' NOT NULL,
	"status" text DEFAULT 'offline' NOT NULL,
	"battery_level" integer,
	"last_update" timestamp,
	"ip_address" text
);
CREATE TABLE "households" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
CREATE TABLE "pets" (
	"id" serial PRIMARY KEY,
	"household_id" integer NOT NULL,
	"name" text NOT NULL,
	"species" text,
	"breed" text,
	"birth_date" date,
	"avatar_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
CREATE TABLE "pets_to_devices" (
	"pet_id" integer,
	"device_id" integer,
	CONSTRAINT "pets_to_devices_pet_id_device_id_pk" PRIMARY KEY("pet_id","device_id")
);
CREATE TABLE "sensor_readings" (
	"id" serial PRIMARY KEY,
	"device_id" integer NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL,
	"type" text NOT NULL,
	"value" real NOT NULL,
	"unit" text
);
CREATE TABLE "session" (
	"id" text PRIMARY KEY,
	"session_token" text NOT NULL CONSTRAINT "session_session_token_key" UNIQUE,
	"user_id" text NOT NULL,
	"expires" timestamp NOT NULL
);
CREATE TABLE "telemetry" (
	"id" serial PRIMARY KEY,
	"device_id" text NOT NULL,
	"temp" real NOT NULL,
	"hum" real NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"weight" real,
	"ldr" integer
);
CREATE TABLE "user" (
	"id" text PRIMARY KEY,
	"email" text,
	"email_verified" boolean,
	"name" text,
	"image" text,
	"created_at" timestamp DEFAULT now()
);
CREATE TABLE "users" (
	"id" serial PRIMARY KEY,
	"household_id" integer NOT NULL,
	"name" text NOT NULL,
	"username" text NOT NULL CONSTRAINT "users_username_unique" UNIQUE,
	"email" text NOT NULL CONSTRAINT "users_email_unique" UNIQUE,
	"password" text NOT NULL,
	"role" user_role DEFAULT 'carer' NOT NULL,
	"last_login" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
CREATE TABLE "verification" (
	"id" text PRIMARY KEY,
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL
);
CREATE TABLE "neon_auth"."account" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"accountId" text NOT NULL,
	"providerId" text NOT NULL,
	"userId" uuid NOT NULL,
	"accessToken" text,
	"refreshToken" text,
	"idToken" text,
	"accessTokenExpiresAt" timestamp with time zone,
	"refreshTokenExpiresAt" timestamp with time zone,
	"scope" text,
	"password" text,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
CREATE TABLE "neon_auth"."invitation" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"organizationId" uuid NOT NULL,
	"email" text NOT NULL,
	"role" text,
	"status" text NOT NULL,
	"expiresAt" timestamp with time zone NOT NULL,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"inviterId" uuid NOT NULL
);
CREATE TABLE "neon_auth"."jwks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"publicKey" text NOT NULL,
	"privateKey" text NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"expiresAt" timestamp with time zone
);
CREATE TABLE "neon_auth"."member" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"organizationId" uuid NOT NULL,
	"userId" uuid NOT NULL,
	"role" text NOT NULL,
	"createdAt" timestamp with time zone NOT NULL
);
CREATE TABLE "neon_auth"."organization" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"slug" text NOT NULL CONSTRAINT "organization_slug_key" UNIQUE,
	"logo" text,
	"createdAt" timestamp with time zone NOT NULL,
	"metadata" text
);
CREATE TABLE "neon_auth"."project_config" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"endpoint_id" text NOT NULL CONSTRAINT "project_config_endpoint_id_key" UNIQUE,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"trusted_origins" jsonb NOT NULL,
	"social_providers" jsonb NOT NULL,
	"email_provider" jsonb,
	"email_and_password" jsonb,
	"allow_localhost" boolean NOT NULL
);
CREATE TABLE "neon_auth"."session" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"expiresAt" timestamp with time zone NOT NULL,
	"token" text NOT NULL CONSTRAINT "session_token_key" UNIQUE,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"ipAddress" text,
	"userAgent" text,
	"userId" uuid NOT NULL,
	"impersonatedBy" text,
	"activeOrganizationId" text
);
CREATE TABLE "neon_auth"."user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"email" text NOT NULL CONSTRAINT "user_email_key" UNIQUE,
	"emailVerified" boolean NOT NULL,
	"image" text,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"role" text,
	"banned" boolean,
	"banReason" text,
	"banExpires" timestamp with time zone
);
CREATE TABLE "neon_auth"."verification" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expiresAt" timestamp with time zone NOT NULL,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;
ALTER TABLE "consumption_events" ADD CONSTRAINT "consumption_events_device_id_devices_id_fk" FOREIGN KEY ("device_id") REFERENCES "devices"("id");
ALTER TABLE "device_health_reports" ADD CONSTRAINT "device_health_reports_device_id_devices_id_fk" FOREIGN KEY ("device_id") REFERENCES "devices"("id");
ALTER TABLE "devices" ADD CONSTRAINT "devices_household_id_households_id_fk" FOREIGN KEY ("household_id") REFERENCES "households"("id");
ALTER TABLE "pets" ADD CONSTRAINT "pets_household_id_households_id_fk" FOREIGN KEY ("household_id") REFERENCES "households"("id");
ALTER TABLE "pets_to_devices" ADD CONSTRAINT "pets_to_devices_device_id_devices_id_fk" FOREIGN KEY ("device_id") REFERENCES "devices"("id");
ALTER TABLE "pets_to_devices" ADD CONSTRAINT "pets_to_devices_pet_id_pets_id_fk" FOREIGN KEY ("pet_id") REFERENCES "pets"("id");
ALTER TABLE "sensor_readings" ADD CONSTRAINT "sensor_readings_device_id_devices_id_fk" FOREIGN KEY ("device_id") REFERENCES "devices"("id");
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;
ALTER TABLE "users" ADD CONSTRAINT "users_household_id_households_id_fk" FOREIGN KEY ("household_id") REFERENCES "households"("id");
ALTER TABLE "neon_auth"."account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "neon_auth"."user"("id") ON DELETE CASCADE;
ALTER TABLE "neon_auth"."invitation" ADD CONSTRAINT "invitation_inviterId_fkey" FOREIGN KEY ("inviterId") REFERENCES "neon_auth"."user"("id") ON DELETE CASCADE;
ALTER TABLE "neon_auth"."invitation" ADD CONSTRAINT "invitation_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "neon_auth"."organization"("id") ON DELETE CASCADE;
ALTER TABLE "neon_auth"."member" ADD CONSTRAINT "member_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "neon_auth"."organization"("id") ON DELETE CASCADE;
ALTER TABLE "neon_auth"."member" ADD CONSTRAINT "member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "neon_auth"."user"("id") ON DELETE CASCADE;
ALTER TABLE "neon_auth"."session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "neon_auth"."user"("id") ON DELETE CASCADE;
CREATE UNIQUE INDEX "account_pkey" ON "account" ("id");
CREATE UNIQUE INDEX "consumption_events_pkey" ON "consumption_events" ("id");
CREATE UNIQUE INDEX "device_health_pkey" ON "device_health" ("id");
CREATE UNIQUE INDEX "device_health_reports_pkey" ON "device_health_reports" ("id");
CREATE UNIQUE INDEX "device_status_pkey" ON "device_status" ("id");
CREATE UNIQUE INDEX "devices_device_id_unique" ON "devices" ("device_id");
CREATE UNIQUE INDEX "devices_pkey" ON "devices" ("id");
CREATE UNIQUE INDEX "households_pkey" ON "households" ("id");
CREATE UNIQUE INDEX "pets_pkey" ON "pets" ("id");
CREATE UNIQUE INDEX "pets_to_devices_pet_id_device_id_pk" ON "pets_to_devices" ("pet_id","device_id");
CREATE UNIQUE INDEX "sensor_readings_pkey" ON "sensor_readings" ("id");
CREATE UNIQUE INDEX "session_pkey" ON "session" ("id");
CREATE UNIQUE INDEX "session_session_token_key" ON "session" ("session_token");
CREATE INDEX "idx_telemetry_created" ON "telemetry" ("created_at");
CREATE INDEX "idx_telemetry_device" ON "telemetry" ("device_id");
CREATE UNIQUE INDEX "telemetry_pkey" ON "telemetry" ("id");
CREATE UNIQUE INDEX "user_pkey" ON "user" ("id");
CREATE UNIQUE INDEX "users_email_unique" ON "users" ("email");
CREATE UNIQUE INDEX "users_pkey" ON "users" ("id");
CREATE UNIQUE INDEX "users_username_unique" ON "users" ("username");
CREATE UNIQUE INDEX "verification_pkey" ON "verification" ("id");
CREATE UNIQUE INDEX "account_pkey" ON "neon_auth"."account" ("id");
CREATE INDEX "account_userId_idx" ON "neon_auth"."account" ("userId");
CREATE INDEX "invitation_email_idx" ON "neon_auth"."invitation" ("email");
CREATE INDEX "invitation_organizationId_idx" ON "neon_auth"."invitation" ("organizationId");
CREATE UNIQUE INDEX "invitation_pkey" ON "neon_auth"."invitation" ("id");
CREATE UNIQUE INDEX "jwks_pkey" ON "neon_auth"."jwks" ("id");
CREATE INDEX "member_organizationId_idx" ON "neon_auth"."member" ("organizationId");
CREATE UNIQUE INDEX "member_pkey" ON "neon_auth"."member" ("id");
CREATE INDEX "member_userId_idx" ON "neon_auth"."member" ("userId");
CREATE UNIQUE INDEX "organization_pkey" ON "neon_auth"."organization" ("id");
CREATE UNIQUE INDEX "organization_slug_key" ON "neon_auth"."organization" ("slug");
CREATE UNIQUE INDEX "organization_slug_uidx" ON "neon_auth"."organization" ("slug");
CREATE UNIQUE INDEX "project_config_endpoint_id_key" ON "neon_auth"."project_config" ("endpoint_id");
CREATE UNIQUE INDEX "project_config_pkey" ON "neon_auth"."project_config" ("id");
CREATE UNIQUE INDEX "session_pkey" ON "neon_auth"."session" ("id");
CREATE UNIQUE INDEX "session_token_key" ON "neon_auth"."session" ("token");
CREATE INDEX "session_userId_idx" ON "neon_auth"."session" ("userId");
CREATE UNIQUE INDEX "user_email_key" ON "neon_auth"."user" ("email");
CREATE UNIQUE INDEX "user_pkey" ON "neon_auth"."user" ("id");
CREATE INDEX "verification_identifier_idx" ON "neon_auth"."verification" ("identifier");
CREATE UNIQUE INDEX "verification_pkey" ON "neon_auth"."verification" ("id");

Kittypau
Free

kittypau_a1

All OK


Upgrade

Dashboard
Branches
Integrations
Settings

production

production
Overview
Monitoring
SQL Editor
Tables
Backup & Restore
Data Masking
Beta
Data API
Auth
Feedback
Collapse menu
Tables
production

neondb

Database studio

public
Search...








































Filters


Columns


Add record

0 rows•289ms


50
0



All statements executed successfully
All statements executed successfully


idserial
household_idinteger
nametext
usernametext
emailtext
passwordtext
roleuser_role
last_logintimestamp
created_attimestamp
household
No rows
limit 50 offset 0

All OK


Upgrade

Dashboard
Branches
Integrations
Settings

production

production
Overview
Monitoring
SQL Editor
Tables
Backup & Restore
Data Masking
Beta
Data API
Auth
Feedback
Collapse menu
Auth
Beta
Serverless authentication that branches with your database. Powered by
Better Auth
Anyone on the web can sign up for your app. Support for restricted signups is coming soon.
Acknowledge and dismiss
Users
Configuration
Recent sign ups
View all 1 users

Create user
User
Last updated
Joined
Kittypau
kittypau.mascotas@gmail.com
Jan 15, 2026 1:27 am	Jan 15, 2026 1:27 am	
11
User Details

User ID
cae561a4-ac62-45f0-9cf4-891f54c42729

Email
kittypau.mascotas@gmail.com

Id
cae561a4-ac62-45f0-9cf4-891f54c42729

Name
Kittypau

Role
user

Email
kittypau.mascotas@gmail.com

Banned
false
Created At
2026-01-15T04:27:32.3+00:00

Updated At
2026-01-15T04:27:32.3+00:00

Email Verified
false

Delete user



Connect to your database

Branch
production
Default
Compute
Primary
Active
Database
neondb
Role
Reset password
neondb_owner
psql
connection string
passwordless auth

psql 'postgresql://neondb_owner:npg_iVL1xhT6ICwp@ep-polished-art-adllyxom-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'