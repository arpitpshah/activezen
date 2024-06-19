import { configureStore } from '@reduxjs/toolkit'
import { combineReducers  } from 'redux'
import { thunk } from 'redux-thunk';
import { userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from './reducers/userReducers'
import { workshopListReducer,workshopDetailsReducer, locationDetailsReducer, hobbyDetailsReducer } from './reducers/workshopReducers';
import { skillDetailsReducer, skillListReducer } from './reducers/skillReducers';
import communityReducer from './reducers/communitySlice';

const reducers = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    workshopList: workshopListReducer,
    workshopDetails: workshopDetailsReducer,
    locationDetails: locationDetailsReducer,
    hobbyDetails: hobbyDetailsReducer,
    skillsList: skillListReducer,
    skillDetails: skillDetailsReducer,
    community: communityReducer,
})

//const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

//const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const intialState = {
    //cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage },
    userLogin: { userInfo: userInfoFromStorage },
}

const middleware = (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)

const store=configureStore({
    reducer:reducers, 
    preloadedState:intialState,
    middleware:middleware
})


export default store