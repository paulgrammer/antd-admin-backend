const xtend = require("xtend");
const { Record, User, Attachment } = require("../models");
const Utils = require("../utils");

module.exports.findCategories = async function findCategories(category, query) {
  const GetData = async function (Category, fields = [], populate = []) {
    // clean query, remove irrelevant props
    const q = xtend(query, {
      offset: undefined,
      limit: undefined,
      sorter: undefined,
    });

    const modal = Category.find(Utils.cleanObject(q))
      .skip(query.offset)
      .limit(query.limit)
      .select(fields)
      .sort([
        [
          query.sorter ? query.sorter.field : "updatedAt",
          query.sorter && /ascend/.test(query.sorter.order)
            ? "ascending"
            : "descending",
        ],
      ])
      .populate(populate);

    const [data, total] = await Promise.all([
      modal.exec(),
      Category.countDocuments(q),
    ]);

    return { data, total };
  };

  switch (category) {
    case "users": {
      return await GetData(User);
    }

    case "attachment": {
      return await GetData(Attachment);
    }

    case "records": {
      return await GetData(Record);
    }

    default: {
      return { data: [], total: 0 };
    }
  }
};

module.exports.findCategory = async function findCategories(params) {
  const GetData = async function (Category) {
    const category = await Category.findById(params.id);
    return category;
  };

  switch (params.category) {
    case "records": {
      return await GetData(Record);
    }

    default: {
      return {};
    }
  }
};
