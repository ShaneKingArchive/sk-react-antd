import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {Model, SK} from 'sk-js';
import Reacts from './Reacts';

export default class Comp extends React.Component {
  static KS_PROPS_PREFIX = 'ks';//applay for all sub specify element
  static SK_COMP_NAME = 'Comp';
  static SK_COMP_STATE_ID_PREFIX = 'skCompStateUid';
  static SK_PROPS_PREFIX = 'sk';//applay for all sub element
  static SK_PROPS_SYS = 'sys';
  static SK_PROPS = {
    //sk
    COMP_TAG: 'compTag',
    MODEL: 'model',
    MODEL_ID: 'modelId',//a.b.c or property in array like a.b[2].c
    //ui state, are bfo (boolean, function, object{deps:,func:})
    //deps to monitor
    ACTIVE: 'active',
    DISABLED: 'disabled',
    HIDDEN: 'hidden',
    PREVIEW: 'preview',
    READ_ONLY: 'readOnly',
    REQUIRED: 'required', //just paint required icon
    //component monitor list, can be string[reg], string array or object
    MONITOR: 'monitor',
  };
  static defaultProps = {};
  static propTypes = {
    compTag: PropTypes.any,
    skModel: Comp.IS_PROP_TYPES_MODEL, //Business Model(page), PlainObject
    skSysModel: Comp.IS_PROP_TYPES_MODEL, //System Model(whole of page), PlainObject
    model: Comp.IS_PROP_TYPES_MODEL, //Business Model(part of page), PlainObject
    modelId: PropTypes.string,
    monitor: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.object,
    ]), //monitor is string[reg], array[string] or object of modelId

    active: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.func,
      PropTypes.object,
    ]),
    skActive: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.func,
      PropTypes.object,
    ]),
    disabled: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.func,
      PropTypes.object,
    ]),
    skDisabled: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.func,
      PropTypes.object,
    ]),
    hidden: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.func,
      PropTypes.object,
    ]),
    skHidden: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.func,
      PropTypes.object,
    ]),
    preview: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.func,
      PropTypes.object,
    ]),
    skPreview: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.func,
      PropTypes.object,
    ]),
    readOnly: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.func,
      PropTypes.object,
    ]),
    skReadOnly: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.func,
      PropTypes.object,
    ]),
    required: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.func,
      PropTypes.object,
    ]),
    skRequired: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.func,
      PropTypes.object,
    ]),

    m2eConvertor: PropTypes.func, //Model 2 Editing
    e2mConvertor: PropTypes.func, //Editing 2 Model
    m2vConvertor: PropTypes.func, //Model 2 View, like Date Comp, moment format to view: YYYY-MM-DDTHH:mm:ss.SSSZ -> YYYY-MM-DD
  };

  constructor(...args) {
    super(...args);
    this.SK_COMP_NAME = Comp.SK_COMP_NAME;
    this.monitors = [];
    this.updateUI = (evt) => {
      this.setState({stateUid: _.uniqueId(Comp.SK_COMP_STATE_ID_PREFIX)});
    };
  }

  static IS_PROP_TYPES_MODEL(props, propName, componentName) {
    if (props[propName] && !(props[propName] instanceof Model)) {
      return new Error(`The [${componentName}]'s [${propName}] is not a model!`);
    }
  }

  static ksPropsFilter(k) {
    return _.startsWith(SK.s4s(k), Comp.KS_PROPS_PREFIX);
  }

  static skPropsFilter(k) {
    return _.startsWith(SK.s4s(k), Comp.SK_PROPS_PREFIX);
  }

  // react
  componentDidMount() {
    //super.componentDidMount();
    this.addAllChangedMonitor();
    this.addExtendChangedMonitor();
  }

  componentWillUpdate() {
    this.rmvAllChangedMonitor();
    this.rmvExtendChangedMonitor();
    //super.componentWillUpdate();
  }

  componentDidUpdate() {
    //super.componentDidUpdate();
    this.addAllChangedMonitor();
    this.addExtendChangedMonitor();
  }

  componentWillUnmount() {
    this.rmvAllChangedMonitor();
    this.rmvExtendChangedMonitor();
    //super.componentWillUnmount();
  }

  render() {
    const {compTag: CompTag} = this.props;

    if (this.skBfo(Comp.SK_PROPS.PREVIEW)) {
      return this.renderPreview();
    } else {
      return this.renderComp();
    }
  }

  // monitor
  addAllChangedMonitor() {
    Model.parseSao(this.props.monitor).forEach((item) => {
      this.addChangedMonitor(item);
    });
    //Self value monitor
    if (this.getModelId()) {
      this.addChangedMonitor(this.getModelId());
    }
  }

  addChangedMonitor(idOrReg) {
    if (!_.isNil(idOrReg)) {
      if (this.monitors.indexOf(idOrReg) < 0) {
        this.monitors.push(idOrReg);
      }
      if (_.isRegExp(idOrReg)) {
        this.skModel().addRegChangedListener(idOrReg, this.updateUI);
      } else {
        this.skModel().addIdChangedListener(idOrReg, this.updateUI);
      }
    }
  }

  addExtendChangedMonitor() {

  }

  rmvAllChangedMonitor() {
    this.monitors.forEach((item) => {
      this.rmvChangedMonitor(item);
    });
  }

  rmvChangedMonitor(idOrReg) {
    if (_.isRegExp(idOrReg)) {
      this.skModel().rmvRegChangedListener(idOrReg, this.updateUI);
    } else {
      this.skModel().rmvIdChangedListener(idOrReg, this.updateUI);
    }
    this.monitors.skRmv(idOrReg);
  }

  rmvExtendChangedMonitor() {

  }

  // other
  allowTransProps2Child(child) {
    return [];
  }

  allowTransProps2Self(comp = this.props.compTag, prop = this.props) {
    return [];
  }

  clearAllErrors() {
    if (this.skModel()) {
      this.skModel().setErrors();
    }
  }

  denyTransProps2Child(child) {
    return [];
  }

  denyTransProps2Self(comp = this.props.compTag, prop = this.props) {
    return [];
  }

  e2m(val) {
    return this.skVal(_.isFunction(this.props.e2mConvertor) ? this.props.e2mConvertor(this, this.skModel(), val) : this.e2mConvertor(val));
  }

  e2mConvertor(val) {
    return val;
  }

  /**
   * Returns boolean value of boolean, function or object with skWhen properties
   *
   * @param {boolean|function|object} bfo
   * @param {boolean} defaultValue
   * @returns {boolean}
   */
  execBfo(bfo, defaultValue = false) {
    if (_.isBoolean(bfo)) {
      return bfo;
    } else if (_.isFunction(bfo)) {
      return bfo.call(this);
    } else if (_.isObject(bfo) && _.isFunction(bfo.func)) {
      return bfo.func.call(this);
    } else {
      return defaultValue;
    }
  }

  getErrors() {
    return this.skModel().getErrors(this.getModelId());
  }

  /**
   * Get modelId: x.xx.xxx
   *
   * @returns {string}
   */
  getModelId() {
    return this.props.modelId;
  }

  getSysModel() {
    return this.props.skSysModel;
  }

  /**
   * Get prop value: prop -> skProp -> skSysProp
   *
   * @param {string}prop
   * @param {*} defaultValue
   * @returns {*} Maybe undefined
   */
  ksProp(prop, defaultValue = undefined) {
    let rtn = this.props[prop];
    if (rtn === undefined) {
      rtn = this.props[Comp.SK_PROPS_PREFIX + this.SK_COMP_NAME + prop];
    }
    return rtn === undefined ? defaultValue : rtn;
  }

  m2e() {
    return _.isFunction(this.props.m2eConvertor) ? this.props.m2eConvertor(this, this.skModel(), this.skVal()) : this.m2eConvertor();
  }

  m2eConvertor() {
    return this.skVal();
  }

  m2v() {
    return _.isFunction(this.props.m2vConvertor) ? this.props.m2vConvertor(this, this.skModel(), this.skVal()) : this.m2vConvertor();
  }

  m2vConvertor() {
    return this.skVal();
  }

  renderComp() {
    const {compTag: CompTag} = this.props;

    return (
      <CompTag {...this.skTransProps2Self(CompTag)}>
        {this.skTransProps2Child()}
      </CompTag>
    );
  }

  renderPreview() {
    return this.m2v();
  }

  /**
   * @see Comp.execBfo
   */
  skBfo(prop, defaultValue = false) {
    return this.execBfo(this.skProp(prop, defaultValue));
  }

  /**
   * Get model if exist, else skModel
   *
   * @returns {Model}
   */
  skModel() {
    return this.skProp(Comp.SK_PROPS.MODEL);
  }

  /**
   * Get prop value: prop -> skProp -> skSysProp
   *
   * @param {string}prop
   * @param {*} defaultValue
   * @returns {*} Maybe undefined
   */
  skProp(prop, defaultValue = undefined) {
    let rtn = this.props[prop];
    if (rtn === undefined) {
      rtn = this.ksProp(prop);
    }
    if (rtn === undefined) {
      rtn = this.props[Comp.SK_PROPS_PREFIX + SK.upperWordsFirstChar(prop)];
    }
    if (rtn === undefined) {
      rtn = this.props[Comp.SK_PROPS_PREFIX + SK.upperWordsFirstChar(Comp.SK_PROPS_SYS) + SK.upperWordsFirstChar(prop)];
    }
    return rtn === undefined ? defaultValue : rtn;
  }

  skTmpVal(id = this.getModelId(), value) {
    return arguments.length > 1 ? this.skModel().skVal(`tmp.${id}`, value) : this.skModel().skVal(`tmp.${id}`);
  }

  skTransProps2Child(children = this.props.children) {
    const skProps = Object.keys(this.props.skFilter(false, Comp.skPropsFilter));
    const ksProps = Object.keys(this.props.skFilter(false, Comp.ksPropsFilter));

    let rtn = React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        let allowProps = skProps;
        allowProps = Reacts.TAG[child.type] ? [] : allowProps.concat(ksProps);//if html node, nothing to do
        allowProps = allowProps.concat(this.allowTransProps2Child(child));

        let denyProps = [Comp.SK_PROPS.COMP_TAG, Comp.SK_PROPS.MODEL_ID, 'children', 'className'];//force ignore props
        denyProps = child.props ? denyProps.concat(Object.keys(child.props)) : denyProps;
        denyProps = denyProps.concat(this.denyTransProps2Child(child));

        return React.cloneElement(child, _.omit(_.pick(this.props, allowProps), denyProps));
      }
      return child;
    });

    if (!_.isArray(children) && _.isArray(rtn)) {
      rtn = rtn[0];
    }
    return rtn;
  }

  /**
   * Valid props for this comp
   *
   * @param {Comp|string} comp not div, just have 'div' and Div or React Component etc...
   * @param {object} prop
   * @param {boolean} htmlProps @Deprecated at antd 3.8.1 used in FormComp.render at antd 3.5.4
   * @returns {object}
   */
  skTransProps2Self(comp = this.props.compTag, prop = this.props) {
    const skProps = Object.keys(prop.skFilter(false, Comp.skPropsFilter));
    const ksProps = Object.keys(prop.skFilter(false, Comp.ksPropsFilter));

    let allowProps = skProps;
    if (this.SK_COMP_NAME) {
      if (comp.NON_SK_COMP_NAME && (Comp.SK_PROPS_PREFIX.toUpperCase() + comp.NON_SK_COMP_NAME) === this.SK_COMP_NAME) {
        //SK COMP to AntD
        allowProps = allowProps.concat(Reacts.P.skVals());
      }
      if (this.SK_EXTEND_COMP_NAME && comp.SK_COMP_NAME === this.SK_COMP_NAME) {
        //SKFormInput to SKInput
        allowProps = allowProps.concat(Reacts.P.skVals());
      }
    }
    allowProps = Reacts.TAG[comp] ? SK.s4a(Reacts.TP[comp]) : allowProps.concat(ksProps);//if html node, nothing to do
    allowProps = comp.propTypes ? allowProps.concat(Object.keys(comp.propTypes)) : allowProps;
    allowProps = allowProps.concat(this.allowTransProps2Self(comp, prop));

    let denyProps = [Comp.SK_PROPS.COMP_TAG, Comp.SK_PROPS.MODEL_ID];//force ignore props
    denyProps = denyProps.concat(this.denyTransProps2Self(comp, prop));

    return _.omit(_.pick(prop, allowProps), denyProps);
  }

  /**
   * set/get value for modelId
   *
   * @param {*} val
   * @returns {*}
   */
  skVal(val) {
    if (arguments.length > 0) {
      this.skModel().skVal(this.getModelId(), val);
      return this;
    } else {
      return this.skModel().skVal(this.getModelId());
    }
  }
}
