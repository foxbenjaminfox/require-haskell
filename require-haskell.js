var child_process = require("child_process"),
    extend = require("util")._extend;

module.exports = function requireHaskell(haskellModule, env) {
  var path = require.resolve(haskellModule);

  env = env || {};
  extend(env, process.env);

  return function runHaskell(/* ...arguments, callback */){
    var args = [].slice.call(arguments),
        callback = args.splice(-1).pop(),
        joinedArgs = args.map(function(arg){
          return "'" + arg.replace(/'/g, "'\\''") + "'";
        }).join(" ");

    child_process.exec("runhaskell " + path + " " + joinedArgs, { env: env }, function(err, stdout, stderr) {
      if (err) callback(err);
      else callback(stderr, stdout);
    });
  };
};
