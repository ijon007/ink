import { createPlatePlugin } from "platejs/react";
import { NewPageElement } from "../ui/new-page-node";

const NewPagePlugin = createPlatePlugin({
    key: 'new-page',
    node: {
      isElement: true,
      type: 'new-page',
      component: NewPageElement,
    },
})

export const NewPageKit = [NewPagePlugin]