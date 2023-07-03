import type { Classes } from '@blueprintjs/core';
import type { IconNames } from '@blueprintjs/icons';
import * as React from 'react';
export declare namespace OptionalBlueprint {
    export const Icon: ({ icon, className, size, }: {
        icon: keyof typeof IconNames;
        className?: string | undefined;
        size?: "standard" | "large" | undefined;
    }) => React.JSX.Element;
    type BlueprintClass = {
        [K in keyof typeof Classes]: (typeof Classes)[K] extends string ? K : never;
    }[keyof typeof Classes];
    export function getClasses(blueprintNamespace: string, ...names: BlueprintClass[]): string;
    export function getIconClass(blueprintNamespace: string, iconName: keyof typeof IconNames): string;
    export {};
}
