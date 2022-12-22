import { Typography, useTheme } from "@mui/material";
import { MaterialUIConfig } from "./MaterialUI";

const Component = () => {
  const theme = useTheme();
  return (
    <Typography
      data-cy={theme ? "connected_component" : "disconnected_component"}
    >
      Test
    </Typography>
  );
};

describe("MaterialUIConfig", () => {
  it("give children access to material ui theme and can use material ui components", () => {
    cy.mount(
      <MaterialUIConfig>
        <Component />
      </MaterialUIConfig>
    );
    cy.get("[data-cy=connected_component]").should("exist");
  });
});
