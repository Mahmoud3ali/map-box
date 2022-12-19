import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const theme = createTheme();

type Props = {
  children: React.ReactNode;
};

export const MaterialUIConfig = ({ children }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
