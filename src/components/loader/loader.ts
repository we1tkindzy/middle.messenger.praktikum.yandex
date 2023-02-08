import Block from 'core/Block';
import './loader.scss';

class Loader extends Block {
  static componentName = 'Loader';

  render() {
    return `<div class="loader">
      <div class="loader__text">Loading. . .</div>
    </div>`;
  }
}

export default Loader;
