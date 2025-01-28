import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import { persistReducer } from 'redux-persist'; // Fixed typo: "persistReducer" (not "presistReducer")
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore'; // This is correct

// Combine your reducers
const rootReducer = combineReducers({ user: userReducer });

// Persist configuration
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

// Wrap the root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable serializable checks for redux-persist
        }),
});

// Create the persistor
export const persistor = persistStore(store);
