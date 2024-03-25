import { PrimaryButton } from "@/modules/common/button";
import { InputField } from "@/modules/common/input";
import { useAppState } from "@/store";
import { LoginSchema } from "@/utils/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../hooks";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: UserAuthFormProps) {
  const { login, googleLogin } = useAuthentication();
  const [state] = useAppState();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const defaultValues = {
    email: "neo@llm.com",
    password: "test@123",
  };
  const { handleSubmit, control } = useForm({
    defaultValues,
    resolver: zodResolver(LoginSchema),
  });

  useEffect(() => {
    if (state?.userProfile?.id) {
      return navigate("/");
    }
  }, [state?.userProfile]);

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    await login(data.email, data.password);
    setIsLoading(false);
  });

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    await googleLogin();
    setIsLoading(false);
  };

  return (
    <Grid container rowSpacing={2}>
      <form onSubmit={onSubmit} className="w-full">
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <InputField
              control={control}
              name="email"
              label="Email"
              placeholder="john@gmail.com"
              type="email"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <InputField
              name="password"
              control={control}
              type="password"
              label="Password"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <PrimaryButton
              variant="contained"
              title="Login"
              type="submit"
              disabled={isLoading}
              isLoading={isLoading}
              className="text-sm py-2 text-white bg-[#40be35f7] dark:text-white dark:hover:bg-white dark:hover:text-black capitalize"
            />
          </Grid>
        </Grid>
      </form>
      <Grid item xs={12}>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
      </Grid>
      <Grid item xs={12}>
        <PrimaryButton
          variant="contained"
          type="button"
          title="Google"
          disabled={isLoading}
          isLoading={isLoading}
          startIcon={<img src="/assets/google.svg" height={25} width={25} />}
          onClick={handleGoogleLogin}
          className="text-sm py-2 text-white bg-black dark:text-white dark:hover:bg-white dark:hover:text-black capitalize"
        />
      </Grid>
    </Grid>
  );
}
