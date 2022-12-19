import { Provider } from "react-redux";
import { store } from ".";

type Props = {
  children: JSX.Element;
};

export function GlobalStateConfig({ children }: Props) {
  return <Provider store={store}>{children}</Provider>;
}
