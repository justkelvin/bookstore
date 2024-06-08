 ![svgviewer-output](https://github.com/ElloTechnology/backend_takehome/assets/3518127/561bc8d4-bffc-4360-b9ea-61e876bcec93)


# Ello Engineering Challenge

[Original README file](https://github.com/justkelvin/fullstack-test-ello)

## Challenge

The view should have the following features:-

1. A search bar that allows users to search for books by title.
2. A list of search results that displays the book title, author, and a button to add the book to the students reading list.
3. A reading list that displays all the books that the teacher has added.
4. A button to remove a book from the reading list.

You can build this view without the concept of a "student" and just have a single reading list for the teacher.

# How to setup

### Backend
To get access to data that you will use for this challenge you can switch into the `<project_folder>backend/` folder and run

```bash
npm install
```

Then run the following command to start the server

```bash
npm start
```

This start a Graphql server at the url [http://localhost:4000](http://localhost:4000), the server has a single query `books` that returns a list of books. 

### Frontend

This will start the front end at [http://localhost:3000](http://localhost:3000)

```bash
  cd frontend
  npm install
  npm start
```

### Requirements
- Use React as the frontend framework.
- Showcase the use of React hooks.
- Use [material-ui](https://mui.com/material-ui/) as the component library.
- Write your code in the `src/frontend` directory.
- Create components as you feel is best suited for your solution
<img width="1013" alt="Screenshot 2024-05-15 at 19 10 51" src="https://github.com/ElloTechnology/fullstack-take-home-test/assets/3518127/bc3eb7f7-489f-4304-93f4-032bbbd38c58">
