import Block from 'core/Block';

interface InputProps {
  onInput?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  name?: string;
  ref?: string;
  value?: string;
  className?: string;
}

class Input extends Block {
  static componentName = 'Input';

  constructor({
    onInput, onFocus, onBlur, ...props
  }: InputProps) {
    super({ ...props, events: { input: onInput, focus: onFocus, blur: onBlur } });
  }

  render(): string {
    return `<input
      class="{{className}}__input"
      type="{{type}}"
      id="{{name}}"
      name="{{name}}"
      placeholder="{{placeholder}}"
      value="{{value}}"
      ref="{{ref}}"
    >`;
  }
}

export default Input;
