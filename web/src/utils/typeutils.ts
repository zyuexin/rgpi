/** 非空字符串 */
export type NonEmptyString<T extends string> = Exclude<'', T>;
