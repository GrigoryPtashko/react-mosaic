import React from 'react';
import { MosaicDropTargetPosition } from './internalTypes';
import { MosaicPath } from './types';
export interface MosaicDropTargetProps {
    position: MosaicDropTargetPosition;
    path: MosaicPath;
}
export declare function MosaicDropTarget({ path, position }: MosaicDropTargetProps): React.JSX.Element;
