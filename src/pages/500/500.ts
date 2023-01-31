import Block from 'core/Block';
import withRouter from 'utils/withRouter';
import withStore from 'utils/withStore';

class Error500Page extends Block {
  render() {
    return `{{{ErrorSection
      number="500"
      description="Мы уже фиксим"
    }}}`;
  }
}

export default withRouter(withStore(Error500Page));
