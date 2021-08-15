import axios from 'axios';

const deleteUser = (users, cb) => {
    axios({
        method: 'POST',
        url: 'http://localhost:3000/user/delete',
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true,
        data: users
    })
    .then((res) => {
        cb(res.data);
    })
    .catch((err) => {
        console.log(err);
    })
}

export default deleteUser;