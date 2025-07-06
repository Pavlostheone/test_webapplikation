# BookApp – Fullstack Bokhanteringsapplikation

BookApp är en fullstack webbapplikation byggd som en testuppgift för att visa praktisk kunskap inom moderna webbutvecklingstekniker. Applikationen låter användare logga in och hantera en lista med böcker, inklusive att läsa, uppdatera och radera poster.

## Funktioner

- **Frontend**: Angular 18, responsiv design, JWT-autentisering, och CRUD-funktionalitet.
- **Backend**: .NET 8 Web API med JWT-baserad autentisering.
- **Hosting**:
  - Frontend är hostad på Netlify.
  - Backend är distribuerad till Azure App Service.
- **CORS**: Konfigurerad för säker kommunikation mellan Netlify och Azure.
- **JWT**: Användare måste logga in med användarnamn och lösenord (admin/password) för att få en token, som sedan krävs för att göra autentiserade API-anrop.
- **Swagger**: Tillgängligt via Azure-backenden för att dokumentera API-endpoints.

## Inloggningsuppgifter för test

https://zingy-kheer-9240ae.netlify.app

- Användarnamn: `admin`
- Lösenord: `password`

## Projektstruktur

- `/book-app`: Angular-applikationen.
- `/backend/bookApi`: .NET-backend med AuthController och endpoints för att hantera böcker.

## Bygga och köra lokalt

### Krav

- Node.js och npm (för frontend)
- .NET 8 SDK (för backend)
- Git

### 1. Klona projektet

```bash
      git clone <repo-url>
      cd test_webapplikation

2. Installera beroenden och kör frontend
bash
Copy
Edit
cd book-app
npm install
ng serve

3. Bygg och kör backend
I en ny terminal, navigera till backend-katalogen och kör:

bash
Copy
Edit
cd backend/bookApi
dotnet restore
dotnet run

4. Logga in
Öppna Angular-frontend i din webbläsare, gå till inloggningssidan och använd:

Användarnamn: admin

Lösenord: password

När du loggat in kan du utföra CRUD-operationer på böckerna.

Deployment
Netlify använder bygda artifacts från Angulars dist/book-app-katalog.

Backend deployas till Azure App Service med az webapp deploy.

Viktiga tekniker
Angular

.NET 8 Web API

JWT

Azure App Service

Netlify
