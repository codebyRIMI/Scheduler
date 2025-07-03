import { Link } from 'react-router-dom';
import './Leftbar.scss';

// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Leftbar = () => {
    return (
        <div className="left-bar">
            <div className="leftbar-wrapper">
            <div className="heading">
            <span>Dashboard</span>
            </div>
                <div className="create-meeting">
                <Link to="/createMeeting">
                    <div className="item-left">
                    <button>Create Meeting</button>
                    </div>
                    </Link>
                    <Link to="/update">
                    <div className="item-left">
                    <button>Meeting updates</button>
                    </div>
                    </Link>
                    <div className="item-left">
                    <button>more updates</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Leftbar;
