function createTaskRow(taskData) {
    const tr = document.createElement('tr');
    Object.values(taskData).forEach(value => {
        const td = document.createElement('td');
        td.textContent = value;
        tr.appendChild(td);
    });
    tbody.appendChild(tr);
}

// Exemple d'utilisation
tasks.forEach(task => createTaskRow(task));
