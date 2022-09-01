const fs = require('fs');
const { join } = require('path');

const Constants = require('./Constants');
const reg = (a, c) => require('child_process').execFile('reg.exe', a, c);


const exec = process.execPath;

module.exports = () => {
  const flag = join(exec, '..', '.first-run');
  if (fs.existsSync(flag)) return; // Already done, skip

  const proto = Constants.APP_PROTOCOL;
  const base = 'HKCU\\Software\\Classes\\' + proto;

  for (const x of [
    [base, '/ve', '/d', `URL:${proto} Protocol`],
    [base, '/v', 'URL Protocol'],
    [base + '\\DefaultIcon', '/ve', '/d', `"${exec}",-1`],
    [base + '\\shell\\open\\command', '/ve', '/d', `"${exec}" --url -- "%1"`]
  ]) reg([ 'add', ...x, '/f' ], e => {});
};