## Golden Scorpion ##

## Frontend repository: https://github.com/SimonasGer/golden-scorpion
## Backend repository: https://github.com/SimonasGer/golden-backend
## Game Link: https://golden-scorpion.vercel.app

Golden Scorpion is a text-based mercenary management simulator built with the PERN stack. Players hire procedurally generated mercenaries, send them on missions with stat-based outcomes, and manage resources through a risk-reward gameplay loop. The game focuses on backend-first design.

## Version: v0.11 (MVP) ##
This is the second fully playable version. The frontend is minimal, but functional

## Backend

JWT-secured authentication system

Gold-based economy with spending and reward logic

Procedural mercenary generation with archetypes and stat ranges

Mission generation from JSON blueprints

Mission status flow: inactive → pending → success or failure

Stat-based success calculation with randomized elements

Mercenary injuries and deaths based on mission outcome

PostgreSQL database on Neon

## Frontend (Work in progress)

Basic mercenary and mission displays

Early structure for future UI improvements

## Tech Stack ##

Frontend: React

Backend: Express.js (Node.js)

Database: PostgreSQL + Neon

Authentication: JWT

## How It Works ##

Register or Log In

Hire mercenaries (each has random stats and a price)

Fetch a mission and accept it (status becomes pending)

Assign mercs to the mission

Resolve the mission:

Success if team stats match/exceed mission requirements

Failure if not; mercs may be injured or die

Collect gold (on success), fire, heal, or bury survivors, repeat

## Planned Features ##

Complete UI and UX overhaul

Missions with multiple stages, choices, and outcomes

Mercenary personality traits, relationships, and background logs

Equipment and leveling system

Expanded mission variety and events

## Developer Notes ##

This project was developed solo  as a proof-of-concept for a system-driven game loop with persistent data, procedural generation, and basic game economy. Backend logic is clean, secure, and production-ready but will change considerably. Frontend will evolve in future versions.