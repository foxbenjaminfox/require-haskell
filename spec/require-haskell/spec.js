describe("require-haskell", function() {
  var requireHaskell;
  requireHaskell = require("../../require-haskell.js");
  it("should get the value 'Hello' from hello.hs", function(done) {
    var hello = requireHaskell("./spec/hello.hs");
    hello(function(err, res){
      if (err) done.fail(err);
      else if (res === "Hello") done();
      else done.fail(res + " should be hello");
    });
  });
  it("should get an echo from echo.hs", function(done){
    var echo = requireHaskell("./spec/echo.hs"),
        string = "echo this";
    echo(string, function(err, res){
      if (err) done.fail(err);
      else if (res === string) done();
      else done.fail(res + " should be " + string);
    });
  });
  it("should get an echo from echo.hs even with symbols that need escaping", function(done){
    var echo = requireHaskell("./spec/echo.hs"),
        string = "&) !! 2#''& //$g {h} $i' 17'%=^! -- \\a\"";
    echo(string, function(err, res){
      if (err) done.fail(err);
      else if (res === string) done();
      else done.fail(res + " should be " + string);
    });
  });
  it("should pass environment variables if needed", function(done){
    var string = "VARVALUE",
        env = requireHaskell("./spec/env.hs", { VAR: string } );
    env(function(err, res){
      if (err) done.fail(err);
      else {
        var path = res.substring(string.length),
            varval = res.substring(0, string.length);
        if (varval === string){
          if (path === process.env.PATH) done();
          else done.fail(path + " should be " + process.env.PATH);
        } else done.fail(varval + " should be " + string);
      }
    });
  });
});
