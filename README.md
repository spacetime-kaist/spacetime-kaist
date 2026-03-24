# Spacetime Lab


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# How to Upload

Basically, the upload data are in *src/uploads* folder and the upload photos in *public* folders

When adding data, one needs to use just add like the other dictionary(Object in JS) members in a list.

Below is the explanation of the key values for each data.

## PeopleData

Comprised of professorData, labMembersData, aluminiData in one file.
**professorData** has research key where you can write freely in Markdown format.
**labMembersData** "id": best if in student number for uniqueness. Match with the name of the photo.

## ResearchData

Composed of all Research Data.
The total list holds all main research sections with the related research articles under the key 'research'.
'id': used for slug or identification of the section.
'title': title in Research Detail Page.
'menuTitle': title used for the navigation bar menu above.
'thumbnail': representative image for Research Main Page.
'desc': explanation of research section.
    'research':list of researches under the research section
      {
        title:'title of research article
        date: '~ October 2025',
        hyperlink: link to external, will be shown under the words and before pictures.
        desc: 
`Markdown format. Write Freely.`
      }