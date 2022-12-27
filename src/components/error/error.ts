import Block from 'core/Block';

import './error.scss';

interface ErrorProps {
  text?: string;
}

export class Error extends Block<ErrorProps> {
  protected render(): string {
    return `
      <div class="error">{{#if text}}{{text}}{{/if}}</div>
    `
  }
}
