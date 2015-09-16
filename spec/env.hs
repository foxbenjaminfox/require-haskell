import System.Environment

main = do
  var <- getEnv "VAR"
  path <- getEnv "PATH"
  putStr var
  putStr path
