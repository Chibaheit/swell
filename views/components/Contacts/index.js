import React from 'react'
import { connect } from 'react-redux'
import Icon from 'react-fontawesome'
import UserCard from '../UserCard'
import classNames from 'classnames'
import Input from '../Input'

import { searchUser, saveSearch, clearSearch, addFriend } from '../../redux/modules/panel'
import styles from './styles'

@connect(
  state => ({
    users: state.panel.users,
    selectedUser: state.panel.selectedUser
  }),
  dispatch => ({
    searchUser: q => dispatch(searchUser(q)),
    saveSearch: q => dispatch(saveSearch(q)),
    clearSearch: () => dispatch(clearSearch()),
    handleCardClick: q => dispatch(addFriend(q))
  })
)
class Contacts extends React.Component {
  search: null
  state = { value: '' }
  handleChange = ({ target: { value }}) => {
    const {
      searchUser, saveSearch, clearSearch
    } = this.props
    if (this.search) {
      clearTimeout(this.search)
    }
    this.setState({ value })
    if (value) {
      this.search = setTimeout(() => {
        saveSearch(value.toLowerCase())
        searchUser(value)
      }, 500)
    } else {
      clearSearch()
    }
  }
  render() {
    const {
      users, handleCardClick, selectedUser
    } = this.props
    return (
      <div>
        <div className={styles.inputWrapper}>
          <input autoComplete="off" spellCheck={false} {...this.props}
            className={styles.input}
            placeholder="Search for username"
            value={this.state.value}
            onChange={this.handleChange} />
        </div>
        <div className={styles.cardlist}>
          { users &&
            users.map(_ => (
              <UserCard key={_._id}
                        id={_._id}
                        username={_.username}
                        onClick={handleCardClick} />
            ))
          }
        </div>
        <div className={classNames(styles.mask, {
          [styles.maskHide]: !selectedUser
        })}>
          <div>
            <div>New Group</div>
            <Input placeholder="Email" type="text" />
          </div>
        </div>
      </div>
    )
  }
}

export default Contacts
