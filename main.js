const barista = document.querySelector(".pic2");
let angle3 = 0;

function moveBarista() {
  const x3 = Math.sin(angle3 * 10) * 2;          // shake side to side (translateX)
  const rotate = Math.sin(angle3 * 15) * 5;      // tilt (rotate) ±5 degrees
  
  barista.style.transform = `translateX(${x3}px) rotate(${rotate}deg)`;
  
  angle3 += 0.02;
  requestAnimationFrame(moveBarista);
}

moveBarista();



const cloud = document.querySelector(".pic");
let angle = 0; // this will increase over time to simulate the "bop"

function moveCloud() {
  // Use sine wave to make the cloud move up and down smoothly
  const y = Math.sin(angle) * 5; // 10 is the amplitude (how far it moves up/down)
  cloud.style.transform = `translateY(${y}px)`;

  angle += 0.05; // controls speed; lower is slower and smoother
  requestAnimationFrame(moveCloud); // keeps the animation going
}

moveCloud(); // start the animation

const cloud2 = document.querySelector(".pic3");
let angle2 = 0;

function moveCloud2() {
  const y2 = Math.sin(angle2) * 5; // 10 is the amplitude (how far it moves up/down)
  cloud2.style.transform = `translateY(${y2}px)`;
  
  angle2 += 0.05; // controls speed; lower is slower and smoother
  requestAnimationFrame(moveCloud2); // keeps the animation going
}

moveCloud2(); // start the animation for the second cloud

// Weather API
function getWeather() {
  const apiKey = '1958c9c1520e87999f9545f9c846426a';
  const city = document.getElementById('city').value;
  if (!city) {
    alert('Please enter a city name');
    return;
  }
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(data => {
      displayCurrentWeather(data);
    })
    .catch(error => {
      console.error('Error fetching current weather:', error);
      alert('Error fetching current weather. Please try again.');
    });
  fetch(forecastUrl)
  .then(response => response.json())
  .then(data => {
    displayHourlyForecast(data); // not displayForecast
  })
  .catch(error => {
    console.error('Error fetching forecast:', error);
    alert('Error fetching forecast. Please try again.');
  });

}

function displayCurrentWeather(data) {
  const tempDivInfo = document.getElementById('temp-div');
  const weatherInfoDiv = document.getElementById('weather-info-div');
  const weatherIcon = document.getElementById('weather-icon');
  const hourlyForecastDiv = document.getElementById('hourly-forecast');

  // Clear previous content
  weatherInfoDiv.innerHTML = '';
  hourlyForecastDiv.innerHTML = '';
  tempDivInfo.innerHTML = '';

  if (data.cod !== 200) {
    weatherInfoDiv.innerHTML = `<p>Error: ${data.message}</p>`;
  } else {
    const cityName = data.name;
    const temprature = data.main.temp;
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    const tempratureHTML = `
    <p>${cityName} - ${temprature}°C</p>
    `;
    const weatherHTML = `
    <p>${cityName}
    <p>${description}</p>
    `;
    tempDivInfo.innerHTML = tempratureHTML;
    weatherInfoDiv.innerHTML = weatherHTML;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = description;
    
    showImage();
  }

}

function displayHourlyForecast(data) {
  const hourlyForecastDiv = document.getElementById('hourly-forecast');
  const next24Hours = data.list.slice(0, 8); // Next 24 hours (8 x 3hr steps)
  hourlyForecastDiv.innerHTML = ''; // Clear previous

  next24Hours.forEach(item => {
    const dateTime = new Date(item.dt * 1000);
    const hour = dateTime.getHours();
    const temp = item.main.temp;
    const iconCode = item.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    const hourlyItemHTML = `
      <div class="hourly-item">
        <span>${hour}:00</span>
        <img src="${iconUrl}" alt="Weather Icon">
        <p>${temp}°C</p>
      </div>
    `;

    hourlyForecastDiv.innerHTML += hourlyItemHTML;
  });
}


function showImage() {
  const weatherIcon = document.getElementById('weather-icon');
  weatherIcon.style.display = 'block'; // Show the weather icon
}

// Thought Section
document.getElementById("save-quote-btn").addEventListener("click", () => {
  const quoteInput = document.getElementById("quote-input");
  const quote = quoteInput.value.trim();
  if (quote === "") {
    alert("Enter a thought!");
    return;
  }
  // Remove the Save Thought button
  const saveQuoteBtn = document.getElementById("save-quote-btn");
  saveQuoteBtn.remove();
  // remove the input field
  quoteInput.remove();

  const quoteSection = document.getElementById("quote-section");
  const quoteDiv = document.createElement("div");
  quoteDiv.textContent = "Today's Thought: " + quote;
  quoteSection.appendChild(quoteDiv);
  quoteInput.value = ""; // Clear the input field
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#ffb6c1', '#ffc0cb', '#add8e6', '#fff0f5'],
  });
});



// Live Clock 
function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  document.getElementById('clock').textContent = timeString;
}                                 
setInterval(updateClock, 1000);
updateClock();

// To-Do List
  const addTaskBtn = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const li = document.createElement("li");
    li.classList.add("task-item");

    const span = document.createElement("span");
    span.textContent = taskText;

    const doneBtn = document.createElement("button");
    doneBtn.textContent = " ✓ ";
    doneBtn.classList.add("done-btn");
    doneBtn.onclick = () => {
  li.remove();

  // Confetti burst!
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#ffb6c1', '#ffc0cb', '#add8e6', '#fff0f5'],
  });
};


const editBtn = document.createElement("button");
editBtn.textContent = "✎";
editBtn.classList.add("edit-btn");
editBtn.onclick = () => {
  const newTask = prompt("Edit your task:", span.textContent);
  if (newTask !== null && newTask.trim() !== "") {
    span.textContent = newTask.trim();
  }
};

li.appendChild(editBtn);
li.appendChild(doneBtn);

const deleteBtn = document.createElement("button");
deleteBtn.textContent = "✖";
deleteBtn.classList.add("delete-btn");
deleteBtn.onclick = () => {
  li.remove();
};

li.appendChild(editBtn);
li.appendChild(doneBtn);
    li.appendChild(deleteBtn);


    li.appendChild(span);
    li.appendChild(doneBtn);
    taskList.appendChild(li);
    taskInput.value = "";
  });



document.getElementById("clear-tasks-btn").addEventListener("click", () => {
  taskList.innerHTML = ""; // Clear all tasks
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#ffb6c1', '#ffc0cb', '#add8e6', '#fff0f5'],
  });
});
  taskInput.value = ""; // Clear input field








