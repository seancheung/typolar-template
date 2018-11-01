/**
 * Parse template
 *
 * @param template Template content
 * @param vars Variables used in template
 */
declare function parse(
    template: string,
    vars: { [x: string]: any },
    options?: Partial<Options>
): string;

interface Options {
    /**
     * Bypass non-syntax error
     */
    silent: boolean;
}

export = parse;
