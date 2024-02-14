export const emailPattern =
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

export const rules = {
  required: (value: any | any[]) =>
    value !== null && value !== undefined && typeof value === "string" && value.length > 0,
  minLength: (value: any | any[], minLength: number) => value.length >= minLength,
  maxLength: (value: any | any[], maxLength: number) => value.length <= maxLength,
  toMatch: (firstValue: any) => (value: any | any[]) => firstValue === value,
  email: (value: string) => emailPattern.test(value.toLowerCase())
}
