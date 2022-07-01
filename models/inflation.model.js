module.exports = (mongoose) => {
  const Inflation = mongoose.model(
    "Inflation",
    mongoose.Schema(
      {
        token: { type: String, require: true },
        inflation: String,
      },
      { timestamps: true }
    )
  );
  return Inflation;
};
