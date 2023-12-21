import { useState } from "react";
import "./App.css";
import Table from "./components/Table";
import Button from "./components/Buttons";
import { users as init } from "./data.js";

export default function App() {
    const [content, setContent] = useState("click");
    const [users, setUsers] = useState(init);
    const [isCheckedAll, setIsCheckedAll] = useState(false);

    function handleClick(type) {
        setContent(type);
        const checkedUsers = [];
        for (let user of users) {
            if (user.isChecked) {
                checkedUsers.push(user.id);
            }
        }
        console.log("button clicked", type, checkedUsers);
    }

    function handleOnChange(event) {
        console.log("handle change", event.target.id);
        const newUsers = [...users];
        for (let newUser of newUsers) {
            if (event.target.id === newUser.id) {
                newUser.isChecked = !newUser.isChecked;
            }
        }
        setUsers(newUsers);
    }

    const handleOnChangeAll = () => {
        // Галочка в углу таблиицы поменялась
        setIsCheckedAll(!isCheckedAll);

        if (isCheckedAll) {
            for (let user of users) {
                if (user.isChecked) {
                    user.isChecked = !user.isChecked;
                }
            }
        } else {
            for (let user of users) {
                if (!user.isChecked) {
                    user.isChecked = !user.isChecked;
                }
            }
        }
        const newUsers = [...users];
        setUsers(newUsers);
    };

    return (
        <>
            <Button onClick={() => handleClick("block")}>Block</Button>
            <Button onClick={() => handleClick("unblock")}>Unblock</Button>
            <Button onClick={() => handleClick("delete")}>Delete</Button>
            <Table
                users={users}
                handleOnChange={handleOnChange}
                isCheckedAll={isCheckedAll}
                handleOnChangeAll={handleOnChangeAll}
            />
            <p>{content}</p>
        </>
    );
}
