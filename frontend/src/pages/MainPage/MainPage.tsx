import Hero from "../../widgets/Hero";
import { Grid, Container } from "../../shared/layout";

export default function MainPage() {
  return (
    <>
      {/* Hero вне контейнера — на весь экран */}
      <Hero />

      {/* Остальной контент внутри сетки */}
      <Container>
        <Grid>Другое</Grid>
      </Container>
    </>
  );
}
