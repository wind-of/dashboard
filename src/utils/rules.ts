export const emailPattern =
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

export const rules = {
  required: (value: any | any[]) =>
    (value !== null && value !== undefined && typeof value === "string" && value.length > 0) ||
    "Field is required",
  minLength: (minLength: number) => (value: any | any[]) =>
    value.length >= minLength || `Min length: ${minLength}`,
  maxLength: (maxLength: number) => (value: any | any[]) =>
    value.length <= maxLength || `Max length: ${maxLength}`,
  toMatch: (firstValue: any) => (value: any | any[]) =>
    firstValue === value || `Must match: ${firstValue}`,
  email: (value: string) => emailPattern.test(value.toLowerCase()) || "Invalid email"
}
