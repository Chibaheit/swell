import { Router } from 'express'
import _ from 'lodash'

import { User } from '../models'
import validateUser from '../validators/signup'

const router = Router()

router.post('/user/signup', async (req, res) => {
  const errors = validateUser(req.body)
  if (_.isEmpty(errors)) {
    const user = await User.findOne({
      $or: [
        { email: _.toLower(req.body.email)},
        { username: _.toLower(req.body.username)}
      ]
    }).exec()
    if (user) {
      if (user.email === _.toLower(req.body.email)) {
        errors.email = 'Has been used'
      } else {
        errors.username = 'Has been used'
      }
    }
  }
  if (!_.isEmpty(errors)) {
    return res.fail(errors)
  }
  const user = new User({
    email: _.toLower(req.body.email),
    password: req.body.password,
    username: _.toLower(req.body.username)
  })
  await user.save()
  req.session.user = {
    _id: user._id,
    username: user.username
  }
  return res.success()
})

router.post('/user/login', async (req, res) => {
  if (!_.isString(req.body.email) || !_.isString(req.body.password)) {
    return res.bad()
  }
  const user = await User.findOne({
    $or: [
      { email: _.toLower(req.body.email) },
      { username: _.toLower(req.body.email) }
    ]
  }).select('username password').exec()
  const errors = {}
  if (!user) {
    errors.email = 'User doesn\'t exist'
  } else if (user.password !== req.body.password) {
    errors.password = 'Wrong password'
  }
  if (!_.isEmpty(errors)) {
    return res.fail(errors)
  }
  req.session.user = {
    _id: user._id,
    username: user.username
  }
  return res.success()
})

export default router
