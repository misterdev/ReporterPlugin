// const webpack = require('webpack');
const mockProcess = require('jest-mock-process');

const Reporter = require('../src/Reporter');

// const ReporterPlugin = require('../src/index'); //TODO
const { mockReporterPlugin } = require('./helpers');

describe('Reporter should listen & print', () => {
  const reporterPlugin = mockReporterPlugin();

  it('info correctly', () => {
    const mockStdout = mockProcess.mockProcessStdout();
    new Reporter().apply(reporterPlugin);

    reporterPlugin.emitInfo({
      hookId: 'compiler.test',
      count: 1,
      data: 'some data',
      lastCall: 1563104659,
      message: 'compiler.test message',
    });
    expect(mockStdout).toHaveBeenCalledWith(
      '[Reporter] 11:44:659 compiler.test message 1\n'
    );
    mockStdout.mockRestore();
  });

  it('warn correctly', () => {
    const mockStdout = mockProcess.mockProcessStdout();
    new Reporter().apply(reporterPlugin);
    reporterPlugin.emitWarn({
      hookId: 'compiler.test',
      count: 1,
      data: 'this is a warn message',
      lastCall: 1563104659,
      message: 'compiler.test message',
    });

    expect(mockStdout).toHaveBeenCalledWith(
      '\n[Reporter]:\n\n    this is a warn message\n\n'
    );
    mockStdout.mockRestore();
  });

  it('error correctly', () => {
    const mockStdout = mockProcess.mockProcessStdout();
    new Reporter().apply(reporterPlugin);
    reporterPlugin.emitError({
      hookId: 'compiler.test',
      count: 1,
      data: new Error('a very bad error!!'),
      lastCall: 1563104659,
      message: 'compiler.test message',
    });

    expect(mockStdout).toHaveBeenCalledWith(
      '\n[Reporter]:\n\n    Error: a very bad error!!\n\n'
    );
    mockStdout.mockRestore();
  });

  it('stats correctly', () => {
    // TODO doesn't work
    // const compiler = webpack({
    //   context: this.__dirname,
    //   entry: './fixtures/a'
    // });
    // const reporterPlugin = new ReporterPlugin();
    // reporterPlugin.apply(compiler);
    // const reporter = new Reporter();
    // reporter.apply(reporterPlugin);
    // compiler.run((err, stats) => {
    //   const mockStdout = mockProcess.mockProcessStdout();
    //   const statsString = stats.toString();
    //   expect(mockStdout).toHaveBeenCalledWith(`${statsString}\n `);
    //   mockStdout.mockRestore();
    //   done();
    // });
  });

  it('should count info correctly', () => {
    const mockStdout = mockProcess.mockProcessStdout();
    new Reporter().apply(reporterPlugin);
    const hookData = {
      hookId: 'compiler.test',
      count: 1,
      data: 'some data',
      lastCall: 1563104659,
      message: 'compiler.test message',
    };

    reporterPlugin.emitInfo(hookData);
    expect(mockStdout).toHaveBeenCalledWith(
      '[Reporter] 11:44:659 compiler.test message 1\n'
    );

    reporterPlugin.emitInfo(hookData);
    expect(mockStdout).toHaveBeenCalledWith(
      '[Reporter] 11:44:659 compiler.test message 2\n'
    );

    reporterPlugin.emitInfo(hookData);
    expect(mockStdout).toHaveBeenCalledWith(
      '[Reporter] 11:44:659 compiler.test message 3\n'
    );
    mockStdout.mockRestore();
  });
});
