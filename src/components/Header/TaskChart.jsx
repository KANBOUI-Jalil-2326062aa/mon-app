import { PieChart, Pie, Cell, Tooltip } from "recharts";

function TaskChart({ tasks }) {
    // Compter le nombre de tâches par état
    const taskCounts = tasks.reduce((acc, task) => {
        acc[task.etat] = (acc[task.etat] || 0) + 1;
        return acc;
    }, {});

    // Transformer en un format utilisable par `recharts`
    const data = Object.keys(taskCounts).map(etat => ({
        name: etat,
        value: taskCounts[etat]
    }));

    // Couleurs pour chaque état de tâche
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF0000"];

    return (
        <div className="task-chart">
            <h3 className="task-chart-title">Répartition des tâches par état</h3>

            {data.length > 0 ? (
                <PieChart width={300} height={300} className="task-chart-pie">
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
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            ) : (
                <p className="task-chart-empty">Aucune tâche à afficher</p>
            )}
        </div>
    );
}

export default TaskChart;
