const res = require("express/lib/response");
const { post } = require("../models");
const db = require("../models");
const Post = db.post;

exports.findAll = (req, res) => {
  Post.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some Error while retrieving posts.",
      });
    });
};

exports.create = (req, res) => {
  const post = new Post({
    tittle: req.body.tittle,
    body: req.body.body,
    published: req.body.published ? req.body.published : false,
  });

  post
    .save(post)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Some Error while retrieving create post",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Post.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Post.findByIdAndUpdate(id, req.body)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Post not Found",
        });
      }

      res.send({
        message: "Post was updated",
      });
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Some error while updating your post.",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Post.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Post cannot be find",
        });
      }

      res.send({
        message: "Post was Succesfully deleted!",
      });
    })
    .catch((err) => {
      res.send(409).send({
        message: err.message || "Some Error while deteling post.",
      });
    });
};
