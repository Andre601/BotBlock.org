const seedsImport = require('../seedsImport');

exports.seed = async function (knex) {
    await seedsImport(knex, 'legacy_ids');
};
