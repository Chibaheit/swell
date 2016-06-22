const ACTIVE_CONTACTS = 'sweely/panel/ACTIVE_CONTACTS'
const ACTIVE_CHATS = 'sweely/panel/ACTIVE_CHATS'
const ACTIVE_SETTINGS = 'sweely/panel/ACTIVE_SETTINGS'

const SEARCH_USER = 'sweely/panel/SEARCH_USER'
const SEARCH_USER_SUCCESS = 'sweely/panel/SEARCH_USER_SUCCESS'
const SEARCH_USER_FAIL = 'sweely/panel/SEARCH_USER_FAIL'

const SAVE_SEARCH = 'sweely/panel/SAVE_SEARCH'
const CLEAR_SEARCH = 'sweely/panel/CLEAR_SEARCH'

const ADD_FRIEND = 'sweely/panel/ADD_FRIEND'

const initialState = {
  activeTab: 'Chats',
  activePanel: 'Panel',
}

export const activeContacts = () => ({
  type: ACTIVE_CONTACTS
})

export const activeChats = () => ({
  type: ACTIVE_CHATS
})

export const activeSettings = () => ({
  type: ACTIVE_SETTINGS
})

export const saveSearch = q => ({
  type: SAVE_SEARCH,
  q: q
})

export const clearSearch = () => ({
  type: CLEAR_SEARCH
})

export const searchUser = q => ({
  types: [SEARCH_USER, SEARCH_USER_SUCCESS, SEARCH_USER_FAIL],
  promise: c => c.get('/api/user/search', { q })
})

export const addFriend = q => ({
  type: ADD_FRIEND,
  q: q
})

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTIVE_CONTACTS:
      return {
        ...state,
        activeTab: 'Contacts'
      }
    case ACTIVE_CHATS:
      return {
        ...state,
        activeTab: 'Chats'
      }
    case ACTIVE_SETTINGS:
      return {
        ...state,
        activeTab: 'Settings'
      }
    case SEARCH_USER_SUCCESS:
      return {
        ...state,
        users: action.result.users
      }
    case SAVE_SEARCH:
      return {
        ...state,
        searchData: action.q
      }
    case CLEAR_SEARCH:
      return {
        ...state,
        searchData: null,
        users: null
      }
    case ADD_FRIEND:
      return {
        ...state,
        selectedUser: action.q
      }
    default:
      return state
  }
}
