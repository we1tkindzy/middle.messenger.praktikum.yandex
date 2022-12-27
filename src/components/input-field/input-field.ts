import Block from 'core/Block';
import './input-field.scss';

interface InputFieldProps {
  onInput?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  type?: 'text' | 'password' | 'tel' | 'email';
  placeholder?: string;
  name?: string;
  label?: string;
  value?: string;
  ref?: string;
  error?: string;
}

export class InputField extends Block {
  constructor(props: InputFieldProps) {
    super({
      ...props,
      onBlur: (e: FocusEvent) => {
        const inputEl = e.target as HTMLInputElement;
        console.log(inputEl.value)

        this.refs.errorRef.setProps({ text: inputEl.value})
      }
    });
  }

  protected render(): string {
    return `<div class="input-field">
      <label class="input-field__label" for="{{name}}">{{label}}</label>
      {{{Input
        type=type
        id=name
        name=name
        placeholder=placeholder
        value=value
        ref=ref
        onFocus=onFocus
        onInput=onInput
        onBlur=onBlur
      }}}
      {{{Error ref=errorRef text=error}}}
    </div>`
  }
}


