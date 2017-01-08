import {combineReducers} from 'redux'
import visibilityFilter from './visibilityFilter'
import walletData from './walletData'
import itemData from './itemData'
import apiKey from './apiKey'
import status from './status'

const todoApp = combineReducers({visibilityFilter, itemData, walletData, apiKey, status})

export default todoApp
