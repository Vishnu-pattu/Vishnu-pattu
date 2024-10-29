// Initialize leave balances if not already set in localStorage
if (!localStorage.getItem("leaveBalances")) {
    const initialBalances = {
        "Casual": 10,
        "Medical": 5
    };
    localStorage.setItem("leaveBalances", JSON.stringify(initialBalances));
}

// Handle login submission
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;

    if (username) {
        document.getElementById("loginContainer").style.display = "none";
        document.getElementById("leaveContainer").style.display = "block";
        document.getElementById("userName").value = username; // Pre-fill name in leave form

        // Display welcome message
        const welcomeMessage = document.createElement("div");
        welcomeMessage.className = "welcome-message";
        welcomeMessage.innerHTML = `Welcome, ${username}! 😊<br>Have a good day!<br>Enjoy your holiday trip with your family! 🎉`;
        document.getElementById("leaveContainer").appendChild(welcomeMessage);

        // Display leave balances
        displayLeaveBalances();
    } else {
        alert("Please enter a username!");
    }
});

// Function to display leave balances
function displayLeaveBalances() {
    const balances = JSON.parse(localStorage.getItem("leaveBalances"));
    const leaveBalancesDisplay = document.getElementById("leaveBalances");
    leaveBalancesDisplay.innerHTML = `
        Available Leaves:<br>
        <span class="casual-leave">Casual: ${balances.Casual}</span><br>
        <span class="medical-leave">Medical: ${balances.Medical}</span>
    `;
}

// Handle leave application submission
document.getElementById("leaveForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const userName = document.getElementById("userName").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const dob = document.getElementById("dob").value;
    const leaveType = document.getElementById("leaveType").value;
    const startDate = new Date(document.getElementById("startDate").value);
    const endDate = new Date(document.getElementById("endDate").value);
    
    const requestedDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    const balances = JSON.parse(localStorage.getItem("leaveBalances"));

    // Check leave balance
    if (requestedDays <= balances[leaveType]) {
        balances[leaveType] -= requestedDays; // Deduct only if leave is confirmed
        localStorage.setItem("leaveBalances", JSON.stringify(balances));
        
        // Display specific messages based on leave type
        let message;
        if (leaveType === "Medical") {
            message = "Take it easy. Feel good! 😊";
        } else if (leaveType === "Casual") {
            message = "Have a good day! Enjoy! 😊";
        }

        // Show confirmation message with employee details
        const confirmationMessage = document.createElement("div");
        confirmationMessage.className = "confirmation-message";
        confirmationMessage.innerHTML = `
            <strong>Leave Confirmed for ${userName}! 🎉</strong><br>
            Phone Number: ${phoneNumber}<br>
            Date of Birth: ${dob}<br>
            Leave Type: ${leaveType}<br>
            Thank you! 😊😊
        `;
        
        // Clear previous messages and display the confirmation message
        const leaveContainer = document.getElementById("leaveContainer");
        leaveContainer.innerHTML = ""; // Clear previous content
        leaveContainer.appendChild(confirmationMessage); // Add confirmation message
        
        // Display updated leave balances
        displayLeaveBalances();

        // Reset the leave form
        document.getElementById("leaveForm").reset();
    } else {
        // Prompt to extend leave balance
        const extend = confirm(`Insufficient ${leaveType} balance. Would you like to extend your ${leaveType} leave by 5 days?`);
        if (extend) {
            balances[leaveType] += 5; // Extend leave balance by 5 days
            localStorage.setItem("leaveBalances", JSON.stringify(balances));
            alert(`Your ${leaveType} leave has been extended by 5 days. You now have ${balances[leaveType]} days available.`);
        } else {
            alert(`You currently have ${balances[leaveType]} days available for ${leaveType}.`);
        }
    }
});

// Handle view balance button click
document.getElementById("viewBalance").addEventListener("click", function() {
    displayLeaveBalances();
});
