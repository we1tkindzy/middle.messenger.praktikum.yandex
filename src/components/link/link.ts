import Block from 'core/Block';

interface LinkProps {
  text?: string;
  className?: string;
  svg?: string;
  alt?: string;
  onNavigate?: () => void;
}

class Link extends Block {
  static componentName = 'Link';

  constructor({
    text,
    className,
    svg,
    onNavigate,
  }: LinkProps) {
    super({
      text,
      className,
      svg,
      events: {
        click: onNavigate,
      },
    });
  }

  render(): string {
    return `<a class="{{className}}">
      {{text}}
      {{#if svg}}
        <img src={{svg}} alt={{alt}}>
      {{/if}}
    </a>`;
  }
}

export default Link;
