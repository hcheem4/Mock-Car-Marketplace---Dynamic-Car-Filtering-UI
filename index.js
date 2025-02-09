const carInnerEl = document.querySelector(".featured-cars");

// Function to filter cars when brand or type is selected
function filterCars(event) {
  if (event) {
    event.preventDefault(); // Prevents form submission
  }
  const selectedBrand = document.getElementById("brand").value; // Get selected brand
  const selectedType = document.getElementById("type").value; // Get selected type
  const selectedTransmission = document.getElementById("transmission").value; // Get selected transmission
  const maxPrice = document.getElementById("price").value; // Get selected price
  const maxMileage = document.getElementById("mileage").value; // Get selected mileage

  console.log("Max Price Input Value:", maxPrice); // Debugging line
  renderCars(
    selectedBrand,
    selectedType,
    selectedTransmission,
    maxPrice,
    maxMileage
  ); // Call render function with both filters
}

// Render cars with optional brand and type filter
async function renderCars(
  selectedBrand = "",
  selectedType = "",
  selectedTransmission = "",
  maxPrice = "",
  maxMileage = ""
) {
  // Show skeleton loader before fetching data
  carInnerEl.innerHTML = getSkeletonHTML();

  const cars = await getCars(); // Fetch car data

  let filteredCars = cars;

  // Apply brand filter if selected
  if (selectedBrand) {
    filteredCars = filteredCars.filter((car) =>
      car.title.includes(selectedBrand)
    );
  }

  // Apply type filter if selected
  if (selectedType) {
    filteredCars = filteredCars.filter((car) => car.type === selectedType);
  }

  // Apply transmission filter if selected
  if (selectedTransmission) {
    filteredCars = filteredCars.filter(
      (car) => car.transmission === selectedTransmission
    );
  }

  // Apply max price filter (Ensure price is treated as a number)
  if (maxPrice) {
    const maxPriceNumber = parseInt(maxPrice, 10); // Convert to number
    if (!isNaN(maxPriceNumber)) {
      filteredCars = filteredCars.filter((car) => car.price <= maxPriceNumber);
    }
  }

  // Apply max mileage filter (Ensure mileage is treated as a number)
  if (maxMileage) {
    const maxMileNumber = parseInt(maxMileage, 10); // Convert to number
    if (!isNaN(maxMileNumber)) {
      filteredCars = filteredCars.filter((car) => car.km <= maxMileNumber);
    }
  }

  // Replace skeleton loader with actual car data
  carInnerEl.innerHTML = filteredCars.map((car) => carsHTML(car)).join("");
}

// Function to generate skeleton loaders
function getSkeletonHTML() {
  return `
      <div class="skeleton-container">
        ${Array(6).fill(`<div class="skeleton-car"></div>`).join("")}
      </div>
    `;
}

// Function to clear price input and update filter
function clearPrice() {
  document.getElementById("price").value = "";
  filterCars();
}

// Function to clear mileage input and update filter
function clearMileage() {
  document.getElementById("mileage").value = "";
  filterCars();
}

// 🔥 Function to Clear ALL Filters
function clearAllFilters() {
  document.getElementById("brand").value = "";
  document.getElementById("type").value = "";
  document.getElementById("transmission").value = "";
  document.getElementById("price").value = "";
  document.getElementById("mileage").value = "";

  filterCars(); // Reload all cars
}

function carsHTML(car) {
  return `
  <div class="car">
    <figure class="car__image-wrapper">
      <img class="car__img" src="${car.url}" alt="${car.title}" />
    </figure>
    <h2 class="car__title">${car.title}</h2>
    <div class="car__details">
      <p class="car__detail"><i class="fa-solid fa-road icons__margin"></i> ${
        car.km
      } km</p>
      <p class="car__detail"><i class="fa-solid fa-car icons__margin"></i> ${
        car.type
      }</p>
      <p class="car__detail"><i class="fa-solid fa-cogs icons__margin"></i> ${
        car.transmission
      }</p>
    </div>
    <p class="car__price">$${car.price.toLocaleString()}</p>
    <button class="car__button">View Details</button>
  </div>
`;
}

renderCars();

