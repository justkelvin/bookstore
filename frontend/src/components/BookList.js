// Display book lists

import React from 'react';
import { List, ListItem, ListItemText, IconButton, ListItemAvatar, Avatar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import toast from 'react-hot-toast';

const notify = () => toast.success('Removed from reading list.');

const BookList = ({ books, onRemove }) => {
    const handleRemove = (book) => {
        onRemove(book);
        notify(); // Call notify when a book is removed
    };

    return (
        
        <List>
            {books.map((book) => (
                <ListItem key={book.title} secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => handleRemove(book)}>
                        <DeleteIcon />
                    </IconButton>
                }>
                    <ListItemAvatar>
                        <Avatar
                            alt={book.title}
                            src={
                                book.coverPhotoURL ?
                                    require(`../assets/${book.coverPhotoURL.replace('assets/', '')}`) :
                                    ''
                            }
                        />
                    </ListItemAvatar>
                    <ListItemText primary={book.title} secondary={book.author} />
                </ListItem>
            ))}
        </List>
    );
};

export default BookList;