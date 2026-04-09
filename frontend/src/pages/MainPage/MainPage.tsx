import Hero from "../../widgets/Hero";
import { Grid, Container } from "../../shared/layout";
import { WhyBuryatia } from "../../widgets/WhyBuryatia";
import { TourFormats } from "../../widgets/TourFormats";

export default function MainPage() {
  return (
    <>
      <Hero />
      <WhyBuryatia />
      <TourFormats/>
    </>
  );
}
