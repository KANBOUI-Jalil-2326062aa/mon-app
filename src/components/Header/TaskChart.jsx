import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function TaskChart({ tasks }) {
    // Définition des couleurs pour chaque état
    const COLORS = {
        "prévue": "#8884d8",
        "en cours": "#82ca9d",
        "urgente": "#ff6347",
        "accomplie": "#d3d3d3"
    };

    // Calcul du nombre de tâches par état
    const taskCounts = tasks.reduce((acc, task) => {
        acc[task.etat] = (acc[task.etat] || 0) + 1;
        return acc;
    }, {});

    // Transformation des données pour le camembert
    const data = Object.keys(taskCounts).map((etat) => ({
        name: etat,
        value: taskCounts[etat]
    }));

    return (
        <div>
            <h3>Répartition des tâches</h3>
            <PieChart width={300} height={300}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
}

export default TaskChart;
