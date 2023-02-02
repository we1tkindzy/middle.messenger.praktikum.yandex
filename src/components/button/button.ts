import Block from 'core/Block';

interface ButtonProps {
  text?: string;
  className?: string;
  svg?: string;
  alt?: string;
  onClick?: () => void;
  onNavigate?: () => void;
}

class Button extends Block {
  static componentName = "Button";

  constructor({text, className, svg, onClick, onNavigate}: ButtonProps) {
    super({text, className, svg, events: {click: [onClick, onNavigate]}});
  }

  protected render(): string {
    return `<button class="{{className}}" type="submit">
      {{text}}
      {{#if svg}}
        <img src={{svg}} alt={{alt}}>
      {{/if}}
    </button>`;
  }
}

export default Button;
