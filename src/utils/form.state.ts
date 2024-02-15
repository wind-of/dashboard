import { reactive, watch } from "vue"

interface FormState {
  [key: string]: { value: string; error: string }
}

export function createFormState(fields: string[], rules: { [key: string]: Function[] }): FormState {
  const plainState = fields.reduce((state, field) => {
    state[field] = {
      value: "",
      error: ""
    }
    return state
  }, {} as FormState)
  const state = reactive(plainState)
  for (const field of fields) {
    watch(state[field], () => {
      const value = state[field].value.trim()
      const errorRule = rules[field].find((rule) => rule(value) !== true)
      if (errorRule === undefined) {
        return (state[field].error = "")
      }
      state[field].error = errorRule(value) || `Invalid ${field}`
    })
  }
  return state
}
