import { Grid, Typography } from "@mui/material";
import Link from "@mui/material/Link";

interface props {
  label?: string;
  required?: boolean;
  fontSize?: number;
  direction?: string;
  fontWeight?: number;
  color?: string;
  headingMargin?: string;
  forgetPasswordLink?: boolean;
}

export function InputLabel({
  label,
  required,
  fontSize,
  direction,
  color,
  fontWeight,
  headingMargin,
  forgetPasswordLink,
}: props) {
  return (
    <Grid>
      <Typography component="h4" variant="h6">
        {label}
        {required && <span className="text-red-600">*</span>}
      </Typography>

      {/* To show Forgot-password link in case of password input */}
      {label === "Password" && forgetPasswordLink && (
        <Grid item xs>
          <Link href="/forgot-password" variant="body2">
            Forgot your password?
          </Link>
        </Grid>
      )}
    </Grid>
  );
}
