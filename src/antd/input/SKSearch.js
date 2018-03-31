import { Input } from 'antd';
import PropTypes from 'prop-types';
import { SK } from 'sk-js';
import OriginInput from './OriginInput';
import SKInput from './SKInput';

Input.Search.defaultProps = SK.assign({}, {
  enterButton: false,
}, OriginInput.defaultProps, Input.Search.defaultProps, {});

Input.Search.propTypes = SK.assign({}, {
  //https://ant.design/components/input-cn/#Input.Search
  enterButton: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  onSearch: PropTypes.func,
}, OriginInput.propTypes, Input.Search.propTypes, {});

export default class SKSearch extends SKInput {
  static SK_COMP_NAME = 'SKSearch';
  static defaultProps = SK.assign({}, SKInput.defaultProps, Input.Search.defaultProps, {
    compTag: Input.Search,
  });
  static propTypes = SK.assign({}, SKInput.propTypes, Input.Search.propTypes, {});

  constructor(...args) {
    super(...args);
    this.SK_COMP_NAME = SKSearch.SK_COMP_NAME;
  }
}
