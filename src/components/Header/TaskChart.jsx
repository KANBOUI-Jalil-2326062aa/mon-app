import { PieChart, Pie, Cell, Tooltip } from "recharts";

function TaskChart({ tasks }) {
    const taskCounts = tasks.reduce((acc, task) => {
        acc[task.etat] = (acc[task.etat] || 0) + 1;
        return acc;
    }, {});

    const data = Object.keys(taskCounts).map(etat => ({
        name: etat,
        value: taskCounts[etat]
    }));

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF0000"];

    return (
        <div className="task-chart">
            {data.length > 0 ? (
                <PieChart width={100} height={100}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={40}
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
                <p className="task-chart-empty">Aucune tâche</p>
            )}
        </div>
    );
}

export default TaskChart;
