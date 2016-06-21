import React from 'react'
import { reduxForm } from 'redux-form'

import validate from '../../../validators/signup'
import { signup } from '../../redux/modules/user'

import styles from './styles'

import Input from '../Input'
import Button from '../Button'

@reduxForm({
  form: 'SignupForm',
  fields: [ 'email', 'password', 'username'],
  validate
}, undefined, {
  onSubmit: data => signup(data)
})
class SignupForm extends React.Component {
  render() {
    const {
      fields: { email, password, username },
      handleSubmit
    } = this.props
    return (
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input placeholder="Email" type="text" {...email} />
        <Input placeholder="Password" type="password" {...password} />
        <Input placeholder="Username" type="text" {...username} />
        <Button type="submit" className={styles.button} large>
          Sign up
        </Button>
      </form>
    )
  }
}

export default SignupForm
