import type { ReactNode } from "react";
import { Container } from "../Container/Container";
import { Grid } from "../Grid/Grid";

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <Container>
      <Grid>{children}</Grid>
    </Container>
  );
}
