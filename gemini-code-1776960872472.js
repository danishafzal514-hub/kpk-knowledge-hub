class CurriculumEngine {
    constructor(data) {
        this.data = data;
        this.currentSubject = "All";
        this.render(this.data);
    }

    filter(subject) {
        this.currentSubject = subject;
        document.querySelectorAll('.pill').forEach(p => {
            p.classList.toggle('active', p.innerText.includes(subject));
        });
        this.handleSearch(document.getElementById('mainSearch').value);
    }

    handleSearch(query) {
        const q = query.toLowerCase();
        const filtered = this.data.filter(item => {
            const matchesSearch = item.topic.toLowerCase().includes(q) || 
                                 item.detail.toLowerCase().includes(q) ||
                                 item.subject.toLowerCase().includes(q);
            const matchesFilter = (this.currentSubject === "All" || item.subject === this.currentSubject);
            return matchesSearch && matchesFilter;
        });
        this.render(filtered);
    }

    render(results) {
        const area = document.getElementById('resultsArea');
        area.innerHTML = results.length > 0 ? results.map(item => `
            <div class="card">
                <span class="tag">${item.subject} • Class ${item.class} • Chapter ${item.chapter}</span>
                <h3>${item.topic}</h3>
                <p>${item.detail}</p>
            </div>
        `).join('') : `<p style="text-align:center; width:100%">No topics found for your search.</p>`;
    }
}

// THE DATABASE - Ready for your presentation!
const database = [
    { class: "9", subject: "Math", chapter: "1", topic: "Matrices", detail: "A rectangular array of numbers. Used in complex calculations and computer science." },
    { class: "9", subject: "Physics", chapter: "2", topic: "Kinematics", detail: "Study of motion without considering the mass or the force that causes it." },
    { class: "9", subject: "Physics", chapter: "3", topic: "Dynamics & Newton's Laws", detail: "Laws explaining the relationship between a body and the forces acting upon it." },
    { class: "10", subject: "Biology", chapter: "1", topic: "Gaseous Exchange", detail: "The process of oxygen intake and carbon dioxide release in living organisms." },
    { class: "10", subject: "Chemistry", chapter: "1", topic: "Chemical Equilibrium", detail: "The state in which both reactants and products are present in concentrations which have no further tendency to change." },
    { class: "9", subject: "Math", chapter: "2", topic: "Logarithms", detail: "The inverse function to exponentiation. Essential for scientific calculations." },
    { class: "10", subject: "Physics", chapter: "5", topic: "Electromagnetism", detail: "The study of the electromagnetic force, a type of physical interaction that occurs between electrically charged particles." }
];

// Start the search engine
const engine = new CurriculumEngine(database);