import Block from 'core/Block';

export class Error404Page extends Block {
  render() {
    return `{{{ErrorSection number="404" description="Не туда попали"}}}`
  }
}
