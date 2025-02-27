import { DragDropManager } from 'dnd-core';
import React from 'react';
import { MosaicKey, MosaicNode, ResizeOptions, TileRenderer } from './types';
export interface MosaicBaseProps<T extends MosaicKey> {
    /**
     * Lookup function to convert `T` to a displayable `JSX.Element`
     */
    renderTile: TileRenderer<T>;
    /**
     * Called when a user initiates any change to the tree (removing, adding, moving, resizing, etc.)
     */
    onChange?: (newNode: MosaicNode<T> | null) => void;
    /**
     * Called when a user completes a change (fires like above except for the interpolation during resizing)
     */
    onRelease?: (newNode: MosaicNode<T> | null) => void;
    /**
     * Additional classes to affix to the root element
     * Default: 'mosaic-blueprint-theme'
     */
    className?: string;
    /**
     * Options that control resizing
     * @see: [[ResizeOptions]]
     */
    resize?: ResizeOptions;
    /**
     * View to display when the current value is `null`
     * default: Simple NonIdealState view
     */
    zeroStateView?: JSX.Element;
    /**
     * Override the mosaicId passed to `react-dnd` to control how drag and drop works with other components
     * Note: does not support updating after instantiation
     * default: Random UUID
     */
    mosaicId?: string;
    /**
     * Make it possible to use different versions of Blueprint with `mosaic-blueprint-theme`
     * Note: does not support updating after instantiation
     * default: 'bp3'
     */
    blueprintNamespace?: string;
    /**
     * Override the react-dnd provider to allow applications to inject an existing drag and drop context
     */
    dragAndDropManager?: DragDropManager | undefined;
}
export interface MosaicControlledProps<T extends MosaicKey> extends MosaicBaseProps<T> {
    /**
     * The tree to render
     */
    value: MosaicNode<T> | null;
    onChange: (newNode: MosaicNode<T> | null) => void;
}
export interface MosaicUncontrolledProps<T extends MosaicKey> extends MosaicBaseProps<T> {
    /**
     * The initial tree to render, can be modified by the user
     */
    initialValue: MosaicNode<T> | null;
}
export type MosaicProps<T extends MosaicKey> = MosaicControlledProps<T> | MosaicUncontrolledProps<T>;
export interface MosaicState<T extends MosaicKey> {
    currentNode: MosaicNode<T> | null;
    lastInitialValue: MosaicNode<T> | null;
    mosaicId: string;
}
export declare class MosaicWithoutDragDropContext<T extends MosaicKey = string> extends React.PureComponent<MosaicProps<T>, MosaicState<T>> {
    static defaultProps: {
        onChange: () => undefined;
        zeroStateView: React.JSX.Element;
        className: string;
        blueprintNamespace: string;
    };
    static getDerivedStateFromProps(nextProps: Readonly<MosaicProps<MosaicKey>>, prevState: MosaicState<MosaicKey>): Partial<MosaicState<MosaicKey>> | null;
    state: MosaicState<T>;
    render(): React.JSX.Element;
    private getRoot;
    private updateRoot;
    private replaceRoot;
    private actions;
    private readonly childContext;
    private renderTree;
    private validateTree;
}
export declare class Mosaic<T extends MosaicKey = string> extends React.PureComponent<MosaicProps<T>> {
    render(): React.JSX.Element;
}
