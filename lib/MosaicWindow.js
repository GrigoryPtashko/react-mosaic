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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MosaicWindow = exports.InternalMosaicWindow = void 0;
var classnames_1 = __importDefault(require("classnames"));
var defer_1 = __importDefault(require("lodash/defer"));
var dropRight_1 = __importDefault(require("lodash/dropRight"));
var isEmpty_1 = __importDefault(require("lodash/isEmpty"));
var isEqual_1 = __importDefault(require("lodash/isEqual"));
var values_1 = __importDefault(require("lodash/values"));
var react_1 = __importStar(require("react"));
var react_dnd_1 = require("react-dnd");
var defaultToolbarControls_1 = require("./buttons/defaultToolbarControls");
var Separator_1 = require("./buttons/Separator");
var contextTypes_1 = require("./contextTypes");
var internalTypes_1 = require("./internalTypes");
var MosaicDropTarget_1 = require("./MosaicDropTarget");
var types_1 = require("./types");
var mosaicUpdates_1 = require("./util/mosaicUpdates");
var mosaicUtilities_1 = require("./util/mosaicUtilities");
var OptionalBlueprint_1 = require("./util/OptionalBlueprint");
var InternalMosaicWindow = exports.InternalMosaicWindow = /** @class */ (function (_super) {
    __extends(InternalMosaicWindow, _super);
    function InternalMosaicWindow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            additionalControlsOpen: false,
        };
        _this.rootElement = null;
        _this.renderDropTarget = function (position) {
            var path = _this.props.path;
            return react_1.default.createElement(MosaicDropTarget_1.MosaicDropTarget, { position: position, path: path, key: position });
        };
        _this.split = function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            _this.checkCreateNode();
            var createNode = (_a = _this.props, _a.createNode), path = _a.path;
            var mosaicActions = _this.context.mosaicActions;
            var root = mosaicActions.getRoot();
            var direction = _this.rootElement.offsetWidth > _this.rootElement.offsetHeight ? 'row' : 'column';
            return Promise.resolve(createNode.apply(void 0, args)).then(function (second) {
                return mosaicActions.replaceWith(path, {
                    direction: direction,
                    second: second,
                    first: (0, mosaicUtilities_1.getAndAssertNodeAtPathExists)(root, path),
                });
            });
        };
        _this.swap = function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            _this.checkCreateNode();
            var mosaicActions = _this.context.mosaicActions;
            var createNode = (_a = _this.props, _a.createNode), path = _a.path;
            return Promise.resolve(createNode.apply(void 0, args)).then(function (node) { return mosaicActions.replaceWith(path, node); });
        };
        _this.setAdditionalControlsOpen = function (additionalControlsOpen) {
            var _a, _b;
            _this.setState({ additionalControlsOpen: additionalControlsOpen });
            (_b = (_a = _this.props).onAdditionalControlsToggle) === null || _b === void 0 ? void 0 : _b.call(_a, additionalControlsOpen);
        };
        _this.getPath = function () { return _this.props.path; };
        _this.connectDragSource = function (connectedElements) {
            var connectDragSource = _this.props.connectDragSource;
            return connectDragSource(connectedElements);
        };
        _this.childContext = {
            blueprintNamespace: _this.context.blueprintNamespace,
            mosaicWindowActions: {
                split: _this.split,
                replaceWithNew: _this.swap,
                setAdditionalControlsOpen: _this.setAdditionalControlsOpen,
                getPath: _this.getPath,
                connectDragSource: _this.connectDragSource,
            },
        };
        return _this;
    }
    InternalMosaicWindow.prototype.render = function () {
        var _a;
        var _this = this;
        var className = (_a = this.props, _a.className), isOver = _a.isOver, renderPreview = _a.renderPreview, additionalControls = _a.additionalControls, connectDropTarget = _a.connectDropTarget, connectDragPreview = _a.connectDragPreview, draggedMosaicId = _a.draggedMosaicId;
        return (react_1.default.createElement(contextTypes_1.MosaicWindowContext.Provider, { value: this.childContext }, connectDropTarget(react_1.default.createElement("div", { className: (0, classnames_1.default)('mosaic-window mosaic-drop-target', className, {
                'drop-target-hover': isOver && draggedMosaicId === this.context.mosaicId,
                'additional-controls-open': this.state.additionalControlsOpen,
            }), ref: function (element) { return (_this.rootElement = element); } },
            this.renderToolbar(),
            react_1.default.createElement("div", { className: "mosaic-window-body" }, this.props.children),
            react_1.default.createElement("div", { className: "mosaic-window-body-overlay", onClick: function () { return _this.setAdditionalControlsOpen(false); } }),
            react_1.default.createElement("div", { className: "mosaic-window-additional-actions-bar" }, additionalControls),
            connectDragPreview(renderPreview(this.props)),
            react_1.default.createElement("div", { className: "drop-target-container" }, (0, values_1.default)(internalTypes_1.MosaicDropTargetPosition).map(this.renderDropTarget))))));
    };
    InternalMosaicWindow.prototype.getToolbarControls = function () {
        var _a;
        var toolbarControls = (_a = this.props, _a.toolbarControls), createNode = _a.createNode;
        if (toolbarControls) {
            return toolbarControls;
        }
        else if (createNode) {
            return defaultToolbarControls_1.DEFAULT_CONTROLS_WITH_CREATION;
        }
        else {
            return defaultToolbarControls_1.DEFAULT_CONTROLS_WITHOUT_CREATION;
        }
    };
    InternalMosaicWindow.prototype.renderToolbar = function () {
        var _a, _b;
        var _this = this;
        var title = (_a = this.props, _a.title), draggable = _a.draggable, additionalControls = _a.additionalControls, additionalControlButtonText = _a.additionalControlButtonText, path = _a.path, renderToolbar = _a.renderToolbar;
        var additionalControlsOpen = this.state.additionalControlsOpen;
        var toolbarControls = this.getToolbarControls();
        var draggableAndNotRoot = draggable && path.length > 0;
        var connectIfDraggable = draggableAndNotRoot ? this.props.connectDragSource : function (el) { return el; };
        if (renderToolbar) {
            var connectedToolbar = connectIfDraggable(renderToolbar(this.props, draggable));
            return (react_1.default.createElement("div", { className: (0, classnames_1.default)('mosaic-window-toolbar', { draggable: draggableAndNotRoot }) }, connectedToolbar));
        }
        var titleDiv = connectIfDraggable(react_1.default.createElement("div", { title: title, className: "mosaic-window-title" }, title));
        var hasAdditionalControls = !(0, isEmpty_1.default)(additionalControls);
        return (react_1.default.createElement("div", { className: (0, classnames_1.default)('mosaic-window-toolbar', { draggable: draggableAndNotRoot }) },
            titleDiv,
            react_1.default.createElement("div", { className: (0, classnames_1.default)('mosaic-window-controls', OptionalBlueprint_1.OptionalBlueprint.getClasses('BUTTON_GROUP')) },
                hasAdditionalControls && (react_1.default.createElement("button", { onClick: function () { return _this.setAdditionalControlsOpen(!additionalControlsOpen); }, className: (0, classnames_1.default)(OptionalBlueprint_1.OptionalBlueprint.getClasses(this.context.blueprintNamespace, 'BUTTON', 'MINIMAL'), OptionalBlueprint_1.OptionalBlueprint.getIconClass(this.context.blueprintNamespace, 'MORE'), (_b = {},
                        _b[OptionalBlueprint_1.OptionalBlueprint.getClasses(this.context.blueprintNamespace, 'ACTIVE')] = additionalControlsOpen,
                        _b)) },
                    react_1.default.createElement("span", { className: "control-text" }, additionalControlButtonText))),
                hasAdditionalControls && react_1.default.createElement(Separator_1.Separator, null),
                toolbarControls)));
    };
    InternalMosaicWindow.prototype.checkCreateNode = function () {
        if (this.props.createNode == null) {
            throw new Error('Operation invalid unless `createNode` is defined');
        }
    };
    InternalMosaicWindow.defaultProps = {
        additionalControlButtonText: 'More',
        draggable: true,
        renderPreview: function (_a) {
            var title = _a.title;
            return (react_1.default.createElement("div", { className: "mosaic-preview" },
                react_1.default.createElement("div", { className: "mosaic-window-toolbar" },
                    react_1.default.createElement("div", { className: "mosaic-window-title" }, title)),
                react_1.default.createElement("div", { className: "mosaic-window-body" },
                    react_1.default.createElement("h4", null, title),
                    react_1.default.createElement(OptionalBlueprint_1.OptionalBlueprint.Icon, { className: "default-preview-icon", size: "large", icon: "APPLICATION" }))));
        },
        renderToolbar: null,
    };
    InternalMosaicWindow.contextType = contextTypes_1.MosaicContext;
    return InternalMosaicWindow;
}(react_1.default.Component));
function ConnectedInternalMosaicWindow(props) {
    var _a = (0, react_1.useContext)(contextTypes_1.MosaicContext), mosaicActions = _a.mosaicActions, mosaicId = _a.mosaicId;
    var _b = (0, react_dnd_1.useDrag)({
        type: types_1.MosaicDragType.WINDOW,
        item: function (_monitor) {
            if (props.onDragStart) {
                props.onDragStart();
            }
            // TODO: Actually just delete instead of hiding
            // The defer is necessary as the element must be present on start for HTML DnD to not cry
            var hideTimer = (0, defer_1.default)(function () { return mosaicActions.hide(props.path); });
            return {
                mosaicId: mosaicId,
                hideTimer: hideTimer,
            };
        },
        end: function (item, monitor) {
            var hideTimer = item.hideTimer;
            // If the hide call hasn't happened yet, cancel it
            window.clearTimeout(hideTimer);
            var ownPath = props.path;
            var dropResult = (monitor.getDropResult() || {});
            var position = dropResult.position, destinationPath = dropResult.path;
            if (position != null && destinationPath != null && !(0, isEqual_1.default)(destinationPath, ownPath)) {
                mosaicActions.updateTree((0, mosaicUpdates_1.createDragToUpdates)(mosaicActions.getRoot(), ownPath, destinationPath, position));
                if (props.onDragEnd) {
                    props.onDragEnd('drop');
                }
            }
            else {
                // TODO: restore node from captured state
                mosaicActions.updateTree([
                    {
                        path: (0, dropRight_1.default)(ownPath),
                        spec: {
                            splitPercentage: {
                                $set: undefined,
                            },
                        },
                    },
                ]);
                if (props.onDragEnd) {
                    props.onDragEnd('reset');
                }
            }
        },
    }), connectDragSource = _b[1], connectDragPreview = _b[2];
    var _c = (0, react_dnd_1.useDrop)({
        accept: types_1.MosaicDragType.WINDOW,
        collect: function (monitor) {
            var _a;
            return ({
                isOver: monitor.isOver(),
                draggedMosaicId: (_a = monitor.getItem()) === null || _a === void 0 ? void 0 : _a.mosaicId,
            });
        },
    }), _d = _c[0], isOver = _d.isOver, draggedMosaicId = _d.draggedMosaicId, connectDropTarget = _c[1];
    return (react_1.default.createElement(InternalMosaicWindow, __assign({}, props, { connectDragPreview: connectDragPreview, connectDragSource: connectDragSource, connectDropTarget: connectDropTarget, isOver: isOver, draggedMosaicId: draggedMosaicId })));
}
var MosaicWindow = /** @class */ (function (_super) {
    __extends(MosaicWindow, _super);
    function MosaicWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MosaicWindow.prototype.render = function () {
        return react_1.default.createElement(ConnectedInternalMosaicWindow, __assign({}, this.props));
    };
    return MosaicWindow;
}(react_1.default.PureComponent));
exports.MosaicWindow = MosaicWindow;
//# sourceMappingURL=MosaicWindow.js.map