import { plugin } from '@gunshi/plugin';

export default plugin({
  id: 'g:decorate-usage',
  setup: (context) => {
    context.decorateUsageRenderer(async (renderUsage, context) => {
      return await renderUsage(context);
    });
  },
});
