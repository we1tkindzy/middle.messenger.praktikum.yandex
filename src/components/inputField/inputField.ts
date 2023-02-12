import Block from 'core/Block';
import './inputField.scss';

interface InputFieldProps {
  onBlur?: () => void;
  type?: 'text' | 'password' | 'tel' | 'email';
  placeholder?: string;
  name?: string;
  label?: string;
  value?: string;
  ref?: string;
  error?: string;
  className?: string;
}

class InputField extends Block {
  static componentName = 'InputField';

  constructor({ ...props }: InputFieldProps) {
    super({ ...props });
  }

  render(): string {
    return `<div class="{{className}}">
      <label class="{{className}}__label" for="{{name}}">{{label}}</label>
      {{{ Input
        type=type
        id=name
        name=name
        placeholder=placeholder
        className=className
        onBlur=onBlur
        value=value
      }}}
      {{{ Error }}}
    </div>`;
  }
}

export default InputField;
