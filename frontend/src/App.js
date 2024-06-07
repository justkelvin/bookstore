import './App.css';

import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Container, Typography, Grid } from '@mui/material';
import SearchBar from './components/SearchBar';
import Navbar from './components/NavBar';
import BookList from './components/BookList';
import BookItem from './components/BookItem';
import { GET_BOOKS } from './graphql/queries';
import Hero from './components/Hero';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';


const App = () => {
  const [readingList, setReadingList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [searchTerm, setSearchTerm] = useState('');

  const notify = (message) => toast.success(message);

  useEffect(() => {
    if (data && data.books) {
      setSearchResults(data.books);
    }
  }, [data]);

  // const handleSearch = (searchTerm) => {
  //   setSearchTerm(searchTerm);

    // const rankResults = (book) => {
    //   const titleMatch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
    //   const authorMatch = book.author.toLowerCase().includes(searchTerm.toLowerCase());
    //   let score = 0;

    //   if (titleMatch) score += 2;  // Higher score for title match
    //   if (authorMatch) score += 1; // Lower score for author match

    //   return score;
    // };
    // const filteredAndRankedResults = data.books
    //   .map(book => ({ ...book, score: rankResults(book) }))
    //   .filter(book => book.score > 0)
    //   .sort((a, b) => b.score - a.score); // Sort in descending order of score

    // setSearchResults(filteredAndRankedResults);
  // };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);

    if (searchTerm.trim() === '') {
      // If the search term is empty, reset searchResults to the original data
      setSearchResults(data.books); // No need to sort
    } else {
      // Filter the books by title (using the original data)
      const filteredBooks = data.books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Now sort the filtered results based on relevance
      const sortedResults = filteredBooks.sort((a, b) => {
        // Prioritize exact matches first
        if (a.title.toLowerCase() === searchTerm.toLowerCase()) {
          return -1; // a comes before b
        }
        if (b.title.toLowerCase() === searchTerm.toLowerCase()) {
          return 1; // b comes before a
        }

        // Sort based on the position of the search term in the title
        const aIndex = a.title.toLowerCase().indexOf(searchTerm.toLowerCase());
        const bIndex = b.title.toLowerCase().indexOf(searchTerm.toLowerCase());

        // Handle cases where the search term is not found
        if (aIndex === -1) {
          return 1; // b comes before a (a has no match)
        }
        if (bIndex === -1) {
          return -1; // a comes before b (b has no match)
        }

        return aIndex - bIndex;
      });

      setSearchResults(sortedResults);
    }
  };

  const addBookToReadingList = (book) => {
    setReadingList([...readingList, book]);
  };

  const removeBookFromReadingList = (bookToRemove) => {
    setReadingList(
      readingList.filter((book) => book.title !== bookToRemove.title)
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container maxWidth="mx">
      <Toaster />
      <Navbar />
      <Box display="flex" mt={2}>
        <Grid container spacing={8}>
          <Grid item xs={12} md={9}>
            <SearchBar onSearch={handleSearch} searchTerm={searchTerm}/>
            <Hero />
            <Typography variant="h6" gutterBottom>
              Find Available Books
            </Typography>
            <Grid container spacing={4}>
              {searchResults.map((book) => (
                <BookItem key={book.title} book={book} onAdd={addBookToReadingList} notify={notify} />
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h5" gutterBottom>
              Reading List
            </Typography>
            <BookList books={readingList} onRemove={removeBookFromReadingList} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default App;
