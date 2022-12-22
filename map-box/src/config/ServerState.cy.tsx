import { useQuery, useQueryClient } from "react-query";
import { ServerStateConfig } from "./ServerState";

const Component = () => {
  const queryClient = useQueryClient();
  const query = useQuery(
    "test",
    () => {
      return fetch("/api/test").then((res) => res.json());
    },
    {
      // disable auto fetching on mount
      enabled: false,
    }
  );

  return (
    <div
      data-cy={queryClient ? "connected_component" : "disconnected_component"}
      onClick={() => query.refetch()}
    >
      Test
    </div>
  );
};

describe("RouterConfig", () => {
  it("give children access to router api and can navigate user to different routes", () => {
    cy.intercept("GET", "/api/test", {
      statusCode: 200,
      body: { test: true },
    }).as("testCall");

    cy.mount(
      <ServerStateConfig>
        <Component />
      </ServerStateConfig>
    );

    cy.get("[data-cy=connected_component]").should("exist").click();
    cy.wait("@testCall");
  });
});
