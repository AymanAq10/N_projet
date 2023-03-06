import './style.css';
import Signup from './SignUp';
import Login from './Login';
const LoginsignUp = () => {
	return (

		<div className="main">

			<input type="checkbox" id="chk" aria-hidden="true" />

			<Signup/>
			<Login/>

		</div>
	);
}
export default LoginsignUp;
