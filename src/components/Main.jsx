import { useState, useEffect } from 'react';
import Table from "./Table";
import Button from "./Buttons";

export default function Main({ supabase }) {
    const [content, setContent] = useState("click");
    const [users, setUsers] = useState([]);
    const [isCheckedAll, setIsCheckedAll] = useState(false);

    useEffect(() => {
        getUsers();
    }, []);

    async function getUsers() {
        let { data, error } = await supabase.rpc('get_users');
        if (error) console.error(error);
        else {
            const user_data = data.map((user) => {
                const { id, last_sign_in_at, banned_until, email: eMail, raw_user_meta_data: { name } } = user;

                const lastLogin = new Date(last_sign_in_at).toLocaleString()
                const status = banned_until === null ? 'Active' : 'Blocked';
                const isChecked = false;

                return { id, lastLogin, eMail, status, name, isChecked }
            })

            setUsers(user_data);
        }

        console.log(data);
    }

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
