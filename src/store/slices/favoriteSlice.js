import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
    name: "favorites",
    initialState: {
        favorite: [] // Store favorite movies here
    },
    reducers: {
        addFavorite: (state, action) => {
            const movie = action.payload;
            if (!state.favorite.some(m => m.id === movie.id)) {
                state.favorite.push(movie);
            }
        },
        removeFavorite: (state, action) => {
            const movieId = action.payload;
            state.favorite = state.favorite.filter(m => m.id !== movieId);
        }
    }
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
