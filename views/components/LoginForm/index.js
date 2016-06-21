import React from 'react'
import { reduxForm } from 'redux-form'

import validate from '../../../validators/login'
import { login } from '../../redux/modules/user'

import styles from './styles'

import Input from '../Input'
import Button from '../Button'

@reduxForm({
  form: 'LoginForm',
  fields: [ 'email', 'password'],
  validate
}, undefined, {
  onSubmit: data => login(data)
})
class LoginForm extends React.Component {
  render() {
    const {
      fields: { email, password, username },
      handleSubmit
    } = this.props
    return (
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input placeholder="Email or Username" type="text" {...email} />
        <Input placeholder="Password" type="password" {...password} />
        <Button type="submit" className={styles.button} large>
          Log in
        </Button>
      </form>
    )
  }
}

export default LoginForm
