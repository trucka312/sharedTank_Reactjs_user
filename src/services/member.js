import { callApi } from "../apis"

const rewardPolicies = () => {
  return callApi(`/customer/v1/reward_policies`, "get");
}

const tierRevenues = () => {
  return callApi(`/customer/v1/tier_revenues`, "get");
}

const shareholderInvestments = () => {
  return callApi(`/customer/v1/shareholder_investments`, "get");
}

export const member = {
  rewardPolicies,
  tierRevenues,
  shareholderInvestments,
}