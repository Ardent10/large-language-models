import { Card, CardContent, CardHeader, Grid, Skeleton } from "@mui/material";

export function SkeletonCardLoader() {
  return (
    <Grid container spacing={4}>
      {[...Array(6)].map((_, idx) => (
        <Grid key={idx} item xs={12} sm={6} md={4} lg={4}>
          <Card
            sx={{
              minWidth: "100%",
              borderRadius: 4,
              border: "1px solid #64c956",
              ":hover": {
                boxShadow: "0 0 10px 0 rgb(0 0 0 / 10%)",
                transform: "scale(1.05)",
                transition: "all 0.3s ease",
              },
            }}
          >
            <CardHeader
              title={<Skeleton animation="wave" />}
              subheader={<Skeleton animation="wave" width={"20%"} />}
            />
            <CardContent>
              <Skeleton animation="wave" />
            </CardContent>
            <Skeleton
              animation="wave"
              variant="rectangular"
              sx={{ height: 200 }}
            />
            <CardContent>
              <Skeleton animation="wave" />
              <Skeleton animation="wave" width="60%" />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
