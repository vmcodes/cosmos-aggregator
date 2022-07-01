module.exports = (mongoose) => {
  const Pool = mongoose.model(
    "Pool",
    mongoose.Schema(
      {
        token: { type: String, require: true },
        pool: {
          not_bonded_tokens: String,
          bonded_tokens: String,
        },
      },
      { timestamps: true }
    )
  );
  return Pool;
};
