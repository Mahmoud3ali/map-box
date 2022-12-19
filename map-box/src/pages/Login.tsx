import {
  Box,
  Button,
  Container,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { UserFormData } from "../models/user";
import { useAppDispatch, useAppSelector } from "../config";
import { loginAsync, reset } from "../features";
import { useLocation, useNavigate } from "react-router-dom";

const userInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { register, formState, handleSubmit } = useForm<UserFormData>({
    resolver: zodResolver(userInputSchema),
    mode: "onChange",
  });

  const from = useLocation().state?.from?.pathname || "/";

  return (
    <Container component="main">
      <Box
        marginTop={"30vh"}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(async ({ password, email }) => {
            const { payload: newState } = await dispatch(
              loginAsync({ password, email })
            );
            newState !== undefined && navigate(from, { replace: true });
          })}
          sx={{ width: "40%" }}
          noValidate
          marginTop={1}
        >
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            onFocus={() => dispatch(reset())}
            autoComplete="email"
            autoFocus
            {...register("email")}
            error={!!formState.errors.email || auth.status === "failed"}
          />
          <FormHelperText
            error
            hidden={!formState.errors.email && auth.status !== "failed"}
          >
            {formState.errors.email?.message || auth.error}
          </FormHelperText>
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register("password")}
            error={!!formState.errors.password}
          />
          <FormHelperText error hidden={!formState.errors.password}>
            {formState.errors.password?.message}
          </FormHelperText>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!formState.isValid}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
