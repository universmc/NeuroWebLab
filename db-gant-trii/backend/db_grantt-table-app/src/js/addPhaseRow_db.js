    function createRow(data, isPhase) {
        const tr = document.createElement('tr');
        if (isPhase) {
            const th = document.createElement('th');
            th.colSpan = headers.length; // Assurez-vous que cela correspond au nombre de colonnes
            th.textContent = data.phase;
            tr.appendChild(th);
        } else {
            headers.forEach(header => {
                const td = document.createElement('td');
                td.textContent = data[header];
                tr.appendChild(td);
            });
        }
        tbody.appendChild(tr);
    }

    function populateTable(phases) {
        phases.forEach(phase => {
            createRow(phase, true); // Crée une ligne pour la phase
            phase.taches.forEach(tache => {
                createRow(tache, false); // Crée des lignes pour chaque tâche
            });
        });
    }
