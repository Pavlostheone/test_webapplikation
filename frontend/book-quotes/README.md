# Book Quotes Web Application

Detta är ett fullstackprojekt som implementerar ett responsivt CRUD-system för att hantera en lista med böcker, med användarautentisering via JWT och en separat vy för favoritcitat. Projektet är utvecklat i Angular 18 (frontend) och .NET 8 C# Web API (backend), med tillägg av DevOps-principer som CI/CD och containerisering.

## Funktioner

- Visa lista över alla böcker
- Lägg till, redigera och ta bort böcker
- Omdirigering till startsidan efter varje operation
- JWT-baserad inloggning för autentisering
- Skydd av CRUD-endpoints så att endast inloggade användare kan ändra data
- Separat vy "Mina citat" med 5 favoritcitat
- Navigering mellan bok- och citatsidan
- Responsiv design med Bootstrap och Font Awesome
- Ljusa och mörka teman med växlingsknapp

## DevOps-tillägg

- CI/CD-pipeline via GitHub Actions som bygger och deployar både frontend och backend
- Docker-containrar för enkel utveckling och framtida molndrift
- Hosting via Netlify, Vercel eller Azure Static Web Apps/App Services

## Teknologier

- Frontend: Angular 18
- Backend: .NET 8 Web API
- CI/CD: GitHub Actions
- Containerisering: Docker
- Hosting: Netlify/Vercel/Azure
- Databas: In-memory (kan bytas mot SQLite)

## Instruktioner för utveckling

1. Klona repot
2. Installera frontend-beroenden:
cd frontend/book-quotes
npm install
ng serve

markdown
Copy
Edit
3. Kör backend-API:
cd backend/BookApi
dotnet run

markdown
Copy
Edit
4. Logga in via frontend och utför CRUD-operationer.

## Deployment

Applikationen kommer att publiceras på en gratis hostingplattform. Länkar till live-demo och GitHub kommer att anges här vid färdigställande.