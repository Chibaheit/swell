import React from 'react'
import Title from 'react-document-title'

import FullPage from '../components/FullPage'
import TotalForm from '../components/TotalForm'

import styles from './styles'

class LoginPage extends React.Component {
  render() {
    return (
      <Title title="Log in | Sweely">
        <FullPage>
          <div className={styles.wrapper}>
            <TotalForm />
          </div>
        </FullPage>
      </Title>
    )
  }
}

export default LoginPage
