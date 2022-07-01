module.exports = (mongoose) => {
  const Supply = mongoose.model(
    "Supply",
    mongoose.Schema(
      {
        token: { type: String, require: true },
        amount: {
          denom: String,
          amount: String,
        },
      },
      { timestamps: true }
    )
  );
  return Supply;
};
