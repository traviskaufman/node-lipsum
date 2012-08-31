require "shelljs/global"
fs = require "fs"
path = require "path"
{spawn, exec} = require "child_process"

task "test", "run all tests for the module", ->
  sh "node_modules/jasmine-node/bin/jasmine-node --color spec/*.spec.js"
  notice "Tests Passed!"

# Taken from coffee-script/Cakefile
notice = (msg) ->
  stars = ("*" for _ in [1..msg.length+4]).join("")
  console.log "#{stars}\n* #{msg} *\n#{stars}\n"

sh = (cmd) ->
  echo cmd
  retCode = exec(cmd).code
  if retCode? and retCode isnt 0
    console.log "Error: #{cmd} failed with exit code #{retCode}"
    exit 1
