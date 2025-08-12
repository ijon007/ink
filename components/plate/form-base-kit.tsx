import { createPlatePlugin } from 'platejs/react';
import { FormInputElement } from '@/components/ui/form-input-node';
import { FormTextareaElement } from '@/components/ui/form-textarea-node';
import { FormCheckboxElement } from '@/components/ui/form-checkbox-node';

// Create base form block plugins for static rendering
export const BaseFormKit = [
  createPlatePlugin({
    key: 'form-input',
    options: {},
  }).configure({
    node: { component: FormInputElement },
  }),
  createPlatePlugin({
    key: 'form-textarea',
    options: {},
  }).configure({
    node: { component: FormTextareaElement },
  }),
  createPlatePlugin({
    key: 'form-checkbox',
    options: {},
  }).configure({
    node: { component: FormCheckboxElement },
  }),
];
