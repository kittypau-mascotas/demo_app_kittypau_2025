We must continue the KittyPau project with the following NON-NEGOTIABLE constraints.

ARCHITECTURE (DO NOT CHANGE):
- Frontend: React (Vite) deployed on Vercel
- Backend API: Express deployed on Vercel
- Database: Neon PostgreSQL (Drizzle ORM)
- Authentication: Neon Auth (cookie-based)
- IoT Bridge: Separate Node.js process (NOT deployed on Vercel)
- MQTT: Only in the external bridge (never in Vercel)

CRITICAL RULES:
1. The backend API MUST ALWAYS return JSON.
   - No redirects.
   - No HTML responses.
   - Authentication failures MUST return HTTP 401 only.

2. Authentication flow:
   - `/api/me` returns:
     - 200 + user JSON when authenticated
     - 401 JSON when not authenticated
   - The FRONTEND (AuthContext) handles redirects and login UI.
   - `requireNeonAuth` MUST NOT redirect to Neon Auth URLs.

3. Frontend behavior:
   - AuthContext fetches `/api/me` on load.
   - On 401, frontend shows login flow.
   - TanStack Query must not break.
   - Existing mockup, styles, layouts, and charts MUST NOT be changed.

4. Multi-tenancy & security:
   - All API routes under `/api/*` must enforce user ownership.
   - Queries MUST filter by the authenticated user.
   - Devices, pets, readings, and events must only be accessible by their owner.

5. Data model relationships (DO NOT redesign):
   - User → Devices
   - User → Pets
   - Device → SensorReadings
   - Device → DeviceEvents
   - Pets may optionally reference a device

WHAT TO DO NEXT:
- Keep the MQTT bridge separated (already done).
- DO NOT modify frontend UI or styles.
- Verify and fix backend authentication logic if needed (JSON only).
- Ensure `/api/me` works correctly with Neon Auth cookies.
- Ensure frontend → backend → Neon DB flow works:
  - User login
  - User session persistence
  - Fetching pets, devices, and readings
- Only propose changes that are strictly necessary and safe.

If a change risks breaking SPA behavior, TanStack Query, charts, or the mockup, DO NOT apply it.
Explain instead.

Proceed step by step and justify each change technically.
