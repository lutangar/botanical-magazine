import { createStore } from 'redux';
import initialState from '../../../database.js';

export default createStore((state, action) => state, initialState);