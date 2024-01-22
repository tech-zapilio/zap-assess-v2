import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const token = {
  primary: {
    25: "#FFFAF5",
    50: "#FFF6ED",
    100: "#FFEAD5",
    200: "#FDDCAB",
    300: "#FEB273",
    400: "#FD853A",
    500: "#FB6514",
    600: "#EC4A0A",
    700: "#C4320A",
    800: "#53389E",
    900: "#42307D",
  },
  warning: {
    25: "#FFFCF5",
    50: "#FFFAEB",
    100: "#FEF0C7",
    200: "#FEDF89",
    300: "#FEC84B",
    400: "#FDB022",
    500: "#F79009",
    600: "#DC6803",
    700: "#B54708",
    800: "#9C2A10",
    900: "#7E2410",
  },
  success: {
    25: "#F6FEF9",
    50: "#ECFDF3",
    100: "#D1FADF",
    200: "#A6F4C5",
    300: "#6CE9A6",
    400: "#32D583",
    500: "#12B76A",
    600: "#039855",
    700: "#027A48",
    800: "#05603A",
    900: "#054F31",
  },
  grey: {
    25: "#FCFCFD",
    50: "#F9FAFB",
    100: "#F2F4F7",
    200: "#EAECF0",
    300: "#D0D5DD",
    400: "#98A2B3",
    500: "#667085",
    600: "#475467",
    700: "#344054",
    800: "#1D2939",
    900: "#101828",
  },
  neutral: {
    25: "#FAF7F2",
    50: "#F9F4EC",
    100: "#F9F1E4",
    200: "#F4E7D2",
    300: "#EAD6B6",
    400: "#DDC49B",
    500: "#CFB488",
    600: "#C5A26A",
    700: "#C5A26A",
    800: "#856634",
    900: "#714A0D",
  },
  error: {
    25: "#FFFBFA",
    50: "#FEF3F2",
    100: "#FEE4E2",
    200: "#FECDCA",
    300: "#FDA29B",
    400: "#F97066",
    500: "#F04438",
    600: "#D92D20",
    700: "#B42318",
    800: "#912018",
    900: "#7A271A",
  },
};
declare module "@mui/material/styles" {
  interface TypographyVariants {
    txt20: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    txt12?: React.CSSProperties;
    txt14?: React.CSSProperties;
    txt16?: React.CSSProperties;
    txt18?: React.CSSProperties;
    txt20?: React.CSSProperties;
    txt24?: React.CSSProperties;
    txt28?: React.CSSProperties;
    txt36T?: React.CSSProperties;
    txt44?: React.CSSProperties;
    txt48?: React.CSSProperties;
    s18w6c700?: React.CSSProperties;
    s18w4c400?: React.CSSProperties;
    s13w5c600?: React.CSSProperties;
    s12w6c400?: React.CSSProperties;
    s28w6c900?: React.CSSProperties;
    s14w5c400?: React.CSSProperties;
    s14w4c600?: React.CSSProperties;
    s14w5c700?: React.CSSProperties;
    s16w6c500?: React.CSSProperties;
    s16w4c600?: React.CSSProperties;
    s14w6c700?: React.CSSProperties;
    s12w5c500?: React.CSSProperties;
    s20w6c700?: React.CSSProperties;
    s20w6c800?: React.CSSProperties;
    s12w5c700?: React.CSSProperties;
    s12w5c400?: React.CSSProperties;
    s18w4c500?: React.CSSProperties;
    s24w6c900?: React.CSSProperties;
    s16w5c500?: React.CSSProperties;
    s16w5c400?: React.CSSProperties;
    s16w6c700?: React.CSSProperties;
    s12w4c500?: React.CSSProperties;
    s16w5c300?: React.CSSProperties;
    s36w8c500?: React.CSSProperties;
    s20w6c600?: React.CSSProperties;
    s12w8c500?: React.CSSProperties;
    s18w4c600?: React.CSSProperties;
    s28w6c800?: React.CSSProperties;
  }

  interface PaletteColor {
    25?: string;
    50?: string;
    200?: string;
    400?: string;
    500?: string;
    600?: string;
  }

  interface SimplePaletteColorOptions {
    25?: string;
    50?: string;
    200?: string;
    400?: string;
    500?: string;
    600?: string;
  }

  interface TypeText {
    25?: string;
    50?: string;
    200?: string;
    500?: string;
    400?: string;
    600?: string;
    700?: string;
    800?: string;
    900?: string;
    w9: string;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    txt12: true;
    txt14: true;
    txt16: true;
    txt18: true;
    txt20: true;
    txt24: true;
    txt28: true;
    txt44: true;
    txt36T: true;
    s18w6c700: true;
    s18w4c400: true;
    s13w5c600: true;
    s12w6c400: true;
    s28w6c900: true;
    s14w5c400: true;
    s14w5c900: true;
    s16w6c500: true;
    s16w4c600: true;
    s14w6c700: true;
    s14w5c700: true;
    s12w5c500: true;
    s20w6c700: true;
    s20w6c800: true;
    s12w5c700: true;
    s12w5c400: true;
    s18w4c500: true;
    s24w6c900: true;
    s16w5c500: true;
    s16w6c700: true;
    s16w5c400: true;
    s12w4c500: true;
    s16w5c300: true;
    s36w8c500: true;
    s20w6c600: true;
    s12w8c500: true;
    s18w4c600: true;
    s14w4c600: true;
    s28w6c800: true;
  }
}

const general = "'General Sans', sans-serif";
const cabinet = "'Cabinet Grotesk', sans-serif";

