const roles = [
    "Mobile Software Developer",
    "Embedded Systems Programmer",
    "Web Developer",
    "Photographer",
    "WordPress Developer",
    "Database Developer"   
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


document.addEventListener('DOMContentLoaded', () => {
    console.log("Dropdown logic loaded ✅");
    // ========== DROPDOWN MENU (Explore) ==========
    const dropButtons = document.querySelectorAll('.drop-btn');

    dropButtons.forEach(button => {
        const menu = button.nextElementSibling;

        // Always hide at first
        menu.style.display = 'none';

        button.addEventListener('click', (e) => {
            e.stopPropagation();

            // Hide all others
            document.querySelectorAll('.drop-menu').forEach(m => {
                if (m !== menu) m.style.display = 'none';
            });

            // Toggle this one
            menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
        });
    });

    // Close dropdown if clicked outside
    document.addEventListener('click', () => {
        document.querySelectorAll('.drop-menu').forEach(menu => {
            menu.style.display = 'none';
        });
    });

    // ========== MOBILE MENU TOGGLE ==========
    // const menuCheckbox = document.querySelector('.hamburger .checkbox');
    // const navMenu = document.querySelector('.nav-header ul');

    // if (menuCheckbox && navMenu) {
    //     menuCheckbox.addEventListener('change', () => {
    //         navMenu.classList.toggle('active');
    //     });
    // }
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
            code: `
            // Wiring
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
        },

        'auto-mood-light': {
            // Project code here
            code: `
            // AutoColorMoodLight.ino
            // Smoothly cycles through colors using HSV model and RGB LED

            int redPin = 11;
            int greenPin = 10;
            int bluePin = 9;

            float hue = 0.0;  // Current hue value (0 to 360)

            void setup() {
                pinMode(redPin, OUTPUT);
                pinMode(greenPin, OUTPUT);
                pinMode(bluePin, OUTPUT);
            }

            void loop() {
                // Convert hue (HSV) to RGB and display it
                byte r, g, b;
                hsvToRgb(hue, 1.0, 1.0, &r, &g, &b);

                analogWrite(redPin, r);
                analogWrite(greenPin, g);
                analogWrite(bluePin, b);

                hue += 1;                 // Gradually change hue
                if (hue > 360) hue = 0;   // Wrap around the color wheel

                delay(10);  // Smooth fading delay
            }

            // Converts HSV color values to RGB
            void hsvToRgb(float h, float s, float v, byte* r, byte* g, byte* b) {
                float c = v * s;
                float x = c * (1 - abs(fmod(h / 60.0, 2) - 1));
                float m = v - c;
                float r1, g1, b1;

                if (h < 60)       { r1 = c; g1 = x; b1 = 0; }
                else if (h < 120) { r1 = x; g1 = c; b1 = 0; }
                else if (h < 180) { r1 = 0; g1 = c; b1 = x; }
                else if (h < 240) { r1 = 0; g1 = x; b1 = c; }
                else if (h < 300) { r1 = x; g1 = 0; b1 = c; }
                else              { r1 = c; g1 = 0; b1 = x; }

                *r = (r1 + m) * 255;
                *g = (g1 + m) * 255;
                *b = (b1 + m) * 255;
            }`,
            // Project images here
            images: [
                '/images/arduino/image-path-here',
                '/images/arduino/image-path-here',
                '/images/arduino/image-path-here',
                '/images/arduino/image-path-here'
            ],
            // Project video here
            video: '/videos/doorbell-demo.mp4'
        },

        'manually-controlled-mood-light': {
            // Project code here
            code: `
            // Pin connected to the potentiometer
            int aPin = A0;

            int potVal; // For reading analog values from the potentiometer

            // Pins connected to the RGB LED
            int redPin = 11;
            int greenPin = 10;
            int bluePin = 9;

            void setup() {
                Serial.begin(9600); // Optinal: Start serial communication for debugging

                // Set RGB LED pins as outputs
                pinMode(redPin, OUTPUT);
                pinMode(greenPin, OUTPUT);
                pinMode(bluePin, OUTPUT);
            }

            void loop() {
                // Read analog value from the potentiometer (range: 0 to 1023)
                potVal = analogRead(aPin);

                // Map the potentiometer value to a hue value (range: 0 to 360 degrees)
                int hue = map(potVal, 0, 1023, 0, 360);

                // Variables to store RGB color values
                byte r, g, b;

                // Convert hue, saturation, and value (brightness) to RGB
                // Using full saturation (1.0) and full brightness (1.0)
                hsvToRgb(hue, 1.0, 1.0, &r, &g, &b);

                // Set the PWM output to the RGB LED with the calculated RGB values
                analogWrite(redPin, r);
                analogWrite(greenPin, g);
                analogWrite(bluePin, b);

                // Short delay for smooth color transitions
                delay(10);
            }

            // Function to convert HSV color to RGB color
            // h: Hue (0–360 degrees), s: Saturation (0–1), v: Value/Brightness (0–1)
            // Outputs: r, g, b (0–255)
            void hsvToRgb(float h, float s, float v, byte* r, byte* g, byte* b) {
                float c = v * s; // Chroma: the difference between the max and min RGB values
                float x = c * (1 - abs(fmod(h / 60.0, 2) - 1)); // Intermediate value
                float m = v - c; // To add back after chroma shift
                float r1, g1, b1;

                // Determine the RGB values based on the hue range
                if (h < 60) {
                    r1 = c; g1 = x; b1 = 0;
                } else if (h < 120) {
                    r1 = x; g1 = c; b1 = 0;
                } else if (h < 180) {
                    r1 = 0; g1 = c; b1 = x;
                } else if (h < 240) {
                    r1 = 0; g1 = x; b1 = c;
                } else if (h < 300) {
                    r1 = x; g1 = 0; b1 = c;
                } else {
                    r1 = c; g1 = 0; b1 = x;
                }

                // Convert final values to 0–255 scale and assign them
                *r = (r1 + m) * 255;
                *g = (g1 + m) * 255;
                *b = (b1 + m) * 255;
            }`,
            // Project images here
            images: [
                '/images/arduino/image-path-here',
                '/images/arduino/image-path-here',
                '/images/arduino/image-path-here',
                '/images/arduino/image-path-here'
            ],
            // Project video here
            video: '/videos/doorbell-demo.mp4'
        },

        'distance-meter': {
            // Project code here
            code: `
            // Wiring
            /*
            * connect poentiometer to bread board / A resistor with reasonable resistance (2.1kΩ - 4kΩ)
            * connect VSS(first pin) on the LCD to GND on Arduino
            * connect VDD to 5V
            * connect V0 to read pin(single pin) on the potentiometer
            * connect pins RS, E and (D4 to D7) to a digital pins on the Arduino
            * connect RW to GND on the Arduino
            * connect A(second to last LCD pin) to 5V
            * connect K(last LCD pin) to GND
            */

            // ----- LIBRARY FOR LCD -----
            #include <LiquidCrystal.h>

            // ----- LCD PIN CONFIGURATION -----
            int rs = 2, en = 3, d4 = 4, d5 = 5, d6 = 6, d7 = 7;

            // ----- INITIALIZE LCD OBJECT -----
            LiquidCrystal LCD(rs, en, d4, d5, d6, d7);

            // ----- HC-SR04 PINS -----
            const int trigPin = 12;
            const int echoPin = 11;

            // ----- Buzzer pin -----
            int buzPin = 9; 
            unsigned long previousBuzzerMillis = 0;
            const long buzzerInterval = 200; // Total period (ON + OFF)
            bool buzzerState = false;
            unsigned long lastBeepTime = 0;
            unsigned long beepInterval = 1000;  // Default 1 second
            bool buzzerOn = false;

            long pingTravelTime;
            float distance_m = 0;
            float distance_cm = 0;
            float prev_distance_cm = 0;
            float smoothed_distance_cm = 0;

            // ----- TIMING SETTINGS-----
            int dms = 10;      // Microseconds for trigger pulse
            int dt = 100;      // Delay between loop cycles
            int dt1 = 1000;    // Initial splash delay

            // ----- SMOOTHING SETTINGS -----
            const int numReadings = 5;
            float readings[numReadings]; // Circular buffer
            int readIndex = 0;
            float total = 0;

            void setup() {
                Serial.begin(19200);      // Start serial monitor
                LCD.begin(16, 2);         // LCD dimensions: 16 columns, 2 rows

                pinMode(trigPin, OUTPUT);
                pinMode(echoPin, INPUT);
                pinMode(buzPin, OUTPUT);

                // Show startup message
                LCD.setCursor(0, 0);
                LCD.print(" DISTANCE METER! ");
                delay(dt1);
                LCD.clear();

                // Initialize smoothing array
                for (int i = 0; i < numReadings; i++) {
                    readings[i] = 0;
                }
            }

            void loop() {
                // ----- Trigger the Ultrasonic Pulse -----
                digitalWrite(trigPin, LOW);
                delayMicroseconds(dms);
                digitalWrite(trigPin, HIGH);
                delayMicroseconds(dms);
                digitalWrite(trigPin, LOW);

                // ----- Read Pulse Duration in Microseconds -----
                pingTravelTime = pulseIn(echoPin, HIGH);
                delay(dt);

                // ----- Calculate distance in meters centimeters -----
                distance_m = pingTravelTime *0.0001715;
                distance_cm = pingTravelTime * 0.034 / 2;   // Speed of sound = 0.034 cm/μs

                // ----- Moving Average Filter -----
                total -= readings[readIndex];
                readings[readIndex] = distance_cm;
                total += readings[readIndex];
                readIndex = (readIndex + 1) % numReadings;
                smoothed_distance_cm = total / numReadings;
                distance_m = smoothed_distance_cm / 100;

                // --- Buzzer beep logic ---
                if (distance_m < 0.5) {
                    // Calculate beep speed: closer = faster
                    // At 0.1m: beep every 100ms | At 0.5m: beep every 1000ms
                    beepInterval = map(distance_m * 100, 10, 150, 100, 1000);
                    beepInterval = constrain(beepInterval, 100, 1000);

                    if (millis() - lastBeepTime >= beepInterval) {
                    buzzerOn = !buzzerOn;
                    digitalWrite(buzPin, buzzerOn ? HIGH : LOW);
                    lastBeepTime = millis();
                    }
                } 
                else {
                    digitalWrite(buzPin, LOW); // Too far = silent
                    buzzerOn = false;
                }


                // Only update display if distance changed by 1 cm or more
                if (abs(smoothed_distance_cm - prev_distance_cm) >= 1.0) {
                    LCD.setCursor(0, 0);
                    LCD.print("Distance:       "); // Clear leftover chars

                    LCD.setCursor(0, 1);
                    LCD.print(distance_m, 2);
                    LCD.print("m / ");
                    LCD.print(smoothed_distance_cm, 1);
                    LCD.print("cm  ");

                    prev_distance_cm = smoothed_distance_cm;

                    // Serial debug
                    Serial.print("Distance: ");
                    Serial.print(distance_m, 1);
                    Serial.print("m / ");
                    Serial.print(smoothed_distance_cm, 1);
                    Serial.println("cm");
                }
            }
            }`,
            // Project images here
            images: [
                '/images/arduino/udm1.jpg',
                '/images/arduino/udm2.jpg',
                '/images/arduino/udm3.jpg',
                '/images/arduino/udm4.jpg',
                '/images/arduino/udm5.jpg'
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

  
  
  
  
  
  





