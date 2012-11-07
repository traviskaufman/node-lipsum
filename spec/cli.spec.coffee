cli = require('../lib/cli')

describe "The lipsum command-line interface", ->
  run = (argv) ->
    cli.run(argv)
  cliSpy = null

  beforeEach ->
    cliSpy = spyOn(cli, '_run')

  describe "Its default parameters", ->
    it "has a default amount argument", ->
      cliSpy.andCallFake( (argv) ->
        console.dir(argv)
        expect(argv.amount).toEqual(5)
      )
      run()

    it "has a default 'what' argument", ->
      cliSpy.andCallFake( (argv) ->
        expect(argv.what).toEqual('paras')
      )
      run()

    it "has a default 'start_with_lipsum' argument", ->
      cliSpy.andCallFake( (argv) ->
        expect(argv.start_with_lipsum).toBe(false)
      )
      run()

  describe "Argument validation", ->
    # fail() function inside optimist calls process.exit(1)
    errspy = spyOn(process, 'exit')
    it "only accepts 'paras', 'words', or 'bytes' for '--what'", ->
      run(['-w', 'badarg'])
      expect(errSpy).toHaveBeenCalledWith(1)

    it "only accepts integers for '--amount'", ->
      run(['-a', 'badarg'])
      expect(errSpy).toHaveBeenCalledWith(1)

  it "displays a help message when passed -h", ->
    helpSpy = spyOn(cli._optparser, 'help')
    run(['-h'])
    expect(helpSpy).toHaveBeenCalled()

  it "displays a help message when passed --help", ->
    helpSpy = spyOn(cli._optparser, 'help')
    run(['--help'])
    expect(helpSpy).toHaveBeenCalled()

  it "correctly parses arguments", ->
    cliSpy.andCallFake( (argv) ->
      expect(argv.amount).toEqual(10)
      expect(argv.what).toEqual('words')
      expect(argv.start_with_lipsum).toBe(true)
    )
    run(['--amount', 10, '--what', 'words', '-s'])