const theme = responsiveFontSizes(
  createTheme({
    typography: {
      htmlFontSize: 10,
      fontSize: 16,
      fontFamily: general,

      txt12: {
        fontSize: 12,
        fontFamily: general,
      },
      txt14: {
        fontSize: 14,
        fontFamily: general,
      },
      txt16: {
        fontSize: 16,
        fontFamily: general,
      },
      txt18: {
        fontSize: 18,
        fontFamily: general,
      },
      txt20: {
        fontSize: 20,
        fontFamily: general,
      },
      txt24: {
        fontSize: 24,
        fontFamily: general,
      },
      txt28: {
        fontSize: 28,
        fontFamily: general,
      },
      txt44: {
        fontSize: 44,
        fontFamily: general,
      },
      txt36T: {
        fontSize: 36,
        fontFamily: cabinet,
      },
      txt48: {
        fontSize: 48,
        fontFamily: general,
      },
      s18w6c700: {
        fontSize: 18,
        fontWeight: 600,
        color: token.grey[700],
      },
      s18w4c400: {
        fontSize: 18,
        fontWeight: 400,
        color: token.grey[400],
      },
      s12w6c400: {
        fontSize: 12,
        fontWeight: 600,
        color: token.grey[400],
      },
      s13w5c600: {
        fontSize: 13,
        fontWeight: 500,
        color: token.grey[600],
      },
      s28w6c900: {
        fontSize: 28,
        fontWeight: 900,
        color: token.grey[600],
      },
      s14w5c400: {
        fontSize: 14,
        fontWeight: 500,
        color: token.grey[400],
      },

      s16w6c500: {
        fontSize: 16,
        fontWeight: 600,
        color: token.grey[500],
      },
      s16w4c600: {
        fontSize: 16,
        fontWeight: 400,
        color: token.grey[600],
      },
      s16w5c400: {
        fontSize: 16,
        fontWeight: 500,
        color: token.grey[400],
      },
      s14w6c700: {
        fontSize: 14,
        fontWeight: 600,
        color: token.grey[700],
      },
      s14w5c700: {
        fontSize: 14,
        fontWeight: 500,
        color: token.grey[700],
      },
      s12w5c500: {
        fontSize: 12,
        fontWeight: 500,
        color: token.grey[500],
      },
      s20w6c700: {
        fontSize: 20,
        fontWeight: 600,
        color: token.grey[700],
      },
      s20w6c800: {
        fontSize: 20,
        fontWeight: 600,
        color: token.grey[800],
      },
      s12w5c700: {
        fontSize: 12,
        fontWeight: 500,
        color: token.grey[700],
      },
      s12w5c400: {
        fontSize: 12,
        fontWeight: 500,
        color: token.grey[400],
      },
      s18w4c500: {
        fontSize: 18,
        fontWeight: 400,
        color: token.grey[400],
      },
      s24w6c900: {
        fontSize: 24,
        fontWeight: 600,
        color: token.grey[900],
      },
      s16w5c500: {
        fontSize: 16,
        fontWeight: 500,
        color: token.grey[500],
      },
      s16w6c700: {
        fontSize: 16,
        fontWeight: 600,
        color: token.grey[700],
      },
      s12w4c500: {
        fontSize: 12,
        fontWeight: 400,
        color: token.grey[500],
      },
      s16w5c300: {
        fontSize: 16,
        fontWeight: 500,
        color: token.grey[300],
      },
      s36w8c500: {
        fontSize: 36,
        fontFamily: cabinet,
        fontWeight: 800,
        color: token.grey[500],
      },
      s20w6c600: {
        fontSize: 20,
        fontWeight: 600,
        color: token.grey[600],
      },
      s12w8c500: {
        fontSize: 12,
        fontWeight: 500,
        color: token.grey[800],
      },
      s18w4c600: {
        fontSize: 18,
        fontWeight: 400,
        color: token.grey[600],
      },
      s14w4c600: {
        fontSize: 14,
        fontWeight: 400,
        color: token.grey[600],
      },
      s28w6c800: {
        fontSize: 28,
        fontWeight: 600,
        color: token.grey[800],
      },
    },

    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            height: 44,
            minWidth: 120,
            borderRadius: 30, //in pixel
            fontSize: 16,
            fontWeight: 500,
            fontFamily: general,
            textTransform: "none",
            boxShadow: "none",
          },

          containedSizeSmall: {
            height: 38,
            minWidth: 120,
            borderRadius: 30, //in pixel
            fontSize: 11,
            fontWeight: 500,
            fontFamily: general,
            textTransform: "none",
            boxShadow: "none",
          },
          outlined: {
            background: "#fff",
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            background: "transparent",
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            cursor: "pointer",
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: 0,
          },
        },
      },

      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            "& .Mui-disabled": {
              background: "#F9FAFB",
              border: "1px solid #F9FAFB",
              color: "#D0D5DD",
              opacity: 0.5,
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            fontSize: 14,
            fontWeight: 500,
            color: "#344054",
          },
        },
      },
      MuiPopover: {
        styleOverrides: {
          paper: {
            borderRadius: 4,
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            fontSize: 12,
            fontWeight: 400,
            color: "#667085",
          },
        },
      },
      MuiCircularProgress: {
        styleOverrides: {
          determinate: {},
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            borderRadius: 3.5,
            boxShadow: "0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)",
            padding: "16px",
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            backgroundColor: token.grey[200],
          },
          colorPrimary: {},
        },
      },
    },
    palette: {
      text: {
        primary: token.grey[900],
        secondary: token.grey[700],
        disabled: token.grey[500],
        ...token.grey,
      },
      primary: {
        ...token.primary,
        main: "#FB6514",
      },
      success: {
        ...token.success,
        main: token.success[500],
      },
      warning: {
        ...token.warning,
        main: token.warning[500],
      },
      error: {
        ...token.error,
        main: token.error[500],
      },
    },
  })
);

export default theme;
