const config = require('../src/config');
const Database = require('../src/Structure/Database');
const i18n = require('../src/Util/i18n');

const {describe, it} = require('mocha');

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

const target = `${config.baseURL}:${config.port}`;
const request = () => chai.request(target);
const ratelimitBypass = (req) => req.set('X-Ratelimit-Bypass', config.secret);

const dbc = new Database(config.database);
const db = async (query, data) => {
    if (!dbc.db._connectCalled) await dbc.connect();
    return dbc.run(query, data);
};

const locale = i18n.__;

const authCheck = res => {
    expect(res).to.be.html;
    expect(res.text).to.include('This page requires authentication to access');
    expect(res.text).to.include(`Sign in to ${locale('site_name')}`);
    expect(res.text).to.include('A 403 error has occurred... :(');
};

module.exports = {describe, it, expect, request, ratelimitBypass, db, locale, authCheck};
