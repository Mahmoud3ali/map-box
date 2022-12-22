import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStateConfig, useAppDispatch } from "../../config";
import { loginAsync } from "../../features";
import { RequireAuth } from "./RequireAuth";
import AUTH_RESPONSE from "../../../cypress/fixtures/auth.json";

const Component = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <button
        onClick={async () =>
          await dispatch(
            loginAsync({ email: "test@cyz.com", password: "test" })
          )
        }
      >
        Authorize
      </button>
    </>
  );
};

describe("RequireAuth", () => {
  it("hide children if user is unauthorized, and show it for authorized user", () => {
    cy.intercept("POST", "/auth/login", {
      statusCode: 200,
      body: AUTH_RESPONSE,
    }).as("loginCall");

    cy.mount(
      <BrowserRouter>
        <GlobalStateConfig>
          <Routes>
            <Route
              path="*"
              element={
                <>
                  <Component />
                  <RequireAuth>
                    <div data-cy="hello">Hello</div>
                  </RequireAuth>
                </>
              }
            />
          </Routes>
        </GlobalStateConfig>
      </BrowserRouter>
    );
    cy.get("[data-cy=hello]").should("not.exist");
    cy.get("button").contains("Authorize").click();
    cy.get("[data-cy=hello]").should("exist");
  });
});
