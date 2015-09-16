import System.Environment

main = do
  args <- getArgs
  putStr $ head args
