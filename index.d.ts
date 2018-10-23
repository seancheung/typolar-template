/**
 * Parse template
 *
 * @param template Template content
 * @param vars Variables used in template
 */
declare function parse(template: string, vars: { [x: string]: any }): string;

export = parse;
