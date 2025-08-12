import { createPlatePlugin } from "platejs/react";
import { FormInputElement } from "../ui/form-input-node";
import { FormTextareaElement } from "../ui/form-textarea-node";
import { FormCheckboxElement } from "../ui/form-checkbox-node";

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

export const FormKit = [
  FormInputPlugin,
  FormTextareaPlugin,
  FormCheckboxPlugin,
];