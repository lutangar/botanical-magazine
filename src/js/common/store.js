import { createStore } from 'redux';
import initialState from '../../../database.json';

export default createStore((state, action) => state, initialState);