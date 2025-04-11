const roles = [
    "Mobile Software Developer",
    "Embedded Systems Programmer",
    "Web Developer (Frontend)",
    "Photographer",
    "WordPress Developer"   
];

const dynamicText = document.querySelector('.dynamic-text');
let currentIndex = 0;

//Roles change animation on home page
function updateText() {
    dynamicText.classList.add('animate-down');
    
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % roles.length;
        dynamicText.textContent = roles[currentIndex];
        dynamicText.classList.remove('animate-down');
        dynamicText.classList.add('animate-up');
    }, 500);

    setTimeout(() => {
        dynamicText.classList.remove('animate-up');
    }, 1000);
}

// Set initial text
dynamicText.textContent = roles[0];

// Start animation loop
setInterval(updateText, 3000);

// Block to handle sticky navigation bar
window.addEventListener('scroll', function () {
    const navHeader = document.querySelector('.nav-header');
    const navBottom = navHeader.getBoundingClientRect().top;

    if (navBottom <= 0) {
        navHeader.classList.add('sticky');
    } else {
        navHeader.classList.remove('sticky');
    }
});

//Mobile menu toggle function
function toggleMenu() {
    const menuToggle = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-header ul');

    // Check if elements exist
    if (menuToggle && navMenu) {
        navMenu.classList.toggle("active"); // Toggle menu visibility
        menuToggle.classList.toggle("open"); // Toggle button animation
    } else {
        console.warn("Menu elements not found on this page.");
    }
}

//Event listener for mobile menu toggle hamburger
document.addEventListener("DOMContentLoaded", function () {
    const menuCheckbox = document.querySelector('.hamburger .checkbox');
    const navMenu = document.querySelector('.nav-header ul');

    if (menuCheckbox && navMenu) {
        // Ensure the checkbox is unchecked when navigating back
        if (menuCheckbox.checked) {
            menuCheckbox.checked = false;
        }
    }
});

//Expandable div toggle function on skills page
function toggleSkill(skillId) {
    const skillDiv = document.getElementById(skillId);
    const content = skillDiv.querySelector('.skill-content');
    const toggleText = skillDiv.querySelector('.toggle-text');
    const icon = skillDiv.querySelector('.toggle-icon');

    if (skillDiv.classList.contains('expanded')) {
        // Collapse the section
        skillDiv.classList.remove('expanded');
        toggleText.textContent = 'Show more';
    } else {
        // Expand the section
        skillDiv.classList.add('expanded');
        toggleText.textContent = 'Show less';
    }
}

// Function to handle button tap color effect on mobile screens
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        this.style.backgroundColor = "#ff5733"; // Temporary color change
        setTimeout(() => {
            this.style.backgroundColor = ""; // Reverts to original
        }, 200); // Reset after 200ms
    });
});

//Back to top button function 👇

// Show/Hide Back to Top Button on Scroll
document.addEventListener('scroll', () => {
    const button = document.getElementById('backToTop');
    if (window.scrollY > 450) {
        button.classList.add('show');
    } else {
        button.classList.remove('show');
    }
});

// Smooth Scroll to Top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Load the back-to-top button
fetch('/components/back-to-top.html')
.then(response => response.text())
.then(html => {
    document.getElementById('back-to-top-container').innerHTML = html;
});


// Touch event effect for mobile screens service card
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('touchstart', () => {
        card.classList.toggle('expanded');
    });
});



document.addEventListener('DOMContentLoaded', () => {
    // Select all carousel wrappers
    const wrappers = document.querySelectorAll('.carousel-wrapper');
  
    wrappers.forEach(wrapper => {
        const prevButton = wrapper.querySelector('.carousel-btn.left');
        const nextButton = wrapper.querySelector('.carousel-btn.right');
        const carousel = wrapper.querySelector('.project-carousel');
    
        // Check that the required elements exist
        if (!prevButton || !nextButton || !carousel) {
            console.error('Missing required carousel elements in wrapper:', wrapper);
            return;
        }
    
        // Function to update button visibility
        const updateButtonVisibility = () => {
            // Hide the left button if at the start
            if (carousel.scrollLeft === 0) {
            prevButton.style.display = 'none';
            } else {
            prevButton.style.display = 'block';
            }
            // Hide the right button if scrolled to the end
            if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 1) {
            nextButton.style.display = 'none';
            } else {
            nextButton.style.display = 'block';
            }
        };
    
        // Call initially
        updateButtonVisibility();
    
        // Add click events
        prevButton.addEventListener('click', () => {
            carousel.scrollBy({ left: -300, behavior: 'smooth' });
        });
    
        nextButton.addEventListener('click', () => {
            carousel.scrollBy({ left: 300, behavior: 'smooth' });
        });
    
        // Update buttons as user scrolls
        carousel.addEventListener('scroll', updateButtonVisibility);
    });
});


