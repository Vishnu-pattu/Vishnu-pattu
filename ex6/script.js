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

    // Simple check to ensure username is not empty
    if (username) {
        document.getElementById("loginContainer").style.display = "none";
        document.getElementById("leaveContainer").style.display = "block";
        document.getElementById("userName").value = username; // Pre-fill name in leave form
    } else {
        alert("Please enter a username!");
    }
});

// Handle leave application submission
document.getElementById("leaveForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const userName = document.getElementById("userName").value;
    const leaveType = document.getElementById("leaveType").value;
    const startDate = new Date(document.getElementById("startDate").value);
    const endDate = new Date(document.getElementById("endDate").value);

    const requestedDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    const balances = JSON.parse(localStorage.getItem("leaveBalances"));

    if (requestedDays <= balances[leaveType]) {
        balances[leaveType] -= requestedDays;
        localStorage.setItem("leaveBalances", JSON.stringify(balances));
        alert(`Leave applied successfully for ${userName}!`);
    } else {
        alert(`Insufficient ${leaveType} balance.`);
    }

    document.getElementById("leaveForm").reset();
});

// Handle view balance button click
document.getElementById("viewBalance").addEventListener("click", function() {
    const balances = JSON.parse(localStorage.getItem("leaveBalances"));
    let displayText = "Leave Balances:\n";
    for (const [type, balance] of Object.entries(balances)) {
        displayText += `${type}: ${balance} days remaining\n`;
    }
    document.getElementById("balanceDisplay").innerText = displayText;
});
