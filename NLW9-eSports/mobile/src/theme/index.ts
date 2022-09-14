import { extendTheme } from "native-base";

export const THEME = extendTheme({
  colors: {
    gray: {
      300: "#D4D4D8",
      400: "#A1A1AA",
      500: "#71717A",
      700: "#2A2634",
      800: "#18181B",
      900: "#121214",
    },

    primary: {
      500: "#8B5CF6",
    },

    green: {
      700: "#34D399",
    },

    warning: {
      500: "#F87171",
    },

    FOOTER: ["rgba(0,0,0,0)", "rgba(0,0,0,0.9)"],
    OVERLAY: "rgba(0,0,0,0.6)",
  },

  fontConfig: {
    Inter: {
      400: {
        normal: "Inter_400Regular",
      },

      600: {
        normal: "Inter_600SemiBold",
      },

      700: {
        normal: "Inter_700Bold",
      },

      900: {
        normal: "Inter_900Black",
      },
    },
  },

  fonts: {
    heading: "Inter",
    body: "Inter",
  },
});
