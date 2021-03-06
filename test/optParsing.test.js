const ReporterPlugin = require('../src');

describe('reporter plugin options', () => {
  it('should have default values', () => {
    /* eslint-disable no-new */
    const plugin = new ReporterPlugin();
    expect(plugin.compilerHooks).toMatchSnapshot();
    expect(plugin.compilationHooks).toMatchSnapshot();
  });

  it('should handle "defaults: false"', () => {
    /* eslint-disable no-new */
    const plugin = new ReporterPlugin({
      hooks: {
        defaults: false,
      },
    });
    expect(plugin.compilerHooks).toMatchSnapshot();
    expect(plugin.compilationHooks).toMatchSnapshot();
  });

  it('should handle "defaults: false" and hooks settings', () => {
    /* eslint-disable no-new */
    const plugin = new ReporterPlugin({
      hooks: {
        defaults: false,
        compiler: {
          done: true,
        },
        compilation: {
          seal: true,
          buildModule: 5,
          contentHash: '4ms',
        },
      },
    });
    expect(plugin.compilerHooks).toMatchSnapshot();
    expect(plugin.compilationHooks).toMatchSnapshot();
    expect(plugin.hookStats).toMatchSnapshot();
  });

  it('should handle "defaults: true" and hook configurations', () => {
    /* eslint-disable no-new */
    const plugin = new ReporterPlugin({
      hooks: {
        defaults: true,
        compiler: {
          done: false,
        },
        compilation: {
          seal: false,
          buildModule: 5,
          contentHash: '4ms',
        },
      },
    });
    expect(plugin.compilerHooks).toMatchSnapshot();
    expect(plugin.compilationHooks).toMatchSnapshot();
    expect(plugin.hookStats).toMatchSnapshot();
  });
});