// Project codeview toggle function
function openCodeViewer(projectId) {
    // Example data (normally, you'd load dynamically or from JSON)
    const projects = {
        'ir-controlled-motor': {
            // Project code here
            code: `// Wiring
            /*
            // Arduino/Motor driver/Dc Motor:
            Connect GND from the arduino board to (negative pin) of the power supply on the bread board.
            Connect EN1(first pin) on the motor driver to a D(6) pin with analog function on the arduino board.
            Connect pins 2 and 7(IN1 and IN2) from driver to D(3,5) pins on the arduino board.
            Connect pins 3 and 6(OUT1 and OUT2) on the driver to the dc motor.(red terminal to pin3 and black to pin6).
            Connect pin4 on the driver to GND
            Connect pin8 from the motor driver chip to the positive voltage from power supply through the bread board.

            //IR Receiver Wiring:
            G terminal to GND
            R terminal to 5V
            Y terminal to digital(9) pin
            */

            #include <IRremote.hpp>

            #define IR_RECEIVE_PIN 9 // Pin for IR receiver
            #define MOTOR_PIN 6       // PWM Pin for motor control 
            #define MOTOR_IN1 3        // Direction pin 1
            #define MOTOR_IN2 5        // Direction pin 2 

            const unsigned long POWER_BUTTON_CODE = 0xBA45FF00; // Power button IR code
            const unsigned long SPEED_UP_BUTTON_CODE = 0xF609FF00; // Up button IR code
            const unsigned long SPEED_DOWN_BUTTON_CODE = 0xF807FF00; // Up button IR code

            bool motorState = false; // Motor OFF initially
            int motorSpeed = 150;    // Initial speed when turned ON

            void setup() {
                Serial.begin(19200);
                IrReceiver.begin(IR_RECEIVE_PIN, ENABLE_LED_FEEDBACK);

                pinMode(MOTOR_PIN, OUTPUT);
                pinMode(MOTOR_IN1, OUTPUT);
                pinMode(MOTOR_IN2, OUTPUT);
                
                stopMotor(); // Start with motor OFF
            }

            void loop() {

                if (IrReceiver.decode()) {
                unsigned long irCode = IrReceiver.decodedIRData.decodedRawData; // Store received IR code
                
                if (irCode == POWER_BUTTON_CODE) {
                        motorState = !motorState; // Toggle motor state 
                        
                        if (motorState) {
                        motorSpeed = 150;
                            startMotor();
                            Serial.println("Motor ON");
                        } else {
                            stopMotor();
                            Serial.println("Motor OFF");
                        }
                    }

                    if (motorState && irCode == SPEED_UP_BUTTON_CODE) {
                        increaseSpeed();
                    }

                    if (motorState && irCode == SPEED_DOWN_BUTTON_CODE) {
                        decreaseSpeed();
                    }

                IrReceiver.resume();
                }
            }

            // Function to start the motor
            void startMotor() {
                digitalWrite(MOTOR_IN1, LOW);
                digitalWrite(MOTOR_IN2, HIGH);
                analogWrite(MOTOR_PIN, 150); // Adjust speed (0-255)
            }

            // Function to stop the motor
            void stopMotor() {
                digitalWrite(MOTOR_IN1, LOW);
                digitalWrite(MOTOR_IN2, LOW);
                analogWrite(MOTOR_PIN, 0); // Ensure no power is sent
            }

            // Function to gradually increase speed
            void increaseSpeed() {
                if (motorSpeed < 255) {
                    motorSpeed += 50; // Increase speed in steps
                    if (motorSpeed > 255) {
                        motorSpeed = 255; // Max speed limit
                    }
                    analogWrite(MOTOR_PIN, motorSpeed);
                    Serial.print("Speed Increased: ");
                    Serial.println(motorSpeed);
                } else {
                    Serial.println("Motor is already at max speed!");
                }
            }

            // Function to gradually decrease speed
            void decreaseSpeed() {
                if (motorSpeed > 150) {
                    motorSpeed -= 50; // Decrease speed in steps
                    if (motorSpeed < 150) {
                        motorSpeed = 150; // Min speed limit
                    }
                    analogWrite(MOTOR_PIN, motorSpeed);
                    Serial.print("Speed Decrease: ");
                    Serial.println(motorSpeed);
                } else {
                    Serial.println("Motor is already at min speed!");
                }
            }`,
            // Project images here
            images: [
            '/images/arduino/ard0.jpeg',
            '/images/arduino/ard1.jpeg',
            '/images/arduino/ard2.jpeg',
            '/images/arduino/ard3.jpeg'
            ],
            // Project video here
            video: '/videos/doorbell-demo.mp4'
        }
    };
  
    const project = projects[projectId];
    if (!project) return;
  
    const codeBlock = document.getElementById("project-code");
    codeBlock.textContent = project.code;
    hljs.highlightElement(codeBlock);

  
    const imageContainer = document.getElementById("project-images");
    imageContainer.innerHTML = '';
    project.images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.className = 'project-image';
        imageContainer.appendChild(img);
    });
  
    const video = document.getElementById("project-video");
    video.src = project.video;
  
    document.getElementById("project-modal").style.display = 'block';
}
  
function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-btn');
  
    tabs.forEach(tab => tab.classList.remove('active'));
    buttons.forEach(btn => btn.classList.remove('active'));
  
    document.getElementById(`tab-content-${tabId}`).classList.add('active');
    event.target.classList.add('active');
}
  
function closeProjectModal() {
    document.getElementById("project-modal").style.display = "none";
}
  
// Copy to clipboard function
function copyCode() {
    const codeText = document.getElementById("project-code").innerText;
    navigator.clipboard.writeText(codeText).then(() => {
      alert("Code copied to clipboard!");
    }, () => {
      alert("Failed to copy code.");
    });
}

// Function to handle video card click events
function showVideoModal(cardElement) {
    const videoId = cardElement.getAttribute("data-video-id");
    const videoUrl = `https://drive.google.com/file/d/${videoId}/preview`;
    const iframe = document.getElementById("video-frame");
    iframe.src = videoUrl;
    document.getElementById("video-modal").style.display = "flex";
}

function closeVideoModal() {
    const modal = document.getElementById("video-modal");
    const iframe = document.getElementById("video-frame");
    iframe.src = "";
    modal.style.display = "none";
}

  
  
  
  
  
  





