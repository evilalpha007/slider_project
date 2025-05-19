import PlacesCarousel from "@/components/PlacesCarousel"; 

export default function Home() {
  return (
    <div className="min-h-screen hero-background">
      <div className="w-full min-h-screen gradient-bg  py-16 px-4 flex flex-col items-center justify-center">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto mb-12">
            <p className="section-title mb-2">PLACES TO SEE</p>
            <h1 className="main-title gradient-text  max-w-3xl  leading-tight mb-16">
              A LOVE AFFAIR WITH THE COAST
            </h1>
            <PlacesCarousel />
          </div>
        </div>
      </div>
    </div>
  );
}
