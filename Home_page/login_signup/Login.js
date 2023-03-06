import './style.css';
import { useEffect, useState } from "react";
const Signup = () => {

    const [SignUpdata, setdata] = useState({});
    const [accounts, setaccounts] = useState({})
    const [tr, settr] = useState(true);
    const [wait, setwait] = useState(true);
    const api = 'http://localhost:5000/Acc';



    useEffect(() => {
   
        fetch(api)
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
    }, [tr])






    const handlefetch = (e) => {
        const { value, name } = e.target;
        setdata({ ...SignUpdata, [name]: value })

    }
    

    
    
    
    function Submitdata(e) {
        e.preventDefault();
        let list = Array.from(accounts.map(e=>e.email))
        console.log(list);
        
        const pswd = document.getElementsByName('pswd')

        if (!wait) {
            document.getElementById('SignUp').style.cursor = 'wait';
            document.getElementById('SignUp').disabled = true;
        }


        if (pswd[1].value !== pswd[2].value) {
            alert('not the same password')
        }
        else {
            if (list.includes(SignUpdata.email)) {
                alert('this email already use')
            }
            else{
                fetch(api, {
                    method: 'POST',
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify(SignUpdata)
            }).then((res) => {
                if (!res.ok) {
                    throw Error(res.statusText ? res.statusText : 'not found')
                }
                res.json()
            })
                .then(() => {
                    setwait(true)
                    alert('account added sucssifly')
                    window.location.pathname = '/';
                })
                .catch((err) => {
                    console.log(err.msg);
                })
            }
                
        }
    }

    return (
        <div className="login">
            <input type="checkbox" id="chk" aria-hidden="true" />
            <form onSubmit={(e) => Submitdata(e)}>
                <label htmlFor="chk" aria-hidden="true">Sign up</label>
                <input type="text" name="fname" placeholder="First Name" required onChange={(e) => handlefetch(e)} />
                <input type="text" name="lname" placeholder="Last Name" required onChange={(e) => handlefetch(e)} />
                <input type="text" name="tel" placeholder="Number" required onChange={(e) => handlefetch(e)} />
                <input type="email" name="email" placeholder="Email" required onChange={(e) => handlefetch(e)} />
                <input type="text" name="CIN" placeholder="CIN" required onChange={(e) => handlefetch(e)} />
                <input type="text" name="domain" placeholder="Domain" required onChange={(e) => handlefetch(e)} />
                <input type="password" name="pswd" placeholder="Password" required onChange={(e) => handlefetch(e)} />
                <input type="password" name="pswd" placeholder="ConfirmPassword" required onChange={(e) => handlefetch(e)} />
                <button id='SignUp'><i></i>Sign up</button>
            </form>
        </div>
    )
}
export default Signup;