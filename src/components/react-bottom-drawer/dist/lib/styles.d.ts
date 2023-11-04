export declare const TransitionStyles: {
    entering: {
        transform: string;
    };
    entered: {
        transform: string;
    };
    exiting: {
        transform: string;
    };
    exited: {
        display: string;
    };
};
export declare const BackdropStyles: {
    entering: {
        opacity: string;
    };
    entered: {
        opacity: string;
    };
    exiting: {
        opacity: string;
    };
    exited: {
        display: string;
    };
};
export interface ICustomizations {
    duration: number;
    hideScrollbars: boolean;
}
export declare const getClassNames: (identifier: string) => {
    backdrop: string;
    drawer: string;
    handleWrapper: string;
    handle: string;
    contentWrapper: string;
};
declare const globalStylesheet: (identifier: string, { duration, hideScrollbars }: ICustomizations) => string;
export default globalStylesheet;
