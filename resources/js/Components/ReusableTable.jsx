function ReusableTable({columns, data, onEdit, onDelete}) {
    return (
        <div className="table-container">
            <table className="table">
                <thead className="border-solid border-b-4">
                    <tr>
                        {columns.map((col, index) => (
                            <th className="p-2" key={index}>{col}</th>
                        ))}
                        {(onEdit || onDelete) && <th>Acciones</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((col, colIndex) => (
                                <td key={colIndex}>{row[col]}</td>
                            ))}
                            {(onEdit || onDelete) && (
                                <td>
                                    {onEdit && <button onClick={() => onEdit(row)}>Editar</button>}
                                    {onDelete && <button onClick={() => onDelete(row)}>Eliminar</button>}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ReusableTable;
