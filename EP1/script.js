document.getElementById('homeBtn').addEventListener('click', function() {
    document.getElementById('content').innerHTML = `
        <div class="container home-bg">
            <h2><span class="star">★</span> My Details <span class="star">★</span></h2>
            <p><strong>Name:</strong> P. Vishnupriya</p>
            <p><strong>Email:</strong> vvv@gmail.com</p>
            <p><strong>Phone:</strong> +9012345678</p>
            <p><strong>Work Experience:</strong> Intern at DELL Company</p>
            <p><strong>College:</strong> ANNA University-BIT CAMPUS TRICHY</p>
        </div>
    `;
});

document.getElementById('aboutBtn').addEventListener('click', function() {
    document.getElementById('content').innerHTML = `
        <div class="container about-bg">
            <h2>About Me</h2>
            <p><strong>Hello!</strong> I’m P. Vishnupriya, a passionate UG student with a keen interest in full-stack development.</p>
            <p>I have experience in both front-end and back-end technologies.</p>
            <p>My favorite programming languages include Python and JavaScript.</p>
            <p>I enjoy working on challenging projects that push my boundaries.</p>
            <p>In my free time, I love exploring new technologies and learning.</p>
            <p>I'm committed to building efficient and responsive web applications.</p>
        </div>
    `;
});

document.getElementById('projectsBtn').addEventListener('click', function() {
    document.getElementById('content').innerHTML = `
        <div class="container projects-bg">
            <h2>My Projects</h2>
            <p>Here are some of the projects I have worked on:</p>
            <ul>
                <li>Project 1: Full Stack Web Application</li>
                <li>Project 2: Python Data Analysis Tool</li>
                <li>Project 3: UI/UX Design for a Mobile App</li>
                <li>Project 4: E-commerce Website</li>
                <li>Project 5: Blogging Platform</li>
                <li>Project 6: Real-time Chat Application</li>
            </ul>
        </div>
    `;
});
