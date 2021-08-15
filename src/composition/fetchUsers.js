import axios from 'axios';

const fetchUsers = (cb) => {
    axios.get('http://localhost:3000/user/list', {
        withCredentials: true
    })
    .then((res) => {
        cb(res.data);
    })
    .catch((err) => {
        console.log(err);
    })
}

export default fetchUsers;