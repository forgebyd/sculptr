import { plugin } from '@gunshi/plugin';

export default plugin({
  id: 'g:decorate-header',
  setup: (context) => {
    context.decorateHeaderRenderer(async (renderHeader, context) => {
      return await renderHeader(context);
    });
  },
});
