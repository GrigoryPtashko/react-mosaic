import React from 'react';
import { MosaicContext } from './contextTypes';
import { MosaicKey, MosaicNode, ResizeOptions, TileRenderer } from './types';
export interface MosaicRootProps<T extends MosaicKey> {
    root: MosaicNode<T>;
    renderTile: TileRenderer<T>;
    resize?: ResizeOptions;
}
export declare class MosaicRoot<T extends MosaicKey> extends React.PureComponent<MosaicRootProps<T>> {
    static contextType: React.Context<MosaicContext<MosaicKey>>;
    context: MosaicContext<T>;
    render(): React.JSX.Element;
    private renderRecursively;
    private renderSplit;
    private onResize;
}