// FAKE CAR API
function getCars() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "2021 Volkswagen T-Roc",
          url: "https://images.carexpert.com.au/resize/3000/-/app/uploads/2020/12/2021-Volkswagen-T-Roc-110TSI-Style-Review-9.jpeg?_gl=1*qnc585*_gcl_au*MjYyMjc4NzI4LjE3Mzg4NTg3ODI.",
          price: 33900,
          km: 20000,
          type: "Wagon",
          transmission: "Automatic",
        },
        // Toyota Cars (6)
        {
          id: 2,
          title: "2022 Toyota Corolla",
          url: "https://d2ivfcfbdvj3sm.cloudfront.net/7fc965ab77efe6e0fa62e4ca1ea7673bb65843530c1e3d8e88cb10/stills_0640_png/MY2022/52227/52227_st0640_116.png",
          price: 25500,
          km: 5000,
          type: "Sedan",
          transmission: "CVT Automatic",
        },
        {
          id: 3,
          title: "2023 Toyota RAV4",
          url: "./assets/rav4-jpeg.avif",
          price: 39500,
          km: 12000,
          type: "SUV",
          transmission: "Automatic",
        },
        {
          id: 4,
          title: "2021 Toyota Camry XSE",
          url: "./assets/camryjpeg.jpg",
          price: 31500,
          km: 8000,
          type: "Sedan",
          transmission: "Automatic",
        },
        {
          id: 5,
          title: "2022 Toyota Hilux",
          url: "./assets/hiluxjpeg.webp",
          price: 45000,
          km: 15000,
          type: "Pickup",
          transmission: "Automatic",
        },
        {
          id: 6,
          title: "2020 Toyota Yaris",
          url: "./assets/yaris_gr_009.jpg",
          price: 21000,
          km: 22000,
          type: "Hatchback",
          transmission: "Automatic",
        },
        {
          id: 7,
          title: "2023 Toyota Land Cruiser",
          url: "./assets/land-cruiser-exterior-right-front-three-quarter-2.webp",
          price: 85000,
          km: 5000,
          type: "SUV",
          transmission: "Automatic",
        },
        // Kia Cars (5)
        {
          id: 8,
          title: "2022 Kia Forte",
          url: "./assets/forte.jpeg",
          price: 23500,
          km: 10000,
          type: "Sedan",
          transmission: "Automatic",
        },
        {
          id: 9,
          title: "2023 Kia Sportage",
          url: "./assets/sportage.jpg",
          price: 32000,
          km: 5000,
          type: "SUV",
          transmission: "Automatic",
        },
        {
          id: 10,
          title: "2021 Kia Soul",
          url: "./assets/kiasoul.jpeg",
          price: 19500,
          km: 16000,
          type: "Hatchback",
          transmission: "CVT Automatic",
        },
        {
          id: 11,
          title: "2023 Kia Telluride",
          url: "./assets/telluride.webp",
          price: 48000,
          km: 8000,
          type: "SUV",
          transmission: "Automatic",
        },
        {
          id: 12,
          title: "2020 Kia Stinger GT",
          url: "./assets/stingergt.jpeg",
          price: 44000,
          km: 20000,
          type: "Sedan",
          transmission: "Automatic",
        },
        // Cadillac Cars (3)
        {
          id: 13,
          title: "2022 Cadillac CT5-V",
          url: "./assets/ct5v.jpeg",
          price: 52000,
          km: 12000,
          type: "Sedan",
          transmission: "Auto Sequential Sport",
        },
        {
          id: 14,
          title: "2023 Cadillac Escalade",
          url: "./assets/escalade.jpeg",
          price: 95000,
          km: 6000,
          type: "SUV",
          transmission: "Automatic",
        },
        {
          id: 15,
          title: "2021 Cadillac XT5",
          url: "./assets/xt5.jpeg",
          price: 46000,
          km: 10000,
          type: "SUV",
          transmission: "Automatic",
        },
        // Honda Cars (6)
        {
          id: 16,
          title: "2023 Honda Civic",
          url: "./assets/civic.jpeg",
          price: 27500,
          km: 5000,
          type: "Sedan",
          transmission: "CVT Automatic",
        },
        {
          id: 17,
          title: "2022 Honda CR-V",
          url: "./assets/crv.jpeg",
          price: 34000,
          km: 7000,
          type: "SUV",
          transmission: "Automatic",
        },
        {
          id: 18,
          title: "2021 Honda Accord",
          url: "./assets/accord.jpeg",
          price: 29000,
          km: 12000,
          type: "Sedan",
          transmission: "Automatic",
        },
        {
          id: 19,
          title: "2023 Honda HR-V",
          url: "./assets/hrv.jpeg",
          price: 27000,
          km: 6000,
          type: "SUV",
          transmission: "Automatic",
        },
        {
          id: 20,
          title: "2020 Honda Fit",
          url: "./assets/fit.jpg",
          price: 18000,
          km: 20000,
          type: "Hatchback",
          transmission: "Automatic",
        },
        {
          id: 21,
          title: "2022 Honda Pilot",
          url: "./assets/pilot.jpeg",
          price: 41000,
          km: 8000,
          type: "SUV",
          transmission: "Automatic",
        },
        // Subaru Cars (5)
        {
          id: 22,
          title: "2023 Subaru Outback",
          url: "./assets/outback.jpeg",
          price: 33000,
          km: 7000,
          type: "Wagon",
          transmission: "Automatic",
        },
        {
          id: 23,
          title: "2022 Subaru Crosstrek",
          url: "./assets/crosstrek.jpeg",
          price: 29000,
          km: 12000,
          type: "SUV",
          transmission: "CVT Automatic",
        },
        {
          id: 24,
          title: "2021 Subaru WRX STI",
          url: "./assets/WRX STI.jpeg",
          price: 42000,
          km: 10000,
          type: "Sedan",
          transmission: "Manual",
        },
        {
          id: 25,
          title: "2020 Subaru BRZ",
          url: "./assets/brz.jpeg",
          price: 31000,
          km: 15000,
          type: "Coupe",
          transmission: "Manual",
        },
        {
          id: 26,
          title: "2023 Subaru Forester",
          url: "./assets/forester.jpg",
          price: 36000,
          km: 5000,
          type: "SUV",
          transmission: "Automatic",
        },
      ]);
    }, 1000);
  });
}
