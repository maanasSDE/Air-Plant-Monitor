import React, { useState, useEffect } from "react";
import {
  Leaf,
  Sun,
  Wind,
  Plane as Plant,
  Search,
  Cloud,
  Droplets,
  Trees,
  Flower2,
  MapPin,
} from "lucide-react";

function App() {
  const [aqi, setAqi] = useState(35);
  const [sunlightLevel, setSunlightLevel] = useState("medium");
  const [showPlantSuggestions, setShowPlantSuggestions] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [showAQI, setShowAQI] = useState(false);

  // Sample states and cities (you can expand this list)
  const states = [
    "Andhra_Pradesh",
    "Arunachal_Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal_Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya_Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil_Nadu",
    "Telangana",
    "Tripura",
    "Uttar_Pradesh",
    "Uttarakhand",
    "West_Bengal",
  ];

  const cities = {
    Andhra_Pradesh: ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore"],
    Arunachal_Pradesh: ["Itanagar", "Tawang", "Ziro", "Pasighat"],
    Assam: ["Guwahati", "Dibrugarh", "Silchar", "Jorhat"],
    Bihar: ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur"],
    Chhattisgarh: ["Raipur", "Bilaspur", "Durg", "Korba"],
    Goa: ["Panaji", "Margao", "Vasco da Gama", "Mapusa"],
    Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
    Haryana: ["Gurgaon", "Faridabad", "Panipat", "Ambala"],
    Himachal_Pradesh: ["Shimla", "Manali", "Dharamshala", "Mandi"],
    Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"],
    Karnataka: ["Bengaluru", "Mysuru", "Mangalore", "Hubli"],
    Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"],
    Madhya_Pradesh: ["Bhopal", "Indore", "Gwalior", "Jabalpur"],
    Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik"],
    Manipur: ["Imphal", "Thoubal", "Bishnupur", "Churachandpur"],
    Meghalaya: ["Shillong", "Tura", "Jowai", "Nongpoh"],
    Mizoram: ["Aizawl", "Lunglei", "Champhai", "Serchhip"],
    Nagaland: ["Kohima", "Dimapur", "Mokokchung", "Zunheboto"],
    Odisha: ["Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur"],
    Punjab: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala"],
    Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Kota"],
    Sikkim: ["Gangtok", "Namchi", "Gyalshing", "Mangan"],
    Tamil_Nadu: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"],
    Telangana: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"],
    Tripura: ["Agartala", "Udaipur", "Dharmanagar", "Kailashahar"],
    Uttar_Pradesh: ["Lucknow", "Kanpur", "Varanasi", "Agra"],
    Uttarakhand: ["Dehradun", "Haridwar", "Nainital", "Haldwani"],
    West_Bengal: ["Kolkata", "Siliguri", "Durgapur", "Asansol"],
  };

  // Simulate AQI changes
  useEffect(() => {
    if (showAQI) {
      const interval = setInterval(() => {
        setAqi((prev) => prev + (Math.random() > 0.5 ? 1 : -1));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [showAQI]);

  const getAqiInfo = (value: number) => {
    if (value <= 50)
      return {
        level: "Good",
        color: "text-green-500",
        bgColor: "bg-green-100",
        suggestion:
          "Air quality is satisfactory. Perfect for outdoor activities!",
      };
    if (value <= 100)
      return {
        level: "Moderate",
        color: "text-yellow-500",
        bgColor: "bg-yellow-100",
        suggestion:
          "Air quality is acceptable. Consider reducing prolonged outdoor activities if you are sensitive.",
      };
    if (value <= 150)
      return {
        level: "Unhealthy for Sensitive Groups",
        color: "text-orange-500",
        bgColor: "bg-orange-100",
        suggestion:
          "Members of sensitive groups may experience health effects. Consider staying indoors.",
      };
    if (value <= 200)
      return {
        level: "Unhealthy",
        color: "text-red-500",
        bgColor: "bg-red-100",
        suggestion:
          "Everyone may begin to experience health effects. Avoid outdoor activities.",
      };
    if (value <= 300)
      return {
        level: "Very Unhealthy",
        color: "text-purple-500",
        bgColor: "bg-purple-100",
        suggestion:
          "Health alert: everyone may experience more serious health effects. Stay indoors!",
      };
    return {
      level: "Hazardous",
      color: "text-red-900",
      bgColor: "bg-red-200",
      suggestion:
        "Health warnings of emergency conditions. Avoid all outdoor activities!",
    };
  };

  const handleLocationSubmit = () => {
    if (selectedState && selectedCity) {
      setShowAQI(true);
    }
  };

  const aqiInfo = getAqiInfo(aqi);

  const plantSuggestions = {
    low: [
      {
        name: "Snake Plant",
        description: "Excellent air purifier, tolerates low light",
      },
      {
        name: "ZZ Plant",
        description: "Hardy plant that thrives in low light conditions",
      },
    ],
    medium: [
      {
        name: "Peace Lily",
        description: "Beautiful flowering plant, great air purifier",
      },
      {
        name: "Spider Plant",
        description: "Fast-growing, excellent for hanging baskets",
      },
    ],
    high: [
      {
        name: "Bamboo Palm",
        description: "Natural humidifier and air purifier",
      },
      {
        name: "Fiddle Leaf Fig",
        description: "Stunning plant that loves bright light",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 relative overflow-hidden">
      {/* Background Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* First set of icons */}
        <Leaf
          className="absolute left-[5%] text-emerald-200 h-24 w-24 opacity-20 animate-float-up"
          style={{ animationDelay: "0s" }}
        />
        <Cloud
          className="absolute right-[15%] text-emerald-200 h-32 w-32 opacity-10 animate-float-up-slow"
          style={{ animationDelay: "3s" }}
        />
        <Droplets
          className="absolute left-[20%] text-emerald-200 h-20 w-20 opacity-15 animate-float-up-fast"
          style={{ animationDelay: "6s" }}
        />
        <Trees
          className="absolute right-[5%] text-emerald-200 h-28 w-28 opacity-20 animate-float-up"
          style={{ animationDelay: "9s" }}
        />
        <Flower2
          className="absolute right-[25%] text-emerald-200 h-24 w-24 opacity-15 animate-float-up-fast"
          style={{ animationDelay: "12s" }}
        />
        <Sun
          className="absolute left-[10%] text-emerald-200 h-36 w-36 opacity-10 animate-float-up-slow"
          style={{ animationDelay: "15s" }}
        />

        {/* Duplicate set of icons with different delays for continuous effect */}
        <Leaf
          className="absolute left-[15%] text-emerald-200 h-24 w-24 opacity-20 animate-float-up"
          style={{ animationDelay: "7.5s" }}
        />
        <Cloud
          className="absolute right-[25%] text-emerald-200 h-32 w-32 opacity-10 animate-float-up-slow"
          style={{ animationDelay: "10.5s" }}
        />
        <Droplets
          className="absolute left-[30%] text-emerald-200 h-20 w-20 opacity-15 animate-float-up-fast"
          style={{ animationDelay: "13.5s" }}
        />
        <Trees
          className="absolute right-[15%] text-emerald-200 h-28 w-28 opacity-20 animate-float-up"
          style={{ animationDelay: "16.5s" }}
        />
        <Flower2
          className="absolute right-[35%] text-emerald-200 h-24 w-24 opacity-15 animate-float-up-fast"
          style={{ animationDelay: "19.5s" }}
        />
        <Sun
          className="absolute left-[20%] text-emerald-200 h-36 w-36 opacity-10 animate-float-up-slow"
          style={{ animationDelay: "22.5s" }}
        />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between mb-12 animate-slide-down">
          <div className="flex items-center gap-2">
            <Leaf className="text-emerald-600 h-8 w-8 animate-spin-slow" />
            <h1 className="text-3xl font-bold text-emerald-800">
              AirPlant Monitor
            </h1>
          </div>
        </header>

        {/* Location Selector */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="text-emerald-600 h-6 w-6" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Select Location
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 mb-2">State</label>
              <select
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setSelectedCity("");
                  setShowAQI(false);
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">City</label>
              <select
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  setShowAQI(false);
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                disabled={!selectedState}
              >
                <option value="">Select City</option>
                {selectedState &&
                  cities[selectedState as keyof typeof cities].map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <button
            onClick={handleLocationSubmit}
            disabled={!selectedState || !selectedCity}
            className={`w-full py-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
              !selectedState || !selectedCity
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-700 text-white hover:scale-[1.02] transform"
            }`}
          >
            Show Air Quality
          </button>
        </div>

        {/* Main Content */}
        {showAQI && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* AQI Monitor */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg transform transition-all hover:scale-[1.02] animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <Wind className="text-emerald-600 h-6 w-6 animate-breeze" />
                <h2 className="text-2xl font-semibold text-gray-800">
                  Real-time AQI for {selectedCity}, {selectedState}
                </h2>
              </div>
              <div className="text-center mb-6">
                <div
                  className={`text-6xl font-bold mb-4 transition-all transform hover:scale-110 ${aqiInfo.color}`}
                >
                  {Math.round(aqi)}
                </div>
                <div
                  className={`inline-block px-4 py-2 rounded-full ${aqiInfo.bgColor} ${aqiInfo.color} font-semibold mb-4 animate-pulse-slow`}
                >
                  {aqiInfo.level}
                </div>
                <p className="text-gray-600">{aqiInfo.suggestion}</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div
                  className="h-2.5 rounded-full transition-all duration-500 animate-expand"
                  style={{
                    width: `${Math.min((aqi / 500) * 100, 100)}%`,
                    backgroundColor: getComputedStyle(
                      document.documentElement
                    ).getPropertyValue(`--${aqiInfo.color.split("-")[1]}-500`),
                  }}
                ></div>
              </div>
            </div>

            {/* Plant Suggestion */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg animate-fade-in-delayed">
              <div className="flex items-center gap-3 mb-6">
                <Plant className="text-emerald-600 h-6 w-6 animate-sway" />
                <h2 className="text-2xl font-semibold text-gray-800">
                  Plant Suggestions
                </h2>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">
                  Select Sunlight Level
                </label>
                <select
                  value={sunlightLevel}
                  onChange={(e) => setSunlightLevel(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="low">Low Light</option>
                  <option value="medium">Medium Light</option>
                  <option value="high">High Light</option>
                </select>
              </div>

              <button
                onClick={() => setShowPlantSuggestions(true)}
                className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 hover:scale-[1.02] transform transition-transform"
              >
                <Search className="h-5 w-5" />
                Find Perfect Plants
              </button>

              {showPlantSuggestions && (
                <div className="mt-6 space-y-4">
                  {plantSuggestions[
                    sunlightLevel as keyof typeof plantSuggestions
                  ].map((plant, index) => (
                    <div
                      key={index}
                      className="bg-emerald-50 p-4 rounded-lg border border-emerald-100 animate-slide-up hover:shadow-md transition-shadow"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <h3 className="font-semibold text-emerald-800">
                        {plant.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {plant.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Room Scanner CTA */}
        <div className="mt-8 bg-gradient-to-r from-emerald-600 to-green-500 rounded-2xl p-8 text-white text-center animate-fade-in-up backdrop-blur-sm">
          <h2 className="text-3xl font-bold mb-4">Comming Soon!!</h2>
          <h3 className="text-xl font-bold mb-4">
            Want a personalized analysis?
          </h3>
          <p className="mb-6">
            Use our room scanner to get detailed sunlight measurements and plant
            recommendations
          </p>
          <button className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-all hover:scale-105 transform">
            Launch Room Scanner
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
