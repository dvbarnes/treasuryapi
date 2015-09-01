
var getBondInfo = function(serial, date, type){
  var Nightmare = require('nightmare'),
      Q = require('q');
  var d = Q.defer();
  new Nightmare()
  .goto("http://www.treasurydirect.gov/BC/SBCPrice")
  .type('[name="IssueDate"]',date)
  .type('[name="SerialNumber"]',serial)
  .click('input[type="submit"]')
  .wait()
  .evaluate(function(){
    return [].map.call(document.querySelectorAll('table.bnddata .altrow1 td'), function(td){
      return td.innerText;
    });
  }, function(m){
    d.resolve({
      serial: m[0],
      series: m[1],
      denomination: m[2],
      issueDate: m[3],
      nextAccrual: m[4],
      finalMaturity: m[5],
      issuePrice: m[6],
      interest: m[7],
      interestRate:m[8],
      value: m[9],
      note: m[10]
    });
  })
  .run();
  return d.promise;
}
module.exports = {
  getBondInfo: getBondInfo
};
