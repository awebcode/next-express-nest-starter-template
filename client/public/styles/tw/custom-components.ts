// custom-components.ts

import plugin from "tailwindcss/plugin";

export default plugin(({ addComponents, theme }) => {
  addComponents({
    // Adding text styles
    ".text-heading1": {
      "@apply scroll-m-20 text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight":
        {},
    },
    ".text-heading2": {
      "@apply scroll-m-16 text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight":
        {},
    },
    ".text-paragraph": {
      "@apply text-base leading-8 tracking-wide text-neutral-600 dark:text-neutral-200 font-normal":
        {},
    },
    // Adding flex styles
    ".flex-center": {
      "@apply flex justify-center items-center": {},
    },
    ".flex-between": {
      "@apply flex justify-between items-center": {},
    },
  });
});
