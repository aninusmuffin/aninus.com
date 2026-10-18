import { defineConfig } from "@sugarcube-sh/cli";

export default defineConfig({
    resolver: "_src/design-tokens/tokens.resolver.json",
    variables: {
        permutations: [
            { input: { mode: "light" }, selector: ":root" },
            {
                input: { mode: "dark" },
                selector: ":root:has(#theme [value='system']:checked)",
                atRule: "@media (prefers-color-scheme: dark)"
            },
            {
                input: { mode: "dark" },
                selector: ":root:has(#theme [value='dark']:checked)",
            },
        ],
      path: "_src/styles/global/tokens.variables.gen.css",
      transforms: {
      fluid: {
        min: 360,
        max: 1240
        }
      }
    },

});