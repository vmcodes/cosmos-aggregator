module.exports = (mongoose) => {
  const Valoper = mongoose.model(
    "Valoper",
    mongoose.Schema(
      {
        identity: String,
        name: String,
        valoper: { type: String, required: true, unique: true },
        details: String,
        website: String,
        status: String,
        active: Boolean,
        APR: String,
        token: String,
        logo: String,
        maxRate: String,
        commissionRate: String,
        rateChange: String,
        lastChange: String,
        tokens: String,
        power: String,
        stakers: String,
      },
      { timestamps: true }
    )
  );
  return Valoper;
};
