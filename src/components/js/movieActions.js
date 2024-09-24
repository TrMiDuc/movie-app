import axios from 'axios';

const apiUrl = 'http://localhost:5000';

export const addToWishlist = async (movieId, type) => {
    try {
        const response = await axios.post(
            `${apiUrl}/movie/addToWishlist`,
            { movieId, type },
            { withCredentials: true }
        );
        if (response.status === 200) {
            alert('Added to Wishlist');
        }
    } catch (error) {
        console.error('Error adding to Wishlist:', error);
    }
};

export const addToFavorites = async (movieId, type) => {
    try {
        const response = await axios.post(
            `${apiUrl}/movie/addToFavorites`,
            { movieId, type },
            { withCredentials: true }
        );
        if (response.status === 200) {
            alert('Added to Favorites');
        }
    } catch (error) {
        console.error('Error adding to Favorites:', error);
    }
};

export const addToList = async (movieId, type) => {
    try {
        const response = await axios.post(
            `${apiUrl}/movie/addToList`,
            { movieId, type },
            { withCredentials: true }
        );
        if (response.status === 200) {
            alert('Added to List');
        }
    } catch (error) {
        console.error('Error adding to List:', error);
    }
};
