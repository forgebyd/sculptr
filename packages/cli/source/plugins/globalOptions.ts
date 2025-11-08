import { plugin } from '@gunshi/plugin';

export default plugin({
  id: 'g:global-options',
  setup: (context) => {
    context.addGlobalOption('config', {
      type: 'string',
      short: 'C',
      description: 'Path to configuration file',
      default: '',
    });

    context.addGlobalOption('dry', {
      type: 'boolean',
      short: 'D',
      description: 'Perform a dry run without making changes',
      default: false,
    });

    context.addGlobalOption('verbose', {
      type: 'boolean',
      short: 'V',
      description: 'Enable verbose output for detailed logs',
      default: false,
    });
  },
});
