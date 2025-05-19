import PlacesCarousel from "@/components/PlacesCarousel";
import Image from "next/image";
export default function Home() {
  return (
    <div className="min-h-screen hero-background">
      <div className="w-full min-h-screen gradient-bg  py-16 px-4 flex flex-col items-center justify-center">
        <div className="block sm:hidden absolute top-0 left-0 w-full h-[5vh] z-0 opacity-30">
          <Image
            src="/assets/images/rectangle 1560.jpg"
            alt="Decorative rectangle background"
            title="Decorative rectangle background"
            className="w-full h-24 object-top fade-mask"
            width={1920}
            height={1080}
          />
        </div>
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto mb-12">
            <p className="section-title mb-2 ">PLACES TO SEE</p>
            <h1
              className="text-[60.96px] leading-[90%] tracking-[-0.02em] uppercase font-semibold max-w-3xl gradient-text main-title mb-16 "
              style={{ fontFamily: "Termina, sans-serif" }}
            >
              A LOVE AFFAIR WITH THE COAST
            </h1>

            <PlacesCarousel />
          </div>
        </div>
      </div>
    </div>
  );
}
