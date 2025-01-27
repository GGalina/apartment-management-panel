import { useSelector } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import { selectLoading } from '../../redux/apartmentSelectors'; 

const Loader = () => {
    const loading = useSelector(selectLoading); 
    const color = "#3AA9D8"; 

    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "#3AA9D8", 
    };

    return (
        <div className="sweet-loading">
            <ClipLoader
                color={color}
                loading={loading}
                cssOverride={override}
                size={100}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
};

export default Loader;
