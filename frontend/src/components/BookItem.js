import React from 'react';
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    CardActions,
    Chip,
    Typography,
    IconButton,
    Grid,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const BookItem = ({ book, onAdd, notify }) => {
    const { title, author, coverPhotoURL, readingLevel } = book;

    // Construct the correct image path
    const imagePath = coverPhotoURL ? require(`../assets/${coverPhotoURL.replace('assets/', '')}`) : '';

    const handleAddToReadingList = () => {
        onAdd(book);
        notify(`${title} added to reading list.`);
    };

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardMedia
                    component="img"
                    alt={title}
                    image={imagePath}
                    sx={{
                        padding: "1em 1em 1em 1em", objectFit: "cover", borderRadius: '8px', transition: 'transform 0.2s', '&:hover': {
                            transform: 'scale(1.015)', // Increase scale on hover
                        },
                    }}
                    height="300"
                    width="300"
                />
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography gutterBottom variant="h6" component="div">
                            {title}
                        </Typography>
                        <Chip label={readingLevel} color="primary" size="medium" sx={{ borderRadius: '16px' }} />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                        {author}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Box display="flex" alignItems="center">
                        <Typography variant="body2" color="text.secondary">
                            Add to Reading List
                        </Typography>
                        <IconButton edge="end" aria-label="add" onClick={handleAddToReadingList}>
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </Box>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default BookItem;
