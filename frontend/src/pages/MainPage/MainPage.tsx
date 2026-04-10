import Hero from "../../widgets/Hero";
import { WhyBuryatia } from "../../widgets/WhyBuryatia";
import { TourFormats } from "../../widgets/TourFormats";
import { TopTours } from "../../widgets/TopTours";
import { InteractiveMap } from "../../widgets/InteractiveMap";

export default function MainPage() {
  return (
    <>
      <section data-header-theme="dark">
        <Hero />
      </section>
      <section data-header-theme="light">
        <WhyBuryatia />
      </section>
      <section data-header-theme="dark">
        <TourFormats />
      </section>
      <section data-header-theme="light">
        <TopTours />
      </section>
      <section data-header-theme="dark">
        <InteractiveMap />
      </section>
    </>
  );
}
