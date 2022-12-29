import Block from 'core/Block';

interface ButtonProps {
  text: string;
  className: string;
  svg: string;
  onClick: () => void;
}

export class Button extends Block {
  static componentName = "Button";

  constructor({text, className, svg, onClick}: ButtonProps) {
    super({text, className, svg, events: {click: onClick}});
  }

  protected render(): string {
    return `<button class="{{className}}" type="submit">
      {{#if svg}}<svg class="chat-section__submit-icon" width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect y="5.19995" width="11" height="1.6" fill="white"/>
        <path d="M7 1L11 6L7 11" stroke="white" stroke-width="1.6"/>
      </svg>{{/if}}
      {{text}}
    </button>`;
  }
}
