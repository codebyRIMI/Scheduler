import './Navbar.scss';
import HomeIcon from '@mui/icons-material/Home';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../helpers/AuthContext';
import { useContext } from 'react';

const Navbar = () => {

    const { logout, authState } = useContext(AuthContext);

    return(
        <div className="nav-bar">
            {/* <div className="navbar-content"> */}
            <Link to='/'>
                <div className="left-nav">
                    <span className="logo">Scheduler</span>
                    <HomeIcon className="icon" />
                </div>
                </Link>
                <div className="right-nav">
                    <PersonOutlinedIcon className="icon" />
                    <div className="user_details">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvSIEoyvHCBxMuybxadQYCj_J3vFKcoR_9ew&s" 
                        alt="not found" />
                        <span>{authState.username}</span>
                        <button onClick={logout}>Log out</button>
                    </div>
                </div>
            {/* </div> */}
        </div>
    )
}

export default Navbar;
