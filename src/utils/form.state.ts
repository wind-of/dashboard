import { reactive, watch } from "vue"

type FormStateFieldValue = any
interface FormStateField {
  value: FormStateFieldValue
  error: string
}
interface FormStatePlain {
  [key: string]: FormStateFieldValue
}
type FormState = { plain(): FormStatePlain } & {
  [key: string]: FormStateField
}

export function createFormState(
  fields: string[],
  rules: { [key: string]: Function[] },
  defaults?: FormStatePlain
): FormState {
  const plainState = fields.reduce((state, field) => {
    state[field] = {
      value: defaults?.[field] || "",
      error: ""
    }
    return state
  }, {} as FormState)
  const state = reactive(plainState)
  for (const field of fields) {
    watch(state[field], () => {
      const value =
        typeof state[field].value == "string" ? state[field].value.trim() : state[field].value
      const errorRule = rules[field]?.find((rule) => rule(value) !== true)
      if (errorRule === undefined) {
        return (state[field].error = "")
      }
      state[field].error = errorRule(value) || `Invalid ${field}`
    })
  }
  state.plain = function () {
    const plain: FormStatePlain = {}
    for (const field of fields) {
      plain[field] = state[field].value
    }
    return plain
  }
  return state
}
