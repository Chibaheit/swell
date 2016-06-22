import React from 'react'
import Icon from 'react-fontawesome'
import classNames from 'classnames'
import { connect } from 'react-redux'

import Contacts from '../Contacts'
import ChatsList from '../ChatsList'
import Settings from '../Settings'

import { activeContacts, activeChats, activeSettings } from '../../redux/modules/panel'

import styles from './styles'

@connect(
  state => ({
    activeTab: state.panel.activeTab
  }),
  dispatch => ({
    activeContacts: () => dispatch(activeContacts()),
    activeChats: () => dispatch(activeChats()),
    activeSettings: () => dispatch(activeSettings())
  })
)
class Panel extends React.Component {
  render() {
    const {
      activeTab, activeContacts, activeChats, activeSettings
    } = this.props
    return (
      <div className={styles.wrapper}>
        <div className={styles.wrapper}>
          { activeTab === 'Contacts' && <Contacts /> }
          { activeTab === 'Chats' && <ChatsList /> }
          { activeTab === 'Settings' && <Settings /> }
        </div>
        <div className={styles.tabbar}>
          <a className={styles.tabbarItem}>
            <Icon name="user" className={styles.icon}/>
            <span className={classNames(styles.label, {
              [styles.selected]: activeTab === 'Contacts'
            })} onClick={activeContacts}>
              Contacts
            </span>
          </a>
          <a className={styles.tabbarItem}>
            <Icon name="wechat" className={styles.icon} />
            <span className={classNames(styles.label, {
              [styles.selected]: activeTab === 'Chats'
            })} onClick={activeChats}>
              Chats
            </span>
          </a>
          <a className={styles.tabbarItem}>
            <Icon name="gear" className={styles.icon} />
            <span className={classNames(styles.label, {
              [styles.selected]: activeTab === 'Settings'
            })} onClick={activeSettings}>
              Settings
            </span>
          </a>
        </div>
      </div>
    )
  }
}

export default Panel
