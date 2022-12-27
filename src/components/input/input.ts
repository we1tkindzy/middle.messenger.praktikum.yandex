import Block from 'core/Block';

import './input.css';

interface InputProps {
  onInput?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  name?: string;
  ref?: string;
  value?: string;
}

export class Input extends Block {
  constructor({onInput, onFocus, onBlur, ...props}: InputProps) {
    super({...props, events: {input: onInput, focus: onFocus, blur: onBlur}});
  }

  protected render(): string {
    return `
      <input
        class="input-field__input"
        type="{{type}}"
        id="{{name}}"
        name="{{name}}"
        placeholder="{{placeholder}}"
        value="{{value}}"
        ref="{{ref}}"
      >
    `
  }
}
