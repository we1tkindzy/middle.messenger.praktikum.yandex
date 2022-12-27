import Block from 'core/Block';

export class Error500Page extends Block {
  render() {
    return `{{{ErrorSection number="500" description="Мы уже фиксим"}}}`
  }
}
