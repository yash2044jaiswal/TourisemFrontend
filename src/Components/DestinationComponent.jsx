// DestinationComponents.jsx
import { Link } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Star,
  Search,
  Clock3,
  ArrowRight,
} from "lucide-react";

function DestinationComponents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch destinations from Claude API on mount
  useEffect(() => {
    const fetchDestinations = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 1000,
            system: `You are a travel expert. Return ONLY a valid JSON array with no markdown, no explanation, no backticks. 
The array must have exactly 20 tourism destination objects with these fields:
- id (number)
- title (string, destination name)
- location (string, city/region + country)
- image (string, a real Unsplash URL for this destination — use format: https://images.unsplash.com/photo-PHOTOID?w=600&q=80)
- rating (number between 4.5 and 5.0)
- days (string like "5 Days")
- price (string in INR like "₹45,000")
- description (string, 2 sentences about the destination)

Include a diverse mix: India destinations (Kashmir, Rajasthan, Goa, Kerala, Ladakh, Varanasi, Andaman, Coorg, Darjeeling, Munnar) and international (Bali, Dubai, Paris, Maldives, Switzerland, Thailand, Singapore, Japan, Italy, New Zealand).

Use these real Unsplash photo IDs for each:
Kashmir: 1715457573748-8e8a70b2c1be, Rajasthan: 1599661046827-dacff0f9e0ab, Goa: 1512343879784-a960bf40e7f2, Kerala: 1602216056096-3b40cc0c9944, Ladakh: 1506905925346-21bda4d32df4, Varanasi: 1561361058-c24cecae35ca, Andaman: 1544551763-46a013bb70d5, Coorg: 1506905925346-21bda4d32df4, Darjeeling: 1544816155-12df9643f363, Munnar: 1571401207444-65daacd0f1c6, Bali: 1537996194471-e657df975ab4, Dubai: 1512453979798-5ea266f8880c, Paris: 1499856871958-5b9627545d1a, Maldives: 1514282401047-d79a71a590e8, Switzerland: 1531400078-3e6acc6c6b29, Thailand: 1528181304800-259b08848526, Singapore: 1525625293133-d5f17434e56d, Japan: 1540959733332-eab4deabeeaf, Italy: 1516483638261-f4dbaf036963, NewZealand: 1507699622468-f600bebee440`,
            messages: [
              {
                role: "user",
                content: "Give me the 20 tourism destinations JSON array now.",
              },
            ],
          }),
        });

        const data = await response.json();
        const text = data.content
          .map((i) => (i.type === "text" ? i.text : ""))
          .join("");
        const clean = text.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(clean);
        setDestinations(parsed);
      } catch (err) {
        console.error("Failed to fetch destinations:", err);
        // Fallback to static data if API fails
        setDestinations([
          {
            id: 1,
            title: "Kashmir Valley",
            location: "Kashmir, India",
            image: "https://images.unsplash.com/photo-1715457573748-8e8a70b2c1be?w=600&q=80",
            rating: 4.9,
            days: "6 Days",
            price: "₹32,000",
            description:
              "Experience the paradise on earth — snow-capped peaks, serene Dal Lake, and vibrant Mughal gardens await. A breathtaking Himalayan valley like no other.",
          },
          {
            id: 2,
            title: "Rajasthan Royale",
            location: "Jaipur, India",
            image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFqYXN0aGFufGVufDB8fDB8fHww",
            rating: 4.8,
            days: "7 Days",
            price: "₹28,500",
            description:
              "Explore majestic forts, ornate palaces, and vibrant bazaars in the Land of Kings. A colourful journey through Rajasthan's rich royal heritage.",
          },
          {
            id: 3,
            title: "Goa Beaches",
            location: "Goa, India",
            image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80",
            rating: 4.7,
            days: "5 Days",
            price: "₹18,000",
            description:
              "Golden shores, swaying palms, and vibrant nightlife. Goa blends Portuguese charm with tropical beauty for an unforgettable coastal escape.",
          },
          {
            id: 4,
            title: "Kerala Backwaters",
            location: "Kerala, India",
            image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80",
            rating: 4.8,
            days: "6 Days",
            price: "₹25,000",
            description:
              "Drift through lush green backwaters on a traditional houseboat. Explore spice plantations and unwind on pristine beaches in God's Own Country.",
          },
          {
            id: 5,
            title: "Bali Paradise",
            location: "Bali, Indonesia",
            image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
            rating: 4.9,
            days: "7 Days",
            price: "₹65,000",
            description:
              "Ancient temples, terraced rice paddies, and world-class surf breaks make Bali the ultimate tropical escape. Every kind of traveller finds their paradise here.",
          },
          {
            id: 6,
            title: "Dubai Skyline",
            location: "Dubai, UAE",
            image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
            rating: 4.8,
            days: "5 Days",
            price: "₹85,000",
            description:
              "From the world's tallest tower to golden desert safaris, Dubai is a dazzling fusion of futuristic architecture and timeless Arabian hospitality.",
          },
          {
            id: 7,
            title: "Paris Romance",
            location: "Paris, France",
            image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80",
            rating: 4.9,
            days: "8 Days",
            price: "₹1,20,000",
            description:
              "Stroll along the Seine, marvel at the Eiffel Tower, and savour world-class cuisine. Paris is the city of love, art, and timeless elegance.",
          },
          {
            id: 8,
            title: "Maldives Escape",
            location: "Maldives",
            image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80",
            rating: 5.0,
            days: "6 Days",
            price: "₹1,50,000",
            description:
              "Crystal-clear lagoons, overwater bungalows, and pristine coral reefs — the Maldives is pure luxury set against an impossibly blue horizon.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  // Derived filtered list — works on API-fetched destinations
  const filteredData = useMemo(
    () =>
      destinations.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.location.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm, destinations]
  );

  return (
    <section className="min-h-screen w-full bg-[#020817] text-white px-5 md:px-14 py-20 overflow-hidden">

      {/* HEADER */}
      <div className="text-center mb-14">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-bold leading-tight"
        >
          Explore Beautiful
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {" "}Destinations
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg"
        >
          Search and discover premium travel destinations around the world.
        </motion.p>
      </div>

      {/* SEARCH BAR */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto mb-20"
      >
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 blur-xl opacity-30 group-hover:opacity-50 transition duration-300 rounded-full" />

          <div className="relative bg-white/5 backdrop-blur-2xl border border-cyan-500/20 rounded-full overflow-hidden flex items-center px-6 py-4">
            <Search className="text-cyan-400 mr-4" size={24} />
            <input
              type="text"
              placeholder="Search destinations, countries, tours..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent outline-none text-lg placeholder:text-gray-500"
            />
          </div>
        </div>
      </motion.div>

      {/* LOADING STATE */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-32 gap-6">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20" />
            <div className="absolute inset-0 rounded-full border-4 border-t-cyan-400 animate-spin" />
          </div>
          <p className="text-gray-400 text-lg animate-pulse">
            Discovering destinations for you...
          </p>
        </div>
      )}

      {/* DESTINATION GRID */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
          {filteredData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              onClick={() => setSelectedDestination(item)}
              className="group relative h-[480px] rounded-[30px] overflow-hidden cursor-pointer bg-[#09111f] border border-cyan-500/10"
            >
              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition duration-700 group-hover:scale-110 group-hover:saturate-150"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-[#020817]/20 to-transparent" />

              {/* HOVER EFFECT */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-cyan-500/10" />

              {/* CONTENT */}
              <div className="absolute bottom-0 w-full p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-cyan-300 text-sm">
                    <MapPin size={16} />
                    {item.location}
                  </div>

                  <div className="flex items-center gap-1 bg-black/40 px-3 py-1 rounded-full backdrop-blur-md">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{item.rating}</span>
                  </div>
                </div>

                <h2 className="text-3xl font-bold mb-3 group-hover:text-cyan-400 transition">
                  {item.title}
                </h2>

                <p className="text-gray-300 text-sm line-clamp-2 mb-5">
                  {item.description}
                </p>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <Clock3 size={16} />
                    {item.days}
                  </div>
                  <div className="text-2xl font-bold text-white">{item.price}</div>
                </div>

                <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center gap-2 font-semibold hover:scale-105 transition duration-300">
                  Explore Now
                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}

          {/* Empty state */}
          {filteredData.length === 0 && (
            <div className="col-span-full text-center py-20 text-gray-500 text-lg">
              No destinations found for &quot;{searchTerm}&quot;.
            </div>
          )}
        </div>
      )}

      {/* MODAL */}
      {selectedDestination && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-5">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#09111f] border border-cyan-500/20 rounded-[35px] max-w-5xl w-full overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-cyan-500/20 blur-[100px] rounded-full pointer-events-none" />

            <div className="grid md:grid-cols-2">
              {/* LEFT — IMAGE */}
              <div className="h-[500px] relative overflow-hidden">
                <img
                  src={selectedDestination.image}
                  alt={selectedDestination.title}
                  className="w-full h-full object-cover hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020817] to-transparent" />

                <div className="absolute top-5 left-5 bg-black/40 backdrop-blur-xl px-4 py-2 rounded-full flex items-center gap-2 border border-cyan-500/20">
                  <MapPin size={16} className="text-cyan-400" />
                  <span className="text-sm text-white">{selectedDestination.location}</span>
                </div>
              </div>

              {/* RIGHT — DETAILS */}
              <div className="p-8 flex flex-col justify-center relative z-10">
                <h2 className="text-4xl font-bold mb-5 leading-tight">
                  {selectedDestination.title}
                </h2>

                <p className="text-gray-400 leading-relaxed mb-6">
                  {selectedDestination.description}
                </p>

                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Starting Price</p>
                    <div className="text-4xl font-bold text-cyan-400">
                      {selectedDestination.price}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-cyan-500/10">
                    <Star size={18} className="fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{selectedDestination.rating}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <Link
                    to="/find-flights"
                    className="flex items-center justify-center w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition duration-300 font-semibold"
                  >
                    Book Flight
                  </Link>

                  <Link
                    to="/trains"
                    className="flex items-center justify-center w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition duration-300 font-semibold"
                  >
                    Book Train
                  </Link>

                  <Link
                    to="/hotels"
                    className="flex items-center justify-center w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition duration-300 font-semibold"
                  >
                    Book Hotel
                  </Link>

                  <Link
                    to="/transport"
                    className="flex items-center justify-center w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition duration-300 font-semibold"
                  >
                    Book Transport
                  </Link>
                </div>

                <button
                  onClick={() => setSelectedDestination(null)}
                  className="w-full py-4 rounded-2xl bg-white/5 border border-red-500/20 text-red-400 font-semibold hover:bg-red-500/10 transition duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}

export default DestinationComponents;