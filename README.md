# RealEstate Client

Angular frontend for the RealEstate property marketplace. The application provides public property discovery, customer booking workflows, role-based dashboards, authentication, and responsive dark-mode styling with Tailwind CSS.

## Requirements

- Node.js 20 or newer
- npm 10 or newer
- The RealEstate API running locally or available at the configured API URL

The API project is located in the sibling `server` directory. See [server/README.md](../server/README.md) for backend setup and endpoint documentation.

## Setup

Install dependencies from the client directory:

```bash
npm install
```

The API URL and Google client ID are configured in:

- `src/environments/environment.development.ts` for development builds
- `src/environments/environment.ts` for production builds

Default local configuration:

```ts
apiBaseUrl: 'http://localhost:5000/api/v1';
```

Do not commit private credentials or replace production configuration with development credentials.

## Development

Start the Angular development server:

```bash
npm start
```

Open `http://localhost:4200`. The development build includes source maps and automatically reloads when source files change.

## Scripts

| Command                    | Description                                              |
| -------------------------- | -------------------------------------------------------- |
| `npm start`                | Start the development server                             |
| `npm run build`            | Create a production SSR build                            |
| `npm run watch`            | Rebuild continuously using the development configuration |
| `npm test`                 | Run unit tests with Angular and Vitest                   |
| `npm run serve:ssr:client` | Serve the generated SSR bundle                           |

## Production and SSR

Build the application with:

```bash
npm run build
```

The project uses Angular SSR and writes build output to `dist/client`. After a successful build, serve the generated server bundle with:

```bash
npm run serve:ssr:client
```

## Application areas

### Customer experience

- Home page with featured properties and search
- Property collection with location filters and pagination
- Property details and private viewing requests
- Customer profile management
- Booking list, booking details, and booking status flows
- Sell-a-property request form
- Contact, about, terms, and privacy pages

### Authentication

Authentication routes are lazy loaded under `/auth`:

| Route                             | Purpose                                 |
| --------------------------------- | --------------------------------------- |
| `/auth/login`                     | Email/password and Google sign-in       |
| `/auth/signup`                    | Create a customer account               |
| `/auth/forgot-password`           | Request a password reset email          |
| `/auth/reset-password?token=...`  | Choose a new password from a reset link |
| `/auth/create-password?token=...` | Create an invited agent password        |

The API stores authentication in an HTTP-only cookie. Requests that need the current session should preserve browser credentials.

### Role-based dashboards

The dashboard area is lazy loaded under `/dashboard` and supports administrator and agent workflows, including property management, agent management, statistics, revenue charts, bookings, profile information, and messaging.

### Real-time messaging

The client uses `socket.io-client` for real-time conversations with the backend Socket.IO server.

## Styling and UI

- Tailwind CSS 4 utility classes
- Class-based dark mode using the root `.dark` class
- Responsive customer and dashboard layouts
- ApexCharts for dashboard revenue visualizations
- `ngx-sonner` and `ngx-toastr` for notifications

Global styles and Tailwind setup are defined in `src/styles.css`. Shared UI is organized under `src/app/components`; page-level screens are under `src/app/pages`.

## Project structure

```text
src/
├── app/
│   ├── components/       Shared layouts and UI components
│   ├── core/             Interceptors and shared models
│   ├── data/             Local application data
│   ├── guards/           Authentication and role guards
│   ├── pages/            Customer, auth, and dashboard screens
│   ├── routes/           Lazy-loaded route definitions
│   └── services/         Auth, property, user, and API services
├── assets/               Static application assets
├── environments/         API and build environment configuration
├── main.ts               Browser entry point
├── main.server.ts        SSR entry point
└── styles.css            Tailwind and global styles
```

## Testing

Run the unit test suite with:

```bash
npm test
```

The repository does not currently define an end-to-end test runner. Add one separately if browser workflow testing is required.

## Related project

The API source is in `../server`. Run both projects during local development:

```text
Client: http://localhost:4200
API:    http://localhost:5000/api/v1
```
