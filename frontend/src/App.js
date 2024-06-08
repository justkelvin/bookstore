import './App.css';

import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Container, Typography, Grid, styled } from '@mui/material';
import SearchBar from './components/SearchBar';
import Navbar from './components/NavBar';
import BookList from './components/BookList';
import BookItem from './components/BookItem';
import BookResult from './components/BookResult';
import { GET_BOOKS } from './graphql/queries';
import Hero from './components/Hero';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

const StyledSearchBox = styled(Box)`
  position: relative;
  width: 100%;
`;

const StyledSearchResults = styled(Box)`
  position: absolute;
  top: 100%;
  left: 0;
  width: auto;
  max-width: 100%;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;


const App = () => {
  const [readingList, setReadingList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { loading, error, data } = useQuery(GET_BOOKS);
  const notify = (message) => toast.success(message);

  const addBookToReadingList = (book) => {
    setReadingList([...readingList, book]);
  };

  const removeBookFromReadingList = (bookToRemove) => {
    setReadingList(
      readingList.filter((book) => book.title !== bookToRemove.title)
    );
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm) {
        const filteredBooks = data.books.filter((book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filteredBooks);
      } else {
        setSearchResults([]);
      }
    }, 10);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container maxWidth="mx">
      <Toaster />
      <Navbar />
      <Box display="flex" mt={2}>
        <Grid container spacing={8}>
          <Grid item xs={12} md={9}>
            {/* <SearchBar books={data.books} /> */}
            <StyledSearchBox>
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
              {searchResults.length > 0 && (
                <StyledSearchResults>
                  <BookResult
                    books={searchResults}
                    onAdd={addBookToReadingList}
                    notify={notify}
                  />
                </StyledSearchResults>
              )}
            </StyledSearchBox>
            <Hero />
            <Typography variant="h6" gutterBottom>
              Find Available Books
            </Typography>
            <Grid container spacing={4}>
              {data.books.map((book) => (
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
