# Technical Skills Challenge

This repository contains my approach into the technical challenge passed by South Geeks.

## Setup instructions

Both applications (frontend and backend) must be running in order to receive the expected results. I'll explain first 

#### Running the backend
- using your favorite terminal application, navigate to the backend directory:
`cd backend`
- install all dependencies on npm or yarn
`npm install`
- start the application
`npm start`

#### Running the frontend
- using your favorite terminal application, navigate to the frontend directory:
`cd frontend`
- install all dependencies on npm or yarn
`npm install`
- start the application
`npm run dev`

#### Opening the application

Now open your browser of preference and browse the address http://localhost:3000. The application page will load. Now navigate through the menu to the Users page, which contains all functionality related to this challenge.

## The solution

The solution was designed taking into account componentization, code reutilization, responsability delegation and modularity. All backend code was tailored into smaller methods and components, each one with its own responsability. In order to treat the request payloads, a middleware was developed to parse all data, before moving into the routers, which called the respective actions, whic then populated the models and called the database services. As specified in the challenge's requirements, all data is being saved and read into a firebase database.
The frontend code followed the same approach, dividing everything into smaller components for reutilization. Components managed their own states, and other states were managed by redux to avoid property drilling.

## Feature list

- Responsive design
- Rest API for users manipulation (Create, Read, Update and Delete through http POST, GET, PUT and DELETE methods)
- Form validation
- Input mask for zip codes
- Invalid zip code handling
- Confirmation modal for user deletion
- Form populated on edit
- Informative messages after adding and editing users
- Loading messages for api calls
- Skeleton layout for user listing

## Testing

During development and at the time of writing these document, all installation steps and application routes were tested. Also, invalid data was inputed, to ensure no crashes would occur.

## Conclusion

Though a small project, all architecture was planned considering expansion and possible development of new features and modules. If you have any doubts, please contact me and I'll gladly help in any possible way.