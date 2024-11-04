export default function Hero() {
  return (
    <section className="relative h-[600px] w-full">
      <img
        src="/placeholder.svg?height=600&width=1200"
        alt="Food background"
        className="absolute inset-0 object-cover brightness-50 w-full h-full"
      />
      <div className="container relative flex h-full items-center justify-center">
        <h1 className="max-w-3xl text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl">
          Lassen Sie sich inspirieren, kochen Sie mit Leidenschaft und erleben
          Sie unvergessliche Momente bei Tisch.
        </h1>
      </div>
    </section>
  );
}
