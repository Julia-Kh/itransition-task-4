import { useState } from "react";

function TableRow({
    name,
    eMail,
    lastLogin,
    status,
    isChecked,
    id,
    handleOnChange,
}) {
    return (
        <tr>
            <td>
                <input
                    id={id}
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleOnChange}
                />
            </td>
            <td>{name}</td>
            <td>{eMail}</td>
            <td>{lastLogin}</td>
            <td>{status}</td>
        </tr>
    );
}

export default function Table({
    users,
    handleOnChange,
    isCheckedAll,
    handleOnChangeAll,
}) {
    return (
        <table>
            <thead>
                <tr>
                    <th>
                        <input
                            id={"checkbox_all"}
                            type="checkbox"
                            checked={isCheckedAll}
                            onChange={handleOnChangeAll}
                        />
                    </th>
                    <th>
                        Name
                    </th>
                    <th>e-mail</th>
                    <th>Last login</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <TableRow
                        key={user.id}
                        {...user}
                        handleOnChange={handleOnChange}
                    />
                ))}
            </tbody>
        </table>
    );
}
