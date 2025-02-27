"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpandButton = void 0;
var classnames_1 = __importDefault(require("classnames"));
var react_1 = __importDefault(require("react"));
var contextTypes_1 = require("../contextTypes");
var OptionalBlueprint_1 = require("../util/OptionalBlueprint");
var MosaicButton_1 = require("./MosaicButton");
var ExpandButton = exports.ExpandButton = /** @class */ (function (_super) {
    __extends(ExpandButton, _super);
    function ExpandButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExpandButton.prototype.render = function () {
        var _this = this;
        return (react_1.default.createElement(contextTypes_1.MosaicContext.Consumer, null, function (_a) {
            var mosaicActions = _a.mosaicActions;
            return (react_1.default.createElement(MosaicButton_1.DefaultToolbarButton, { title: "Expand", className: (0, classnames_1.default)('expand-button', OptionalBlueprint_1.OptionalBlueprint.getIconClass(_this.context.blueprintNamespace, 'MAXIMIZE')), onClick: _this.createExpand(mosaicActions) }));
        }));
    };
    ExpandButton.prototype.createExpand = function (mosaicActions) {
        var _this = this;
        return function () {
            mosaicActions.expand(_this.context.mosaicWindowActions.getPath());
            if (_this.props.onClick) {
                _this.props.onClick();
            }
        };
    };
    ExpandButton.contextType = contextTypes_1.MosaicWindowContext;
    return ExpandButton;
}(react_1.default.PureComponent));
//# sourceMappingURL=ExpandButton.js.map