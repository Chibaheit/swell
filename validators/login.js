import is from 'is_js'
import _ from 'lodash'

export default function validate(values) {
  const errors = {}
  if (!values.email || !_.isString(values.email)) {
    errors.email = 'Required'
  }
  if (!values.password || !_.isString(values.password)) {
    errors.password = 'Required'
  }
  return errors
}
