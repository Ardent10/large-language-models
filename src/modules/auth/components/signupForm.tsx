import { PrimaryButton } from "@/modules/common/button";
import { InputField } from "@/modules/common/input";
import { useAppState } from "@/store";
import { SignupSchema } from "@/utils/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../hooks";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignupForm({ className, ...props }: UserAuthFormProps) {
  const { signup, googleLogin } = useAuthentication();
  const [state] = useAppState();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const { handleSubmit, control } = useForm({
    resolver: zodResolver(SignupSchema),
  });

  useEffect(() => {
    if (state?.userProfile?.id) {
      return navigate("/");
    }
  }, [state?.userProfile?.uid]);

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    await signup({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      occupation: data.occupation,
    });
    setIsLoading(false);
  });

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    await googleLogin();
    setIsLoading(false);
  };

  return (
    <Grid container rowSpacing={2} py={2}>
      <form onSubmit={onSubmit}>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <Grid item container xs={12} columnSpacing={2}>
              <Grid item xs={6}>
                <InputField
                  control={control}
                  name="firstName"
                  label="First Name"
                  placeholder="john"
                  type="text"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <InputField
                  control={control}
                  name="lastName"
                  label="Last Name"
                  placeholder="doe"
                  type="text"
                  required
                />
              </Grid>
            </Grid>

            <Grid item container xs={12} columnSpacing={2}>
              <Grid item xs={6}>
                <InputField
                  control={control}
                  name="email"
                  label="Email"
                  placeholder="john@gmail.com"
                  type="email"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <InputField
                  control={control}
                  name="occupation"
                  label="Occupation"
                  placeholder="Working professional"
                  type="text"
                  required
                />
              </Grid>
            </Grid>

            <Grid item container xs={12} columnSpacing={2}>
              <Grid item xs={6}>
                <InputField
                  name="password"
                  control={control}
                  type="password"
                  label="Password"
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <InputField
                  name="confirmPassword"
                  control={control}
                  type="password"
                  label="Confirm Password"
                  required
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <PrimaryButton
              variant="contained"
              title="Signup"
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
          onClick={handleGoogleSignup}
          className="text-sm py-2 text-white bg-black dark:text-white dark:hover:bg-white dark:hover:text-black capitalize"
        />
      </Grid>
    </Grid>
  );
}
