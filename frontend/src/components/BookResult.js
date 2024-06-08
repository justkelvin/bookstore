import React from 'react';
import {
    Box,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Typography,
    Chip,
    IconButton,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const BookResult = ({ books, onAdd, notify }) => {
    return (
        <List>
            {books.map((book) => (
                <ListItem key={book.title} button>
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
                    <ListItemText
                        primary={book.title}
                        secondary={
                            <Box display="flex" alignItems="center">
                                <Typography variant="body2" color="text.secondary">
                                    {book.author}
                                </Typography>
                                <Chip label={book.readingLevel} color="primary" size="small" sx={{ marginLeft: 1 }} />
                            </Box>
                        }
                    />
                    <IconButton edge="end" aria-label="add" onClick={() => { onAdd(book); notify(`${book.title} added to reading list.`); }}>
                        <AddCircleOutlineIcon />
                    </IconButton>
                </ListItem>
            ))}
        </List>
    );
};

export default BookResult;