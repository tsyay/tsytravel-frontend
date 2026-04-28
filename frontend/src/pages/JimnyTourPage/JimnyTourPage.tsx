import Header from "../../widgets/Header";
import { JimnyDriving } from "../../widgets/JimnyDriving";
import { JimnyHero } from "../../widgets/JimnyHero";
import { JimnyRouteMap } from "../../widgets/JimnyRouteMap";

export default function JimnyTourPage() {
  return (
    <>
      <Header />
      <section data-header-theme="dark">
        <JimnyHero />
        <JimnyDriving />
      </section>
        <section data-header-theme="light">
          <JimnyRouteMap />
        </section>
    </>
  );
}
