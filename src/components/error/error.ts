import Block from 'core/Block';

import './error.scss';

interface ErrorProps {
  text?: string;
  ref?: string;
}

export class Error extends Block {
  static componentName = "Error";

  constructor({...props}: ErrorProps) {
    super({...props});
  }

  protected render(): string {
    return `
      <div ref="{{ref}}" class="error">{{#if text}}{{text}}{{/if}}</div>
    `
  }
}
