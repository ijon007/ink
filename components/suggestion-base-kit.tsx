import { BaseSuggestionPlugin } from '@platejs/suggestion';

import { SuggestionLeafStatic } from '@/components/ui/suggestion-node-static';
import { BaseFormKit } from '@/components/plate/form-base-kit';

export const BaseSuggestionKit = [
  BaseSuggestionPlugin.withComponent(SuggestionLeafStatic),
  ...BaseFormKit,
];
