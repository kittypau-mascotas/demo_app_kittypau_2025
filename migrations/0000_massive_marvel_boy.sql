CREATE TYPE "public"."device_mode" AS ENUM('comedero', 'bebedero', 'collar', 'unknown');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('owner', 'carer');--> statement-breakpoint
CREATE TABLE "consumption_events" (
	"id" serial PRIMARY KEY NOT NULL,
	"device_id" integer NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL,
	"amount_grams" real NOT NULL,
	"duration_seconds" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "device_health_reports" (
	"id" serial PRIMARY KEY NOT NULL,
	"device_id" integer NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL,
	"firmware_version" text,
	"report" text NOT NULL,
	"overall_status" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "devices" (
	"id" serial PRIMARY KEY NOT NULL,
	"household_id" integer NOT NULL,
	"device_id" text NOT NULL,
	"name" text NOT NULL,
	"type" text DEFAULT 'unknown' NOT NULL,
	"mode" "device_mode" DEFAULT 'unknown' NOT NULL,
	"status" text DEFAULT 'offline' NOT NULL,
	"battery_level" integer,
	"last_update" timestamp,
	"ip_address" text,
	CONSTRAINT "devices_device_id_unique" UNIQUE("device_id")
);
--> statement-breakpoint
CREATE TABLE "households" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pets" (
	"id" serial PRIMARY KEY NOT NULL,
	"household_id" integer NOT NULL,
	"name" text NOT NULL,
	"species" text,
	"breed" text,
	"birth_date" date,
	"avatar_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pets_to_devices" (
	"pet_id" integer NOT NULL,
	"device_id" integer NOT NULL,
	CONSTRAINT "pets_to_devices_pet_id_device_id_pk" PRIMARY KEY("pet_id","device_id")
);
--> statement-breakpoint
CREATE TABLE "sensor_readings" (
	"id" serial PRIMARY KEY NOT NULL,
	"device_id" integer NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL,
	"type" text NOT NULL,
	"value" real NOT NULL,
	"unit" text
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"household_id" integer NOT NULL,
	"name" text NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"role" "user_role" DEFAULT 'carer' NOT NULL,
	"last_login" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "consumption_events" ADD CONSTRAINT "consumption_events_device_id_devices_id_fk" FOREIGN KEY ("device_id") REFERENCES "public"."devices"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "device_health_reports" ADD CONSTRAINT "device_health_reports_device_id_devices_id_fk" FOREIGN KEY ("device_id") REFERENCES "public"."devices"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "devices" ADD CONSTRAINT "devices_household_id_households_id_fk" FOREIGN KEY ("household_id") REFERENCES "public"."households"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pets" ADD CONSTRAINT "pets_household_id_households_id_fk" FOREIGN KEY ("household_id") REFERENCES "public"."households"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pets_to_devices" ADD CONSTRAINT "pets_to_devices_pet_id_pets_id_fk" FOREIGN KEY ("pet_id") REFERENCES "public"."pets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pets_to_devices" ADD CONSTRAINT "pets_to_devices_device_id_devices_id_fk" FOREIGN KEY ("device_id") REFERENCES "public"."devices"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sensor_readings" ADD CONSTRAINT "sensor_readings_device_id_devices_id_fk" FOREIGN KEY ("device_id") REFERENCES "public"."devices"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_household_id_households_id_fk" FOREIGN KEY ("household_id") REFERENCES "public"."households"("id") ON DELETE no action ON UPDATE no action;