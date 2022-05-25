module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      tittle: String,
      body: String,
      published: Boolean,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { _v, _id, ...Object } = this.toObject();
    Object.id = _id;
    return Object;
  });

  const Post = mongoose.model("posts", schema);
  return Post;
};
