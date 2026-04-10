import Hero from "../../widgets/Hero";
import { WhyBuryatia } from "../../widgets/WhyBuryatia";
import { TourFormats } from "../../widgets/TourFormats";
import { TopTours } from "../../widgets/TopTours";
import { InteractiveMap } from "../../widgets/InteractiveMap";

export default function MainPage() {
  return (
    <>
      <Hero />
      <WhyBuryatia />
      <TourFormats />
      <TopTours />
      <InteractiveMap/>
    </>
  );
}
