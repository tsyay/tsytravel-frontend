import Header from "../../widgets/Header";
import { JimnyDriving } from "../../widgets/JimnyDriving";
import { JimnyHero } from "../../widgets/JimnyHero";

export default function JimnyTourPage() {
  return (
    <>
      <Header />
      <section data-header-theme="dark">
        <JimnyHero />
        <JimnyDriving/>
      </section>
    </>
  );
}
