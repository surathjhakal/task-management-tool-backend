const taskTemplateCopy = require('../../models/taskSchema')

exports.createTask = (req, res) => {
  const createTaskObj = req.body
  console.log(createTaskObj)
  const createdtask = new taskTemplateCopy(createTaskObj)

  createdtask
    .save()
    .then((data) => {
      res.json(data)
    })
    .catch((error) => {
      res.json(error)
    })
}

exports.getAllUUIDTasks = (req, res) => {
  const allTasks = req.body
  const getAllTasks = []
  const copyTasks = allTasks

  allTasks.forEach((uuid, index) => {
    taskTemplateCopy.find({ uuid: uuid }).then((data) => {
      if (data) {
        console.log(data)
        if (data.length > 0) {
          getAllTasks.push(data[0])
        }
        copyTasks.splice(index, 1)
        copyTasks.splice(index, 0, 'done')
        let count = copyTasks.filter((uuid) => uuid == 'done')
        if (count.length == allTasks.length) {
          res.json(getAllTasks)
        }
      }
    })
  })
  console.log('done')
}

exports.updateTask = (req, res) => {
  const { uuid } = req.params
  console.log(req.body)
  taskTemplateCopy
    .findOneAndUpdate({ uuid: uuid }, req.body, { useFindAndModify: false })
    .then((data) => {
      if (data) {
        res.json(data)
      }
    })
    .catch((error) => res.send(error))
}

exports.deleteTask = (req, res) => {
  const { uuid } = req.params
  taskTemplateCopy
    .findOneAndRemove({ uuid: uuid })
    .then((data) => {
      if (data) {
        res.send({ message: 'Successfully deleted task' })
      }
    })
    .catch((error) => res.send(error))
}

exports.getTask = (req, res) => {
  const { uuid } = req.params
  console.log(uuid)
  taskTemplateCopy
    .find({ uuid: uuid })
    .then((data) => {
      if (data) {
        res.json(data)
      }
    })
    .catch((error) => res.send(error))
}

exports.getUserTasks = (req, res) => {
  const { owner } = req.params
  taskTemplateCopy
    .find({ owner: owner })
    .then((data) => {
      if (data) {
        res.json(data)
      }
    })
    .catch((error) => res.send(error))
}

exports.getCompletedTaskLength = (req, res) => {
  const { owner } = req.params
  console.log(owner)
  taskTemplateCopy
    .find({ owner: owner, status: 'Completed' })
    .then((data) => {
      if (data) {
        console.log(data)
        res.json(data)
      }
    })
    .catch((error) => res.send(error))
}

exports.getRecent5Tasks = (req, res) => {
  const { owner } = req.params
  const { status } = req.query
  var condition = status != 'All' ? { owner: owner, status: status } : { owner: owner }
  taskTemplateCopy
    .find(condition)
    .sort({ created_date: -1 })
    .limit(5)
    .then((data) => {
      console.log(data)
      if (data) {
        res.json(data)
      }
    })
    .catch((error) => res.send(error))
}

exports.getAllTasks = (req, res) => {
  taskTemplateCopy
    .find({})
    .then((data) => {
      res.json(data)
    })
    .catch((error) => {
      res.json(error)
    })
}
