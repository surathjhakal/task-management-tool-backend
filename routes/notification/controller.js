const notificationTemplateCopy = require('../../models/NotificationSchema')

exports.createNotification = (req, res) => {
  const createdNotification = new notificationTemplateCopy(req.body)
  createdNotification
    .save()
    .then((data) => {
      res.json(data)
    })
    .catch((error) => {
      res.json(error)
    })
}

exports.deleteNotification = (req, res) => {
  const { uuid } = req.params
  notificationTemplateCopy
    .findByIdAndRemove({ uuid: uuid })
    .then((data) => {
      if (data) {
        res.send({ message: 'Successfully deleted notification' })
      }
    })
    .catch((error) => res.send(error))
}

exports.getNotifications = (req, res) => {
  const { user } = req.params
  notificationTemplateCopy
    .find({ user: user })
    .then((data) => {
      if (data) {
        res.json(data)
      }
    })
    .catch((error) => res.send(error))
}
