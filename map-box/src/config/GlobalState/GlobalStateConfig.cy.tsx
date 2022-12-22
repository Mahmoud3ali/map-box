import { useAppSelector } from ".";
import { GlobalStateConfig } from "./GlobalStateConfig";

const Component = () => {
  const state = useAppSelector((state) => state);
  return (
    <div data-cy={state ? "connected_component" : "disconnected_component"}>
      Test
    </div>
  );
};

describe("GlobalStateConfig", () => {
  it("give children access to redux store", () => {
    cy.mount(
      <GlobalStateConfig>
        <Component />
      </GlobalStateConfig>
    );
    cy.get("[data-cy=connected_component]").should("exist");
  });
});
