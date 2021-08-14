const { Candidate, Ticket, Medical } = require("../models");

exports.monthly = async function (query) {
  let candidates = await Candidate.countPerMonth(query);
  let tickets = await Ticket.countPerMonth(query);

  return { candidates, tickets };
};

exports.all = async function (query) {
  let candidates = await Candidate.countDocuments(query);
  let tickets = await Ticket.countDocuments(query);
  let medicals = await Medical.countDocuments(query);

  return { candidates, tickets, medicals };
};
