import Block from './Block';
import Handlebars, { HelperOptions } from 'handlebars';

function registerComponent(Component: typeof Block) {
  Handlebars.registerHelper(Component.componentName || Component.name, ({ hash: { ...hash }, data }: HelperOptions) => {
      if (!data.root.children) {
        data.root.children = {};
      }

      const { children } = data.root;

      const component = new Component(hash);

      children[component.id] = component;

      return `<div data-id="id-${component.id}"></div>`;
    },
  );
}

export default registerComponent;
