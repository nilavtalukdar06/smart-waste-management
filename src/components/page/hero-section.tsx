import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="px-5 my-12">
      <div className="overflow-hidden">
        <div className="w-full md:pt-12">
          <h1 className="font-medium text-neutral-600 text-5xl md:text-6xl leading-tight">
            <span className="text-green-500">EcoSwachh:</span> A Digital Step
            Towards a Swachh Bharat
          </h1>
          <div className="mt-5 max-w-4xl">
            <p className="text-neutral-400 text-lg font-normal">
              Join the movement to make India cleaner and greener using the
              power of technology. EcoSwachh empowers citizens to report waste,
              track cleanliness, and earn rewards— building a connected,
              conscious, and cleaner nation together.
            </p>
          </div>
        </div>
      </div>
      <div className="relative overflow-hidden pt-4 mt-12">
        <div className="relative z-10">
          <div className="w-full mx-auto">
            <div className="mb-4">
              <h2 className="text-neutral-500 font-light">
                Proudly supporting Digital India and Swachh Bharat Mission 🌏🇮🇳
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row items-start justify-center sm:justify-start gap-6 text-sm text-neutral-500">
              <div className="bg-white border rounded-lg px-4 py-2">
                ♻️ 70,000+ reports resolved
              </div>
              <div className="bg-white border rounded-lg px-4 py-2">
                🏙️ 150+ smart cities onboard
              </div>
              <div className="bg-white border rounded-lg px-4 py-2">
                💡 Powered by AI for smarter waste insights
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24 mb-12 flex flex-wrap justify-center md:justify-between items-center gap-6">
        <Image
          src="https://ik.imagekit.io/txlfejzn5/icons/MyGov.svg?updatedAt=1753519672149"
          alt="logo of my gov india"
          height={32}
          width={96}
        />
        <Image
          src="https://ik.imagekit.io/txlfejzn5/icons/aadhaar-hindi-seeklogo.png?updatedAt=1753519672044"
          alt="logo of aadhaar"
          height={32}
          width={96}
        />
        <Image
          src="https://ik.imagekit.io/txlfejzn5/icons/icon2.png?updatedAt=1753519671839"
          alt="logo of digital india"
          height={32}
          width={96}
        />
        <Image
          src="https://ik.imagekit.io/txlfejzn5/icons/swachh-bharat-mission-seeklogo.png?updatedAt=1753519671905"
          alt="logo of swachh bharat mission"
          height={32}
          width={96}
        />
        <Image
          src="https://ik.imagekit.io/txlfejzn5/icons/Daco_5194593.png?updatedAt=1753521274306"
          alt="logo of government of india"
          height={24}
          width={40}
        />
      </div>
    </div>
  );
}
