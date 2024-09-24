document.getElementById('add-project').addEventListener('click', function() {
    const projectInput = document.getElementById('project-input');
    const projectTitle = projectInput.value.trim();
    if (projectTitle) {
        const projectList = document.getElementById('project-list');
        const projectItem = document.createElement('div');
        projectItem.textContent = projectTitle;
        projectList.appendChild(projectItem);
        projectInput.value = ''; // Clear input
    }
});

document.getElementById('add-skill').addEventListener('click', function() {
    const skillInput = document.getElementById('skill-input');
    const skillTitle = skillInput.value.trim();
    if (skillTitle) {
        const skillList = document.getElementById('skill-list');
        const skillItem = document.createElement('div');
        skillItem.textContent = skillTitle;
        skillList.appendChild(skillItem);
        skillInput.value = ''; // Clear input
    }
});
