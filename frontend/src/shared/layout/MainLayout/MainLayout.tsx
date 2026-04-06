import { Outlet } from "react-router-dom";
import { Container } from "../Container/Container";
import { Grid } from "../Grid/Grid";

export function MainLayout() {
  return (
    <Container>
      <Grid>
        <Outlet />
      </Grid>
    </Container>
  );
}