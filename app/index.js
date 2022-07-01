const axios = require("axios");
const config = require("../constants");
const apiList = config.apiList;
const utils = require("../utils");
const sleep = utils.sleep;
const model = require("../models");
const Validator = model.validators;
const Pool = model.pools;
const Proposal = model.proposals;
const Supply = model.supplies;
const Inflation = model.inflations;

/**
 * get data for each validator
 */
async function getValidators() {
  for (const _ in apiList) {
    let tokenApi = axios.create({
      baseURL: apiList[_].api,
    });

    console.log("processing validators for:", apiList[_].token);
    try {
      const res = (
        await tokenApi.get("/staking/v1beta1/validators?pagination.limit=10000")
      ).data;

      const validators = res.validators;

      for (const data in validators) {
        const valoper = await Validator.findOne({
          token: apiList[_].token,
          operator_address: validators[data]?.operator_address,
        });
        if (valoper?._id) {
          await Validator.updateOne(
            {
              _id: valoper._id,
            },
            validators[data]
          );
        } else {
          const newValidator = new Validator({
            token: apiList[_].token,
            ...validators[data],
          });

          await newValidator.save((err) => {
            if (err) {
              console.log(err);
            }
          });
        }
        await sleep(500);
      }
    } catch (err) {
      console.log("inflation error:", err);
    }
    await sleep(500);
  }
}

/**
 * get data from each pool
 */
async function getPools() {
  for (const _ in apiList) {
    let tokenApi = axios.create({
      baseURL: apiList[_].api,
    });

    try {
      console.log("fetching pool:", apiList[_].token);

      const res = (await tokenApi.get(`/staking/v1beta1/pool`)).data;

      const pool = await Pool.findOne({
        token: apiList[_]?.token,
      });
      if (pool?._id) {
        await Pool.updateOne({ _id: pool._id }, res);
      } else {
        const newPool = new Pool({ token: apiList[_]?.token, ...res });

        await newPool.save((err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    } catch (err) {
      console.log("pool error:", err);
    }
    await sleep(500);
  }
}

/**
 * get data for each proposal
 */
async function getProposals() {
  for (const _ in apiList) {
    let tokenApi = axios.create({
      baseURL: apiList[_].api,
    });

    console.log("fetching proposals for:", apiList[_].token);
    try {
      const res = (
        await tokenApi.get(`/gov/v1beta1/proposals?pagination.limit=10000`)
      ).data;

      const proposals = res.proposals;

      for (const data in proposals) {
        const proposal = await Proposal.findOne({
          token: apiList[_].token,
          proposal_id: proposals[data]?.proposal_id,
        });
        if (proposal?._id) {
          await Proposal.updateOne(
            {
              _id: proposal._id,
            },
            res
          );
        } else {
          const newProposal = new Proposal({
            token: apiList[_].token,
            ...proposals[data],
          });

          await newProposal.save((err) => {
            if (err) {
              console.log(err);
            }
          });
        }
        await sleep(500);
      }
    } catch (err) {
      console.log("proposal error:", err);
    }
    await sleep(500);
  }
}

/**
 * get data from each supply
 */
async function getSupplies() {
  for (const _ in apiList) {
    let tokenApi = axios.create({
      baseURL: apiList[_].api,
    });

    console.log("fetching supply:", apiList[_].denom);
    try {
      const denom = apiList[_].denom;

      const res = (await tokenApi.get(`/bank/v1beta1/supply/${denom}`)).data;

      const supply = await Supply.findOne({
        token: apiList[_]?.token,
      });
      if (supply?._id) {
        await Supply.updateOne({ _id: supply._id }, res);
      } else {
        const newSupply = new Supply({ token: apiList[_]?.token, ...res });

        await newSupply.save((err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    } catch (err) {
      console.log("supply error:", err);
    }
    await sleep(500);
  }
}

/**
 * get inflation for each token
 */
async function getInflations() {
  for (const _ in apiList) {
    let tokenApi = axios.create({
      baseURL: apiList[_].api,
    });

    console.log("fetching inflation:", apiList[_].token);
    try {
      const res = (await tokenApi.get(`/mint/v1beta1/inflation`)).data;

      const inflation = await Inflation.findOne({
        token: apiList[_]?.token,
      });

      if (inflation?._id) {
        await Inflation.updateOne({ _id: inflation._id }, res);
      } else {
        const newInflation = new Inflation({
          token: apiList[_]?.token,
          ...res,
        });

        newInflation.save((err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    } catch (err) {
      console.log("inflation error:", err);
    }
    await sleep(500);
  }
}

async function run() {
  await getValidators();
  await getPools();
  await getProposals();
  await getSupplies();
  await getInflations();
}

module.exports = { run };
