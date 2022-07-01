module.exports = (mongoose) => {
  const Proposal = mongoose.model(
    "Proposal",
    mongoose.Schema(
      {
        token: { type: String, require: true },
        proposal_id: { type: String, required: true },
        content: {
          "@type": String,
          title: String,
          description: String,
          subject_client_id: String,
          substitute_client_id: String,
        },
        status: String,
        final_tally_result: {
          yes: String,
          abstain: String,
          no: String,
          no_with_veto: String,
        },
        submit_time: String,
        deposit_end_time: String,
        total_deposit: [
          {
            denom: String,
            amount: String,
          },
        ],
        voting_start_time: String,
        voting_end_time: String,
      },
      { timestamps: true }
    )
  );
  return Proposal;
};
