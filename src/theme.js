import { extendTheme } from "@chakra-ui/react";

const config = {
    initialColorMode: "dark",
    useSystemColorMode: false,
};

const colors = {
    brand: {
        navy: "#181B25",
        navyDark: "#12151C",
        grey: "#6e7ba0",
        green: "#64FFDA",
    },
};

const semanticTokens = {
    colors: {
        // Background colors
        "bg.primary": {
            default: "#FFFFFF",
            _dark: "#0E1016",
        },
        "bg.secondary": {
            default: "#F7FAFC",
            _dark: "#1A202C",
        },
        "bg.tertiary": {
            default: "#EDF2F7",
            _dark: "#232A3A",
        },
        "bg.card": {
            default: "#FFFFFF",
            _dark: "#232A3A",
        },
        "bg.hover": {
            default: "#EDF2F7",
            _dark: "#181B25",
        },

        // Text colors
        "text.primary": {
            default: "#1A202C",
            _dark: "#ECEEF3",
        },
        "text.secondary": {
            default: "#4A5568",
            _dark: "#ACB2C9",
        },
        "text.tertiary": {
            default: "#718096",
            _dark: "#6e7ba0",
        },
        "text.heading": {
            default: "#000000",
            _dark: "#ECEEF3",
        },

        // Border colors
        "border.primary": {
            default: "#E2E8F0",
            _dark: "#2D3748",
        },
        "border.secondary": {
            default: "#CBD5E0",
            _dark: "#4A5568",
        },

        // Accent colors
        "accent.primary": {
            default: "#3182CE",
            _dark: "#64FFDA",
        },
        "accent.hover": {
            default: "#2C5282",
            _dark: "#52E3C2",
        },

        // Icon colors
        "icon.primary": {
            default: "#4A5568",
            _dark: "#ACB2C9",
        },
        "icon.hover": {
            default: "#1A202C",
            _dark: "#ECEEF3",
        },

        // Grid/divider colors
        "divider.color": {
            default: "#E2E8F0",
            _dark: "#2D3748",
        },

        // Overlay colors
        "overlay.bg": {
            default: "rgba(255, 255, 255, 0.7)",
            _dark: "rgba(35, 42, 58, 0.6)",
        },
    },
};

const fonts = {
    heading: "Calibre, sans-serif",
    body: "Calibre, sans-serif",
    mono: "SF Mono, monospace",
};

const styles = {
    global: (props) => ({
        body: {
            bg: props.colorMode === "dark" ? "#0E1016" : "#FFFFFF",
            color: props.colorMode === "dark" ? "#ECEEF3" : "#1A202C",
        },
    }),
};

const theme = extendTheme({
    config,
    colors,
    semanticTokens,
    fonts,
    styles,
});

export default theme;
