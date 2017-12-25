import _ from 'lodash';
import React from 'react';
import createHistory from 'history/createBrowserHistory';

export default class Reacts {

  /**
   * Count the number of "valid components" in the Children container.
   *
   * @param {?*} children Children tree container.
   * @returns {number}
   */
  static count(children) {
    let result = 0;

    React.Children.forEach(children, child => {
      if (!React.isValidElement(child)) {
        return;
      }

      ++result;
    });

    return result;
  }

  /**
   * Safe chained function
   *
   * @param {function} funcs to chain
   * @returns {function|null}
   */
  static createChainedFunction(...funcs) {
    return funcs
      .filter(f => f != null)
      .reduce((acc, f) => {
        if (!_.isFunction(f)) {
          throw new Error('Invalid Argument Type, must only provide functions, undefined, or null.');
        }

        if (acc === null) {
          return f;
        }

        return function chainedFunction(...args) {
          acc.apply(this, args);
          f.apply(this, args);
        };
      }, null);
  }

  static every(children, func, context) {
    let index = 0;
    let result = true;

    React.Children.forEach(children, child => {
      if (!result) {
        return;
      }
      if (!React.isValidElement(child)) {
        return;
      }

      if (!func.call(context, child, index++)) {
        result = false;
      }
    });

    return result;
  }

  /**
   * Finds children that are typically specified as `props.children`,
   * but only iterates over children that are "valid components".
   *
   * The provided forEachFunc(child, index) will be called for each
   * leaf child with the index reflecting the position relative to "valid components".
   *
   * @param {?*} children Children tree container.
   * @param {function(*, int)} func.
   * @param {*} context Context for func.
   * @returns {array} of children that meet the func return statement
   */
  static filter(children, func, context) {
    let index = 0;
    let result = [];

    React.Children.forEach(children, child => {
      if (!React.isValidElement(child)) {
        return;
      }

      if (func.call(context, child, index++)) {
        result.push(child);
      }
    });

    return result;
  }

  static find(children, func, context) {
    let index = 0;
    let result = undefined;

    React.Children.forEach(children, child => {
      if (result) {
        return;
      }
      if (!React.isValidElement(child)) {
        return;
      }

      if (func.call(context, child, index++)) {
        result = child;
      }
    });

    return result;
  }

  /**
   * Iterates through children that are "valid components".
   *
   * The provided forEachFunc(child, index) will be called for each
   * leaf child with the index reflecting the position relative to "valid components".
   *
   * @param {?*} children Children tree container.
   * @param {function(*, int)} func.
   * @param {*} context Context for context.
   */
  static forEach(children, func, context) {
    let index = 0;

    React.Children.forEach(children, child => {
      if (!React.isValidElement(child)) {
        return;
      }

      func.call(context, child, index++);
    });
  }

  /**
   * forward
   *
   * @param url like /dashboard
   */
  static forward(url) {
    createHistory().push({pathname: url});
  }

  /**
   * Iterates through children that are typically specified as `props.children`,
   * but only maps over children that are "valid components".
   *
   * The mapFunction provided index will be normalised to the components mapped,
   * so an invalid component would not increase the index.
   *
   * @param {?*} children Children tree container.
   * @param {function(*, int)} func.
   * @param {*} context Context for func.
   * @return {object} Object containing the ordered map of results.
   */
  static map(children, func, context) {
    let index = 0;

    return React.Children.map(children, child => {
      if (!React.isValidElement(child)) {
        return child;
      }

      return func.call(context, child, index++);
    });
  }

  static some(children, func, context) {
    let index = 0;
    let result = false;

    React.Children.forEach(children, child => {
      if (result) {
        return;
      }
      if (!React.isValidElement(child)) {
        return;
      }

      if (func.call(context, child, index++)) {
        result = true;
      }
    });

    return result;
  }

  static toArray(children) {
    const result = [];

    React.Children.forEach(children, child => {
      if (!React.isValidElement(child)) {
        return;
      }

      result.push(child);
    });

    return result;
  }
}