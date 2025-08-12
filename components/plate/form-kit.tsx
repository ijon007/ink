import { createPlatePlugin } from "platejs/react";
import { FormInputElement } from "../ui/form-input-node";
import { FormTextareaElement } from "../ui/form-textarea-node";
import { FormCheckboxElement } from "../ui/form-checkbox-node";
import { FormMultipleChoiceElement } from "../ui/form-multiple-choice-node";
import { FormDatePickerElement } from "../ui/form-date-picker-node";

const FormInputPlugin = createPlatePlugin({
  key: 'form-input',
  node: {
    isElement: true,
    isVoid: true,
    type: 'form-input',
    component: FormInputElement,
  },
})

const FormTextareaPlugin = createPlatePlugin({
  key: 'form-textarea',
  node: {
    isElement: true,
    isVoid: true,
    type: 'form-textarea',
    component: FormTextareaElement,
  },
})

const FormCheckboxPlugin = createPlatePlugin({
  key: 'form-checkbox',
  node: {
    isElement: true,
    isVoid: true,
    type: 'form-checkbox',
    component: FormCheckboxElement,
  },
})

const FormMultipleChoicePlugin = createPlatePlugin({
  key: 'form-multiple-choice',
  node: {
    isElement: true,
    isVoid: true,
    type: 'form-multiple-choice',
    component: FormMultipleChoiceElement,
  },
})

const FormDatePickerPlugin = createPlatePlugin({
  key: 'form-date-picker',
  node: {
    isElement: true,
    isVoid: true,
    type: 'form-date-picker',
    component: FormDatePickerElement,
  },
})

export const FormKit = [
  FormInputPlugin,
  FormTextareaPlugin,
  FormCheckboxPlugin,
  FormMultipleChoicePlugin,
  FormDatePickerPlugin,
];