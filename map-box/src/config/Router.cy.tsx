import { useLocation, useNavigate } from "react-router-dom";
import { loginAsync } from "../features";
import { GlobalStateConfig, useAppDispatch } from "./GlobalState";
import { RouterConfig } from "./Router";
import AUTH_RESPONSE from "../../cypress/fixtures/auth.json";
import { useEffect } from "react";
import { ServerStateConfig } from "./ServerState";

describe("RouterConfig", () => {
  it("give children access to router api and can navigate user to different routes", () => {
    const Component = () => {
      const location = useLocation();
      const navigate = useNavigate();
      return (
        <div
          data-cy={location ? "connected_component" : "disconnected_component"}
          onClick={() => navigate("/login")}
        >
          Test
        </div>
      );
    };
    cy.mount(
      <GlobalStateConfig>
        <RouterConfig>
          <Component />
        </RouterConfig>
      </GlobalStateConfig>
    );
    cy.get("[data-cy=connected_component]").should("exist").click();
    cy.location("pathname").should("eq", "/login");
  });

  it("renders not found page if user accessed a wrong url", () => {
    const Component = () => {
      const navigate = useNavigate();

      return (
        <>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/hello_world")}>Hello World</button>
        </>
      );
    };

    cy.mount(
      <GlobalStateConfig>
        <RouterConfig>
          <Component />
        </RouterConfig>
      </GlobalStateConfig>
    );

    cy.get("button").contains("Login").click();
    cy.location("pathname").should("eq", "/login");
    cy.get("button").contains("Hello World").click();
    cy.get("[data-cy='notfound_page']").should("exist");
    cy.get("[data-cy='back_home_btn']").click();
    cy.location("pathname").should("eq", "/login");
  });

  it("renders login page on '/login'", () => {
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
        <RouterConfig>
          <Component />
        </RouterConfig>
      </GlobalStateConfig>
    );

    cy.get("button").contains("Login").click();
    cy.location("pathname").should("eq", "/login");
    cy.get("[data-cy='login_page']").should("exist");
  });

  it("renders home page if authenticated user access '/'", () => {
    const Component = () => {
      const navigate = useNavigate();
      const dispatch = useAppDispatch();

      useEffect(() => {
        navigate("/login");
      }, []);

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
          <button onClick={() => navigate("/")}>Home</button>
        </>
      );
    };

    cy.intercept("POST", "/auth/login", {
      statusCode: 200,
      body: AUTH_RESPONSE,
    }).as("loginCall");

    cy.mount(
      <GlobalStateConfig>
        <ServerStateConfig>
          <RouterConfig>
            <Component />
          </RouterConfig>
        </ServerStateConfig>
      </GlobalStateConfig>
    );

    cy.get("button").contains("Authorize").click();
    cy.wait("@loginCall");
    cy.get("button").contains("Home").click();
    cy.location("pathname").should("eq", "/");
    cy.get("[data-cy='home_page']").should("exist");
  });

  it("renders home page if authenticated user access '/users'", () => {
    const Component = () => {
      const navigate = useNavigate();
      const dispatch = useAppDispatch();

      useEffect(() => {
        navigate("/login");
      }, []);

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
          <button onClick={() => navigate("/users")}>Users</button>
        </>
      );
    };

    cy.intercept("POST", "/auth/login", {
      statusCode: 200,
      body: AUTH_RESPONSE,
    }).as("loginCall");

    cy.mount(
      <GlobalStateConfig>
        <ServerStateConfig>
          <RouterConfig>
            <Component />
          </RouterConfig>
        </ServerStateConfig>
      </GlobalStateConfig>
    );

    cy.get("button").contains("Authorize").click();
    cy.wait("@loginCall");
    cy.get("button").contains("Users").click();
    cy.location("pathname").should("eq", "/users");
    cy.get("[data-cy='users_page']").should("exist");
  });
});
