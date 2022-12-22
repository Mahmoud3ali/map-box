import { Link as MaterialLink } from "@mui/material";
import { Link as RouterLink, useMatch } from "react-router-dom";

type Props = {
  path: string;
  name: string;
};
export function NavItem({ path, name, ...params }: Props) {
  const isMatch = useMatch(path);
  return (
    <MaterialLink
      {...params}
      component={RouterLink}
      to={path}
      color="inherit"
      underline="none"
      sx={{
        mr: 2,
        fontWeight: isMatch ? "bold" : "normal",
        textDecoration: isMatch ? "underline" : "none",
      }}
    >
      {name}
    </MaterialLink>
  );
}
