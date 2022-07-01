module.exports = (mongoose) => {
  const Validator = mongoose.model(
    "Validator",
    mongoose.Schema(
      {
        token: { type: String, require: true },
        operator_address: {
          type: String,
          required: true,
          unique: true,
        },
        consensus_pubkey: {
          "@type": String,
          key: String,
        },
        jailed: Boolean,
        status: String,
        tokens: String,
        delegator_shares: String,
        description: {
          moniker: String,
          identity: String,
          website: String,
          security_contact: String,
          details: String,
        },
        unbonding_height: String,
        unbonding_time: String,
        commission: {
          commission_rates: {
            rate: String,
            max_rate: String,
            max_change_rate: String,
          },
          update_time: String,
        },
        min_self_delegation: String,
      },
      { timestamps: true }
    )
  );
  return Validator;
};
