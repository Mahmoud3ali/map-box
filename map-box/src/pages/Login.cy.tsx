import { useNavigate } from "react-router-dom";
import { GlobalStateConfig, RouterConfig, ServerStateConfig } from "../config";
import AUTH_RESPONSE from "../../cypress/fixtures/auth.json";

describe("Login Page", () => {
  beforeEach(() => {
    const Component = () => {
      const navigate = useNavigate();

      return (
        <>
          <button onClick={() => navigate("/login")}>Login</button>
        </>
      );
    };

    cy.mount(
      <GlobalStateConfig>
        <ServerStateConfig>
          <RouterConfig>
            <Component />
          </RouterConfig>
        </ServerStateConfig>
      </GlobalStateConfig>
    );
    cy.get("button").contains("Login").click();
  });

  it("sign in button is disabled if email is invalid", () => {
    cy.get("[data-cy='email_input']").type("test");
    cy.contains("Invalid email").should("be.visible");
    cy.get("[data-cy='password_input']").type("test");
    cy.get("[data-cy='login_btn']").should("be.disabled");
  });

  it("sign in button is disabled if email is empty", () => {
    cy.get("[data-cy='password_input']").type("test");
    cy.get("[data-cy='login_btn']").should("be.disabled");
  });

  it("sign in button is disabled if password is empty", () => {
    cy.get("[data-cy='email_input']").type("test");
    cy.get("[data-cy='login_btn']").should("be.disabled");
  });

  it("sign in button is disabled if password is invalid", () => {
    cy.get("[data-cy='email_input']").type("test");
    cy.get("[data-cy='password_input']").type("t");
    cy.contains("String must contain at least 2 character(s)").should(
      "be.visible"
    );
    cy.get("[data-cy='login_btn']").should("be.disabled");
  });

  it("sign in button is enabled if email and password are valid", () => {
    cy.intercept("POST", "/auth/login", {
      statusCode: 200,
      body: AUTH_RESPONSE,
    }).as("loginCall");
    cy.get("[data-cy='email_input']").type("test@gmail.com");
    cy.get("[data-cy='password_input']").type("test");
    cy.get("[data-cy='login_btn']").should("be.enabled").click();
    cy.wait("@loginCall");
  });

  it("should display error when email and password are valid but incorrect", () => {
    cy.intercept("POST", "/auth/login", {
      statusCode: 401,
    }).as("loginCall");
    cy.get("[data-cy='email_input']").type("test@gmail.com");
    cy.get("[data-cy='password_input']").type("test");
    cy.get("[data-cy='login_btn']").should("be.enabled").click();
    cy.wait("@loginCall");
    cy.contains("Invalid email or password").should("be.visible");
  });
});
