import React from 'react';
import { MosaicContext } from './contextTypes';
import { CreateNode, MosaicKey } from './types';
export interface MosaicZeroStateProps<T extends MosaicKey> {
    createNode?: CreateNode<T>;
}
export declare class MosaicZeroState<T extends MosaicKey> extends React.PureComponent<MosaicZeroStateProps<T>> {
    static contextType: React.Context<MosaicContext<MosaicKey>>;
    context: MosaicContext<T>;
    render(): React.JSX.Element;
    private replace;
}
