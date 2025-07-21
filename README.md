## Golden Scorpion ##

## Frontend repository: https://github.com/SimonasGer/golden-scorpion
## Backend repository: https://github.com/SimonasGer/golden-backend
## Game Link: tba

Golden Scorpion is a text-based mercenary management simulator built with the MERN stack. Players hire procedurally generated mercenaries, send them on missions with stat-based outcomes, and manage resources through a risk-reward gameplay loop. The game focuses on backend-first design and systems-driven mechanics.

## Version: v0.1 (MVP) ##
This is the first fully playable version. While the frontend is minimal and unstyled, the core gameplay loop is fully functional via manual URL navigation and console output.

## Backend

JWT-secured authentication system

Gold-based economy with spending and reward logic

Procedural mercenary generation with archetypes and stat ranges

Mission generation from JSON blueprints

Mission status flow: inactive → pending → success or failure

Stat-based success calculation with randomized elements

Mercenary injuries and deaths based on mission outcome

MongoDB integration via Mongoose

## Frontend (Work in progress)

Basic mercenary and mission displays

Manual mission assignment and resolution via console logs

Early structure for future UI improvements

## Tech Stack ##

Frontend: React (no styling yet)

Backend: Express.js (Node.js)

Database: MongoDB + Mongoose

Authentication: JWT

## How It Works ##

Register or log in

Hire mercenaries (each has random stats and a price)

Fetch a mission and accept it (status becomes pending)

Assign mercs to the mission

Resolve the mission:

Success if team stats match/exceed mission requirements

Failure if not; mercs may be injured or die

Collect gold (on success), fire survivors, repeat

## Planned Features ##

Styled UI

Mission result summaries on frontend

Mercenary personality traits, relationships, and background logs

Equipment and leveling system

Expanded mission variety and events

## Developer Notes ##

This project was developed solo in approximately 72 hours as a proof-of-concept for a system-driven game loop with persistent data, procedural generation, and basic game economy. Backend logic is clean, secure, and production-ready. Frontend will evolve in future versions.

