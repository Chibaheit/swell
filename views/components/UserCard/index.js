import React from 'react'

import Avatar from '../Avatar'

import styles from './styles'

class UserCard extends React.Component {
  render() {
    return (
      <div {...this.props} className={styles.card} onClick={this.props.onClick.bind(this, this.props.id)}>
        <div className={styles.avatar}>
          <Avatar />
        </div>
        <div className={styles.username}>
          { this.props.username || ' ' }
        </div>
      </div>
    )
  }
}

export default UserCard
