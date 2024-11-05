// Initialize leave balances if not already set in localStorage
if (!localStorage.getItem("leaveBalances")) {
    const initialBalances = {
        "Casual": 10,
        "Medical": 5
    };
    localStorage.setItem("leaveBalances", JSON.stringify(initialBalances));
}

// Handle login form submission
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value.trim();

    if (username) {
        // Store username and transition to employee details page
        localStorage.setItem("username", username);
        document.getElementById("loginContainer").style.display = "none";
        document.getElementById("employeeDetailsContainer").style.display = "block"; // Show employee details form
    } else {
        alert("Please enter your name!");
    }
});

// Handle employee details form submission
document.getElementById("employeeDetailsForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const empName = document.getElementById("empName").value.trim();
    const dob = document.getElementById("dob").value;
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
    const branch = document.getElementById("branch").value;

    if (empName && dob && phoneNumber && branch) {
        // Calculate age
        const age = calculateAge(dob);

        // Store employee details in localStorage
        const employeeDetails = { empName, dob, age, phoneNumber, branch };
        localStorage.setItem("employeeDetails", JSON.stringify(employeeDetails));

        // Hide employee details form and show leave application form
        document.getElementById("employeeDetailsContainer").style.display = "none";
        document.getElementById("leaveContainer").style.display = "block";

        // Display employee details on leave application page
        displayEmployeeDetails(employeeDetails);
        displayLeaveBalances();
    } else {
        alert("Please fill in all the details.");
    }
});

// Calculate age based on date of birth
function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// Display employee details on the leave application page
function displayEmployeeDetails(employeeDetails) {
    const employeeDetailsDiv = document.getElementById("employeeDetails");
    employeeDetailsDiv.innerHTML = `
        <p>Welcome, ${employeeDetails.empName}!</p>
        <p>Employee ID: ${Math.floor(Math.random() * 5000) + 1}</p>
        <p>Branch: ${employeeDetails.branch}</p>
        <p>Date of Birth: ${employeeDetails.dob}</p>
        <p>Age: ${employeeDetails.age}</p>
        <p>Phone Number: <span class="flag">🇮🇳</span>${employeeDetails.phoneNumber}</p>
    `;
}

// Display leave balances with color coding
function displayLeaveBalances() {
    const leaveBalances = JSON.parse(localStorage.getItem("leaveBalances"));

    const leaveBalancesDiv = document.getElementById("leaveBalances");
    leaveBalancesDiv.innerHTML = `
        <div class="leave-balance casual">Casual Leave: ${leaveBalances.Casual} days</div>
        <div class="leave-balance medical">Medical Leave: ${leaveBalances.Medical} days</div>
    `;
}

// Handle leave application form submission
document.getElementById("leaveForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const leaveType = document.getElementById("leaveType").value;
    const leaveBalances = JSON.parse(localStorage.getItem("leaveBalances"));

    // Display the updated leave pie chart before the last page
    displayLeavePieChart(leaveBalances);

    // Request leave confirmation
    document.getElementById("leaveContainer").innerHTML += `
        <p>Your ${leaveType} leave has been requested.</p>
        <button onclick="confirmLeave('${leaveType}')">Confirm</button>
    `;
});

// Display pie chart for leave balances
function displayLeavePieChart(leaveBalances) {
    const ctx = document.getElementById("pieChart").getContext("2d");

    // Data to be shown in the pie chart: Available leave days for each leave type
    const data = {
        labels: ["Casual Leave", "Medical Leave"],
        datasets: [{
            data: [leaveBalances.Casual, leaveBalances.Medical],
            backgroundColor: [
                "#28a745",  // Green for Casual
                "#ffcc00"   // Yellow for Medical (Different color from the previous one)
            ],  
            borderColor: ["#ffffff", "#ffffff"],
            borderWidth: 1
        }]
    };

    // Create or update the pie chart
    const pieChart = new Chart(ctx, {
        type: "pie",
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                    labels: {
                        font: {
                            size: 14 // Font size for legend labels
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        // Show the leave type and available days in the tooltip
                        label: function(tooltipItem) {
                            const leaveType = tooltipItem.label;
                            const availableDays = tooltipItem.raw;
                            return `${leaveType}: ${availableDays} days available`;
                        }
                    }
                }
            }
        }
    });

    // Display the pie chart
    document.getElementById("leavePieChart").style.display = "block";  // Show pie chart
}

// Confirm the leave request and show confirmation details
function confirmLeave(leaveType) {
    const employeeDetails = JSON.parse(localStorage.getItem("employeeDetails"));
    const leaveBalances = JSON.parse(localStorage.getItem("leaveBalances"));

    // Deduct leave balance
    leaveBalances[leaveType]--;
    localStorage.setItem("leaveBalances", JSON.stringify(leaveBalances));

    // Show confirmation details
    const confirmationDetails = document.getElementById("confirmationDetails");
    confirmationDetails.innerHTML = `
        <p>Name: ${employeeDetails.empName}</p>
        <p>Employee ID: ${Math.floor(Math.random() * 5000) + 1}</p>
        <p>Phone Number: ${employeeDetails.phoneNumber}</p>
        <p>Leave Type: ${leaveType}</p>
        <p>Thank you for applying for leave!</p>
    `;

    document.getElementById("leaveContainer").style.display = "none";
    document.getElementById("confirmationContainer").style.display = "block";
}

// Thank you message and reset the application
function thankYouMessage() {
    alert("Thank you for using the Leave Management System!");
    location.reload(); // Reload the page to start over
}
