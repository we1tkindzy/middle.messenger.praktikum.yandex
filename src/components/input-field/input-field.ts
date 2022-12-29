import Block from 'core/Block';
import './input-field.scss';

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

export class InputField extends Block {
  static componentName = "InputField";

  constructor({...props}: InputFieldProps) {
    super({...props});
  }

  protected render(): string {
    return `<div class="{{className}}">
      <label class="{{className}}__label" for="{{name}}">{{label}}</label>
      {{{Input
        type=type
        id=name
        name=name
        placeholder=placeholder
        className="{{className}}__input"
        onBlur=onBlur
      }}}
      {{{Error}}}
    </div>`
  }
}


