import React from 'react'
import Title from 'react-document-title'
import { connect } from 'react-redux'

import FullPage from '../components/FullPage'
import Panel from '../components/Panel'
import MessageBrowser from '../components/MessageBrowser'

import styles from './styles'

@connect(
  state => ({
    activePanel: state.panel.activePanel
  })
)
class MainPage extends React.Component {
  render() {
    const {
      activePanel
    } = this.props
    return (
      <Title title="Sweely">
        <FullPage>
          <div className={styles.wrapper}>
            { activePanel === 'Panel' && <Panel />}
            { activePanel === 'Message' && <MessageBrowser />}
          </div>
        </FullPage>
      </Title>
    )
  }
}

export default MainPage
