import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartRedux";
import userReducer from "./userRedux";
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
    key: "root",
    storage,
  };

const persistedReducer = persistReducer(persistConfig, userReducer);


export default configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
});



// import { createStore } from "redux";
// import counterReducer from "../store/reducers/reducers";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, counterReducer);

// export default () => {
//   let store = createStore(persistedReducer);
//   let persistor = persistStore(store);
//   return { store, persistor };
// };


// export let persistor = persistStore(store)