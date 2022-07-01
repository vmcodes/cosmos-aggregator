const utils = require("../utils");
const sleep = utils.sleep;
const model = require("../models");
const Validator = model.validators;
const Pool = model.pools;
const Supply = model.supplies;
const Inflation = model.inflations;
const Valoper = model.valopers;

/**
 * format data for single API call
 */
async function formatData() {
  const valopers = await Validator?.find({});
  let itr = 0;
  console.log("formatting data");

  for (const _ in valopers) {
    try {
      const token = valopers[_].token;
      const valoper = valopers[_].operator_address;
      const identity = valopers[_]?.description?.identity;
      const moniker = valopers[_]?.description?.moniker;
      const website = valopers[_]?.description?.website;
      const details = valopers[_]?.description?.details;
      const status = valopers[_]?.status;
      const lastChange = valopers[_]?.commission?.update_time;
      const tokens = (
        parseFloat(valopers[_]?.tokens) / Math.pow(10, 6)
      ).toFixed(0);
      const active = status === "BOND_STATUS_BONDED" ? true : false;
      const logo = `https://share.objectpress.io/validators/${identity}.jpg`;
      const inflation = await Inflation.findOne({ token: token });
      const inflationRate = parseFloat(inflation?.inflation);
      const supply = await Supply.findOne({ token: token });
      const totalSupply = parseFloat(supply?.amount?.amount) / Math.pow(10, 6);
      const pool = await Pool.findOne({ token: token });
      const bonded = pool?.pool?.bonded_tokens;
      const stakingPool = bonded / Math.pow(10, 6);
      const boundedToken = stakingPool / totalSupply;
      const power = (
        (parseFloat(valopers[_]?.delegator_shares) / bonded) *
        100
      ).toFixed(2);
      const maxRate = (
        parseFloat(valopers[_]?.commission?.commission_rates.max_rate) * 100
      ).toFixed(0);
      const commissionRate = (
        parseFloat(valopers[_]?.commission?.commission_rates.rate) * 100
      ).toFixed(2);
      const rateChange = (
        parseFloat(valopers[_]?.commission?.commission_rates.max_change_rate) *
        100
      ).toFixed(0);
      const APR = ((inflationRate / boundedToken) * 100).toFixed(0);

      const data = {
        valoper: valoper,
        identity: identity,
        name: moniker,
        details: details,
        website: website,
        status: status,
        active: active,
        APR: APR,
        token: token,
        logo: logo,
        maxRate: maxRate,
        commissionRate: commissionRate,
        rateChange: rateChange,
        lastChange: lastChange,
        token: token,
        tokens: tokens,
        power: power,
      };

      const fetch = await Valoper.findOne({
        valoper: valopers[_].operator_address,
      });

      if (fetch?._id) {
        await Valoper.updateOne(
          {
            _id: fetch._id,
          },
          data
        );
      } else {
        const newValoper = new Valoper({
          ...data,
        });

        await newValoper.save((err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
    itr++;
    await sleep(500);
  }
  console.log("count:", itr);
}

module.exports = { formatData };
