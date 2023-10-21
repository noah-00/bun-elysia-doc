import { t } from "elysia";

export const signupDTO = t.Object({
  username: t.String(),
  password: t.String(),
});
