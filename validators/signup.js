import is from 'is_js'
import _ from 'lodash'

export default function validate(values) {
  const errors = {}
  if (!values.email || !_.isString(values.email)) {
    errors.email = 'Required'
  } else if (!is.email(values.email)) {
    errors.email = 'Invalid address'
  }
  if (!values.username || !_.isString(values.username)) {
    errors.username = 'Required'
  }
  if (!values.password || !_.isString(values.password)) {
    errors.password = 'Required'
  }
  return errors
}
