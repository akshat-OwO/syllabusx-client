import { CircularProgress } from "@mui/material";


const LoadData = () => {
    return (
        <div className="load-data">
            <CircularProgress sx={{color: '#49C5B6'}} />
        </div>
    );
}
 
export default LoadData;