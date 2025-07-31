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



// Live Clock
function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  document.getElementById('clock').textContent = timeString;
}                                 
setInterval(updateClock, 1000);
updateClock();

// To-Do List
const todoInput = document.getElementById('task-input');
const todoList = document.getElementById('task-list');
const addTaskBtn = document.getElementById('add-task-btn');
add-task-btn.addEventListener('click', function(event) {
  
  if (taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;
    todoList.appendChild(li);
    todoInput.value = ''; // Clear input field
  }
});










