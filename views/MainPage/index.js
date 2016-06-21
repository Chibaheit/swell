import React from 'react'
import Title from 'react-document-title'

import FullPage from '../components/FullPage'

import styles from './styles'

class MainPage extends React.Component {
  render() {
    return (
      <Title title="Sweely">
        <FullPage>
          Test
        </FullPage>
      </Title>
    )
  }
}

export default MainPage
