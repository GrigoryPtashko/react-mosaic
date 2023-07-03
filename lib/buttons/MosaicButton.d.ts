import React from 'react';
export declare const DefaultToolbarButton: ({ title, className, onClick, text, }: {
    title: string;
    className: string;
    onClick: (event: React.MouseEvent<any>) => any;
    text?: string | undefined;
}) => React.JSX.Element;
/**
 * @deprecated: see @DefaultToolbarButton
 */
export declare const createDefaultToolbarButton: (title: string, className: string, onClick: (event: React.MouseEvent<any>) => any, text?: string) => React.JSX.Element;
export interface MosaicButtonProps {
    onClick?: () => void;
}
