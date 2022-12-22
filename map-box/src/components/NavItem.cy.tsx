import { GlobalStateConfig, RouterConfig } from "../config";
import { NavItem } from "./NavItem";

describe("NavItem", () => {
  it("renders a nav item and when clicked move user to new route", () => {
    cy.mount(
      <GlobalStateConfig>
        <RouterConfig>
          <NavItem data-cy="login_link" name="Login" path="/login" />
        </RouterConfig>
      </GlobalStateConfig>
    );
    cy.get("[data-cy=login_link]").should("exist").click();
    cy.location("pathname").should("eq", "/login");
  });
});
