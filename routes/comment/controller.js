const commentTemplateCopy = require('../../models/commentSchema')

exports.createComment = (req, res) => {
  const { comments } = req.body

  comments.forEach((item, index) => {
    console.log(index)
    const createdComment = new commentTemplateCopy(item)
    createdComment.save()
  })
  console.log('done')
  res.send({ message: 'Comments created successfully' })
}

exports.updateComment = (req, res) => {
  const { uuid } = req.params
  commentTemplateCopy
    .findOneAndUpdate({ uuid: uuid }, req.body, { useFindAndModify: false })
    .then((data) => {
      if (data) {
        res.json(data)
      }
    })
    .catch((error) => res.send(error))
}

exports.deleteComment = (req, res) => {
  const { comments } = req.body
  const copyComments = comments
  console.log(comments)

  comments.forEach((uuid, index) => {
    console.log(index)
    commentTemplateCopy.findOneAndRemove({ uuid: uuid }).then((data) => {
      copyComments.splice(index, 1)
      copyComments.splice(index, 0, 'done')
      let count = copyComments.filter((uuid) => uuid == 'done')
      if (count.length == comments.length) {
        res.send({ message: 'Successfully deleted tasks' })
      }
    })
  })
  console.log('done')
}

exports.getComments = (req, res) => {
  const { comments } = req.body
  const getAllComments = []
  const copyComments = comments

  comments.forEach((uuid, index) => {
    commentTemplateCopy.find({ uuid: uuid }).then((data) => {
      if (data) {
        console.log(data)
        if (data.length > 0) {
          getAllComments.push(data[0])
        }
        copyComments.splice(index, 1)
        copyComments.splice(index, 0, 'done')
        let count = copyComments.filter((uuid) => uuid == 'done')
        if (count.length == comments.length) {
          res.json(getAllComments)
        }
      }
    })
  })
  console.log('done')
}
