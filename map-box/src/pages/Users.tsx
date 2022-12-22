import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";
import { useQuery } from "react-query";
import { userService } from "../services";

export default function UsersPage() {
  const listUsers = useQuery(["list_users"], userService.list, {
    refetchOnWindowFocus: false,
  });

  if (listUsers.data === undefined) {
    return <div data-cy="users_page">Loading...</div>;
  }

  return (
    <Box data-cy="users_page" marginX="auto" marginTop="32px" maxWidth="650px">
      <TableContainer component={Paper} sx={{ maxHeight: "450px" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listUsers.data.map((user) => (
              <TableRow key={user._id}>
                <TableCell component="th" scope="row">
                  {user._id}
                </TableCell>
                <TableCell align="right">{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
