import './style.css';
import { Link, unstable_HistoryRouter as useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from '../Home';
const Login = () => {
    const [accounts, setaccounts] = useState({})
    const [tr, settr] = useState(true)
    const [userName, setUsername] = useState('')
    const [password, setpassword] = useState('')
    const [user, setuser] = useState(false)
    let d = false

    useEffect(() => {
        fetch('http://localhost:5000/Acc')
        .then((res) => {
                if (!res.ok) {
                    throw Error(res.statusText ? res.statusText : 'ERROR')
                }
                return res.json()
            })
            .then((data) => {
                setaccounts(data);
                settr(false);
            })
    }, [tr, userName, password])
    const handleSubmmit = (e) => {
        localStorage.removeItem("token");
        e.preventDefault();
        if (!tr) {
            for (let i = 0; i < accounts.length; i++) {
                const acc = accounts[i];
                if (acc.email === userName && acc.pswd === password) {
                    console.log(i+1,acc.id);
                        d =true;
                    alert('welcome');
                    let data = JSON.stringify({acc:acc.email,pswd:acc.pswd})
                    localStorage.setItem("token",data)
                    window.location.pathname='/'
                    // console.log(acc.fname, acc.lname, acc.email);
                }
                else{
                    if(acc.email !== userName && acc.pswd !== password && i+1 === accounts.length && d == false){
                        alert('not found');
                        // alert('acc not');
                    }
                }
                // if (acc.fname.concat(' '+ acc.lname) !== userName && acc.pswd !== password){
                //      alert('account not found')
                // }
            }
            setuser(d)
        }
        setUsername('')
        setpassword('')
    }

    return (
        <div className="signup">
            <input type="checkbox" id="chk" aria-hidden="true" />
            <form onSubmit={(e) => handleSubmmit(e)}>
                <label htmlFor="chk" aria-hidden="true">Login</label>
                <input style={{ margin: ' 16px auto', padding: '20px' }} type="text" name="email" value={userName} onChange={(e) => setUsername(e.target.value)} placeholder="Email" required />
                <input style={{ margin: ' 16px auto', padding: '20px' }} type="password" name="pswd" value={password} onChange={(e) => setpassword(e.target.value)} placeholder="Password" required />
                <button><i></i>Login</button> {user ? <Link to='/'/>:console.log(user)}
            </form>
        </div>
    )
}
export default Login;