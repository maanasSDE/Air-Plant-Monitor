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
import axios from "axios";

function App() {
  const [aqi, setAqi] = useState(35);
  const [sunlightLevel, setSunlightLevel] = useState("medium");
  const [showPlantSuggestions, setShowPlantSuggestions] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [showAQI, setShowAQI] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiKey = import.meta.env.VITE_API_KEY;

  const url = `https://api.waqi.info/feed/${selectedCity}/?token=${apiKey}`;

  // Sample states and cities (you can expand this list)
  const states = [
    "Andhra_Pradesh",
    "Arunachal_Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Delhi",
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
    Andhra_Pradesh: [
      "Visakhapatnam",
      "Vijayawada",
      "Guntur",
      "Nellore",
      "Kurnool",
      "Rajahmundry",
      "Tirupati",
      "Kakinada",
      "Kadapa",
      "Anantapur",
      "Eluru",
      "Ongole",
      "Srikakulam",
      "Chittoor",
      "Vizianagaram",
      "Machilipatnam",
      "Tenali",
      "Proddatur",
      "Adoni",
      "Hindupur",
      "Bhimavaram",
      "Nandyal",
      "Gudivada",
      "Tadepalligudem",
      "Chilakaluripet",
      "Anakapalle",
      "Madanapalle",
      "Guntakal",
      "Dharmavaram",
      "Tadipatri",
      "Amaravati",
    ],
    Arunachal_Pradesh: [
      "Itanagar",
      "Tawang",
      "Ziro",
      "Pasighat",
      "Naharlagun",
      "Bomdila",
      "Tezpur",
      "Aalo",
      "Daporijo",
      "Roing",
      "Yupia",
      "Khonsa",
      "Namsai",
      "Changlang",
    ],
    Assam: [
      "Guwahati",
      "Dibrugarh",
      "Silchar",
      "Jorhat",
      "Nagaon",
      "Tinsukia",
      "Barpeta",
      "Tezpur",
      "Haflong",
      "Bongaigaon",
      "Golaghat",
      "Karimganj",
      "Sibsagar",
      "Dhekiajuli",
      "Majuli",
    ],
    Bihar: [
      "Patna",
      "Gaya",
      "Bhagalpur",
      "Muzaffarpur",
      "Darbhanga",
      "Munger",
      "Purnia",
      "Saharsa",
      "Buxar",
      "Samastipur",
      "Chhapra",
      "Bihar Sharif",
      "Arrah",
      "Forbesganj",
      "Motihari",
    ],
    Chhattisgarh: [
      "Raipur",
      "Bilaspur",
      "Durg",
      "Korba",
      "Raigarh",
      "Jagdalpur",
      "Ambikapur",
      "Bemetara",
      "Mahasamund",
      "Janjgir-Champa",
      "Rajnandgaon",
      "Kawardha",
      "Kanker",
      "Surguja",
      "Balod",
    ],
    Delhi: [
      "New Delhi",
      "Old Delhi",
      "Dwarka",
      "Rohini",
      "Saket",
      "Karol Bagh",
      "Connaught Place",
      "Lajpat Nagar",
      "Rajouri Garden",
      "Pitampura",
      "Vasant Kunj",
      "Mayur Vihar",
      "Shahdara",
      "Chandni Chowk",
      "Hauz Khas",
      "Defence Colony",
      "Greater Kailash",
      "Janakpuri",
      "Okhla",
      "Laxmi Nagar",
      "Mehrauli",
      "Patel Nagar",
      "Tilak Nagar",
      "Paschim Vihar",
      "Sarita Vihar",
      "Nehru Place",
      "Green Park",
      "Ashok Vihar",
      "Nangloi",
      "Model Town",
    ],
    Goa: [
      "Panaji",
      "Margao",
      "Vasco da Gama",
      "Mapusa",
      "Ponda",
      "Old Goa",
      "Cortalim",
      "Bicholim",
      "Quepem",
      "Sanguem",
    ],
    Gujarat: [
      "Ahmedabad",
      "Surat",
      "Vadodara",
      "Rajkot",
      "Bhavnagar",
      "Junagadh",
      "Anand",
      "Nadiad",
      "Gandhinagar",
      "Navsari",
      "Valsad",
      "Mehsana",
      "Amreli",
      "Bhuj",
      "Godhra",
    ],
    Haryana: [
      "Chandigarh",
      "Gurugram",
      "Faridabad",
      "Ambala",
      "Hisar",
      "Karnal",
      "Rohtak",
      "Panipat",
      "Yamunanagar",
      "Sonipat",
      "Bhiwani",
      "Fatehabad",
      "Jhajjar",
      "Sirsa",
      "Kurukshetra",
    ],
    Himachal_Pradesh: [
      "Shimla",
      "Dharamshala",
      "Kullu",
      "Manali",
      "Solan",
      "Hamirpur",
      "Kangra",
      "Mandi",
      "Chamba",
      "Una",
      "Bilaspur",
      "Nahan",
      "Palampur",
      "Kasauli",
      "Rampur",
    ],
    Jharkhand: [
      "Ranchi",
      "Jamshedpur",
      "Dhanbad",
      "Bokaro",
      "Hazaribagh",
      "Giridih",
      "Deoghar",
      "Ramgarh",
      "Chaibasa",
      "Dumka",
      "Jamtara",
      "Pakur",
      "Koderma",
      "Palamu",
      "Latehar",
    ],
    Karnataka: [
      "Bengaluru",
      "Mysuru",
      "Hubballi",
      "Dharwad",
      "Mangalore",
      "Belagavi",
      "Tumakuru",
      "Shimoga",
      "Udupi",
      "Bijapur",
      "Bagalkot",
      "Chitradurga",
      "Kolar",
      "Chikkamagaluru",
      "Raichur",
    ],
    Kerala: [
      "Thiruvananthapuram",
      "Kochi",
      "Kozhikode",
      "Kottayam",
      "Thrissur",
      "Alappuzha",
      "Malappuram",
      "Kannur",
      "Pathanamthitta",
      "Palakkad",
      "Idukki",
      "Wayanad",
      "Ponnani",
      "Muvattupuzha",
      "Ottappalam",
    ],
    Madhya_Pradesh: [
      "Bhopal",
      "Indore",
      "Gwalior",
      "Jabalpur",
      "Ujjain",
      "Sagar",
      "Satna",
      "Khandwa",
      "Ratlam",
      "Kolkata",
      "Chhindwara",
      "Rewa",
      "Bhilai",
      "Dewas",
      "Burhanpur",
    ],
    Maharashtra: [
      "Mumbai",
      "Pune",
      "Nagpur",
      "Nashik",
      "Aurangabad",
      "Thane",
      "Solapur",
      "Amravati",
      "Kolhapur",
      "Chandrapur",
      "Jalgaon",
      "Nanded",
      "Ratnagiri",
      "Dhule",
      "Akola",
    ],
    Manipur: [
      "Imphal",
      "Thoubal",
      "Churachandpur",
      "Bishnupur",
      "Kangpokpi",
      "Tamenglong",
      "Senapati",
      "Ukhrul",
      "Jiribam",
      "Imphal East",
      "Imphal West",
    ],
    Meghalaya: [
      "Shillong",
      "Tura",
      "Jowai",
      "Nongstoin",
      "Williamnagar",
      "Baghmara",
      "Mairang",
      "Resubelpara",
      "Nongpoh",
      "Cherapunjee",
    ],
    Mizoram: [
      "Aizawl",
      "Lunglei",
      "Champhai",
      "Siaha",
      "Kolasib",
      "Serchhip",
      "Mamit",
      "Lawngtlai",
      "Hnahthial",
      "Khawzawl",
    ],
    Nagaland: [
      "Kohima",
      "Dimapur",
      "Mokokchung",
      "Wokha",
      "Mon",
      "Zunheboto",
      "Peren",
      "Tuensang",
      "Longleng",
      "Kiphire",
    ],
    Odisha: [
      "Bhubaneswar",
      "Cuttack",
      "Rourkela",
      "Brahmapur",
      "Sambalpur",
      "Berhampur",
      "Balasore",
      "Puri",
      "Koraput",
      "Baripada",
      "Angul",
      "Dhenkanal",
      "Jeypore",
      "Kendrapara",
      "Bargarh",
    ],
    Punjab: [
      "Chandigarh",
      "Amritsar",
      "Ludhiana",
      "Jalandhar",
      "Patiala",
      "Bathinda",
      "Moga",
      "Hoshiarpur",
      "Firozpur",
      "Pathankot",
      "Sangrur",
      "Faridkot",
      "Barnala",
      "Rupnagar",
      "Kapurthala",
    ],
    Rajasthan: [
      "Jaipur",
      "Jodhpur",
      "Udaipur",
      "Kota",
      "Ajmer",
      "Bikaner",
      "Chittorgarh",
      "Alwar",
      "Sikar",
      "Bhilwara",
      "Pali",
      "Sri Ganganagar",
      "Tonk",
      "Barmer",
      "Jhunjhunu",
    ],
    Sikkim: [
      "Gangtok",
      "Namchi",
      "Jorethang",
      "Mangan",
      "Rangpo",
      "Pakyong",
      "Rabong",
      "Singtam",
      "Yuksom",
      "Lachung",
    ],
    Tamil_Nadu: [
      "Chennai",
      "Coimbatore",
      "Madurai",
      "Tiruchirappalli",
      "Salem",
      "Erode",
      "Vellore",
      "Tirunelveli",
      "Thoothukudi",
      "Dindigul",
      "Nagercoil",
      "Karur",
      "Kanchipuram",
      "Cuddalore",
      "Vikramasingapuram",
    ],
    Telangana: [
      "Hyderabad",
      "Warangal",
      "Khammam",
      "Karimnagar",
      "Nizamabad",
      "Nalgonda",
      "Mahabubnagar",
      "Adilabad",
      "Ramagundam",
      "Suryapet",
      "Jagtial",
      "Siddipet",
      "Peddapalli",
      "Miryalaguda",
      "Kothagudem",
    ],
    Tripura: [
      "Agartala",
      "Udaipur",
      "Dharmanagar",
      "Ambassa",
      "Kailashahar",
      "Sepahijala",
      "Khowai",
      "Belonia",
      "Sonamura",
      "Mohanpur",
    ],
    Uttar_Pradesh: [
      "Lucknow",
      "Kanpur",
      "Varanasi",
      "Agra",
      "Meerut",
      "Prayagraj",
      "Ghaziabad",
      "Aligarh",
      "Bareilly",
      "Moradabad",
      "Saharanpur",
      "Gorakhpur",
      "Ayodhya",
      "Jhansi",
      "Firozabad",
      "Noida",
      "Rampur",
      "Shahjahanpur",
      "Mathura",
      "Muzaffarnagar",
      "Budaun",
      "Bulandshahr",
      "Azamgarh",
      "Loni",
      "Sitapur",
      "Mau",
      "Farrukhabad",
      "Hapur",
      "Etawah",
      "Raebareli",
      "Modinagar",
      "Sambhal",
      "Orai",
      "Jaunpur",
      "Bahraich",
      "Unnao",
      "Shivpuri",
      "Mirzapur",
      "Gonda",
      "Banda",
      "Amroha",
      "Barabanki",
      "Hardoi",
      "Kaushambi",
      "Basti",
      "Etah",
      "Deoria",
      "Mainpuri",
      "Chandauli",
      "Pilibhit",
      "Sultanpur",
      "Faizabad",
      "Shikohabad",
      "Kasganj",
      "Rae Bareli",
      "Fatehpur",
      "Lalitpur",
      "Balrampur",
      "Ghazipur",
      "Siddharthnagar",
      "Baghpat",
      "Bijnor",
      "Chitrakoot",
      "Hamirpur",
      "Mahoba",
      "Kushinagar",
    ],
    Uttarakhand: [
      "Dehradun",
      "Haridwar",
      "Rishikesh",
      "Roorkee",
      "Haldwani",
      "Nainital",
      "Almora",
      "Pithoragarh",
      "Rudrapur",
      "Kashipur",
      "Kotdwar",
      "Chamoli",
      "Bageshwar",
      "Tehri",
      "Mussoorie",
      "Udham Singh Nagar",
      "Champawat",
      "Ranikhet",
      "Uttarkashi",
      "Lansdowne",
      "Gopeshwar",
      "Devprayag",
      "New Tehri",
      "Joshimath",
      "Dwarahat",
      "Gangotri",
      "Yamunotri",
      "Mukteshwar",
      "Badrinath",
    ],
    West_Bengal: [
      "Kolkata",
      "Howrah",
      "Siliguri",
      "Durgapur",
      "Asansol",
      "Bardhaman",
      "Malda",
      "Berhampore",
      "Kurseong",
      "Alambazar",
      "Haldia",
      "Kolar",
      "Bishnupur",
      "Rampurhat",
      "Purulia",
    ],
  };

  // Simulate AQI changes
  // useEffect(() => {
  //   if (showAQI) {
  //     const interval = setInterval(() => {
  //       setAqi((prev) => prev + (Math.random() > 0.5 ? 1 : -1));
  //     }, 3000);
  //     return () => clearInterval(interval);
  //   }
  // }, [showAQI]);

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      const apiValue = response.data.data.aqi;
      setAqi(apiValue);
    } finally {
      setLoading(false);
    }
  };

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
      fetchData();
      setShowAQI(true);
    }
  };

  const aqiInfo = getAqiInfo(aqi);

  const plantSuggestions = {
    low: [
      {
        name: "Snake Plant",
        description: "Excellent air purifier, tolerates low light",
        link: "https://en.wikipedia.org/wiki/Sansevieria",
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
            <Leaf className="text-emerald-600 h-8 w-8" />
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
