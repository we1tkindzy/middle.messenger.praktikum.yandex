import { BlockClass } from 'core/Block';
import Router from '../core/Router/Router';

type WithRouterProps = { router: Router };

function withRouter<P extends WithRouterProps>(WrappedBlock: BlockClass) {
  return class extends WrappedBlock {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, router: window.router });
    }
  } as BlockClass;
}

export default withRouter;
