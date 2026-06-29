export const SUPPRESS_FAST_REFRESH_LOGS_SCRIPT = `
(function () {
  if (typeof console === 'undefined') return;
  var log = console.log.bind(console);
  console.log = function () {
    var first = arguments[0];
    if (typeof first === 'string' && first.indexOf('[Fast Refresh]') === 0) return;
    return log.apply(console, arguments);
  };
})();
`.trim();