import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStateConfig, ServerStateConfig } from "../config";
import { UsersPage } from ".";
import USERS_RESPONSE from "../../cypress/fixtures/users.json";

describe("Users page", () => {
  it("should list all users fetched", () => {
    cy.intercept("GET", "/users", {
      statusCode: 200,
      body: USERS_RESPONSE,
    }).as("loginCall");

    cy.mount(
      <BrowserRouter>
        <ServerStateConfig>
          <GlobalStateConfig>
            <Routes>
              <Route path="*" element={<UsersPage />} />
            </Routes>
          </GlobalStateConfig>
        </ServerStateConfig>
      </BrowserRouter>
    );

    cy.get("[data-cy=users_page]").should("exist");
    Object.entries(USERS_RESPONSE.users).forEach(([_, user]) => {
      cy.contains(user.email).should("exist");
      cy.contains(user._id).should("exist");
    });
  });
});
