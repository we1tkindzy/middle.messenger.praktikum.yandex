import Block from 'core/Block';
import withRouter from 'utils/withRouter';
import withStore from 'utils/withStore';

class Error404Page extends Block {
  render() {
    return `{{{ErrorSection
      number="404"
      description="Не туда попали"
    }}}`;
  }
}

export default withRouter(withStore(Error404Page));
