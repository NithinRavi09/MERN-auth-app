import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import adminReducer from './admin/adminSlice';
import { persistReducer } from 'redux-persist'; 
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';


const rootReducer = combineReducers({ user: userReducer, admin: adminReducer, });

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
            serializableCheck: false,
        }),
});

// Create the persistor
export const persistor = persistStore(store);
