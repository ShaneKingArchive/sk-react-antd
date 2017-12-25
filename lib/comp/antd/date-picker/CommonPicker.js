'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _skJs = require('sk-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CommonPicker = function CommonPicker() {
  _classCallCheck(this, CommonPicker);
};

CommonPicker.defaultProps = _skJs.SK.assign({}, {
  allowClear: true,
  autoFocus: false,
  className: _skJs.SK.EMPTY,
  disabled: false,
  popupStyle: {},
  style: {}
}, {});
CommonPicker.propTypes = _skJs.SK.assign({}, {
  //https://ant.design/components/date-picker-cn/#%E5%85%B1%E5%90%8C%E7%9A%84-API
  allowClear: _propTypes2.default.bool,
  autoFocus: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  dateRender: _propTypes2.default.func,
  disabled: _propTypes2.default.bool,
  disabledDate: _propTypes2.default.func,
  getCalendarContainer: _propTypes2.default.func,
  locale: _propTypes2.default.object,
  open: _propTypes2.default.bool,
  placeholder: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array]),
  popupStyle: _propTypes2.default.object,
  size: _propTypes2.default.string,
  style: _propTypes2.default.object,
  onOpenChange: _propTypes2.default.func
}, {});
exports.default = CommonPicker;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXAvYW50ZC9kYXRlLXBpY2tlci9Db21tb25QaWNrZXIuanMiXSwibmFtZXMiOlsiQ29tbW9uUGlja2VyIiwiZGVmYXVsdFByb3BzIiwiYXNzaWduIiwiYWxsb3dDbGVhciIsImF1dG9Gb2N1cyIsImNsYXNzTmFtZSIsIkVNUFRZIiwiZGlzYWJsZWQiLCJwb3B1cFN0eWxlIiwic3R5bGUiLCJwcm9wVHlwZXMiLCJib29sIiwic3RyaW5nIiwiZGF0ZVJlbmRlciIsImZ1bmMiLCJkaXNhYmxlZERhdGUiLCJnZXRDYWxlbmRhckNvbnRhaW5lciIsImxvY2FsZSIsIm9iamVjdCIsIm9wZW4iLCJwbGFjZWhvbGRlciIsIm9uZU9mVHlwZSIsImFycmF5Iiwic2l6ZSIsIm9uT3BlbkNoYW5nZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0lBRXFCQSxZOzs7O0FBQUFBLFksQ0FDWkMsWSxHQUFlLFNBQUdDLE1BQUgsQ0FBVSxFQUFWLEVBQWM7QUFDbENDLGNBQVksSUFEc0I7QUFFbENDLGFBQVcsS0FGdUI7QUFHbENDLGFBQVcsU0FBR0MsS0FIb0I7QUFJbENDLFlBQVUsS0FKd0I7QUFLbENDLGNBQVksRUFMc0I7QUFNbENDLFNBQU87QUFOMkIsQ0FBZCxFQU9uQixFQVBtQixDO0FBREhULFksQ0FTWlUsUyxHQUFZLFNBQUdSLE1BQUgsQ0FBVSxFQUFWLEVBQWM7QUFDL0I7QUFDQUMsY0FBWSxvQkFBVVEsSUFGUztBQUcvQlAsYUFBVyxvQkFBVU8sSUFIVTtBQUkvQk4sYUFBVyxvQkFBVU8sTUFKVTtBQUsvQkMsY0FBWSxvQkFBVUMsSUFMUztBQU0vQlAsWUFBVSxvQkFBVUksSUFOVztBQU8vQkksZ0JBQWMsb0JBQVVELElBUE87QUFRL0JFLHdCQUFzQixvQkFBVUYsSUFSRDtBQVMvQkcsVUFBUSxvQkFBVUMsTUFUYTtBQVUvQkMsUUFBTSxvQkFBVVIsSUFWZTtBQVcvQlMsZUFBYSxvQkFBVUMsU0FBVixDQUFvQixDQUMvQixvQkFBVVQsTUFEcUIsRUFFL0Isb0JBQVVVLEtBRnFCLENBQXBCLENBWGtCO0FBZS9CZCxjQUFZLG9CQUFVVSxNQWZTO0FBZ0IvQkssUUFBTSxvQkFBVVgsTUFoQmU7QUFpQi9CSCxTQUFPLG9CQUFVUyxNQWpCYztBQWtCL0JNLGdCQUFjLG9CQUFVVjtBQWxCTyxDQUFkLEVBbUJoQixFQW5CZ0IsQztrQkFUQWQsWSIsImZpbGUiOiJjb21wL2FudGQvZGF0ZS1waWNrZXIvQ29tbW9uUGlja2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7U0t9IGZyb20gJ3NrLWpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tbW9uUGlja2VyIHtcbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IFNLLmFzc2lnbih7fSwge1xuICAgIGFsbG93Q2xlYXI6IHRydWUsXG4gICAgYXV0b0ZvY3VzOiBmYWxzZSxcbiAgICBjbGFzc05hbWU6IFNLLkVNUFRZLFxuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICBwb3B1cFN0eWxlOiB7fSxcbiAgICBzdHlsZToge31cbiAgfSwge30pO1xuICBzdGF0aWMgcHJvcFR5cGVzID0gU0suYXNzaWduKHt9LCB7XG4gICAgLy9odHRwczovL2FudC5kZXNpZ24vY29tcG9uZW50cy9kYXRlLXBpY2tlci1jbi8jJUU1JTg1JUIxJUU1JTkwJThDJUU3JTlBJTg0LUFQSVxuICAgIGFsbG93Q2xlYXI6IFByb3BUeXBlcy5ib29sLFxuICAgIGF1dG9Gb2N1czogUHJvcFR5cGVzLmJvb2wsXG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRhdGVSZW5kZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBkaXNhYmxlZERhdGU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGdldENhbGVuZGFyQ29udGFpbmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBsb2NhbGU6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgb3BlbjogUHJvcFR5cGVzLmJvb2wsXG4gICAgcGxhY2Vob2xkZXI6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5hcnJheVxuICAgIF0pLFxuICAgIHBvcHVwU3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgc2l6ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBvbk9wZW5DaGFuZ2U6IFByb3BUeXBlcy5mdW5jXG4gIH0sIHt9KTtcbn1cbiJdfQ==