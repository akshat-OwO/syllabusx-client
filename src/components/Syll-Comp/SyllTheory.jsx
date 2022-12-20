import { ChevronDownIcon, ChevronUpIcon, StopCircleIcon } from "@heroicons/react/24/solid";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NoData from "../NoData";

const SyllTheory = ({
    currentTab,
    data,
    dropdown,
    down
}) => {
    return (
        <div>
            {currentTab === 'Theory' && (data.theory.length > 0) ? (data.theory && (<div className="syll-theory">
                    {/* {
                        data.theory.map(t => (
                            <div key={t.unit}>
                                <div className="unit-head" key={t.unit} onClick={() => dropdown(t.unit)}>
                                    <h3>Unit - {t.unit}</h3>
                                    {((down == 0) && ( t.unit == window.clickedUnit))?
                                        <ChevronUpIcon className="drop-icon"/>: <ChevronDownIcon className="drop-icon" />
                                    }
                                </div>
                                {((down == 0) && (t.unit == window.clickedUnit)) && (
                                    <div className="topics">
                                        {
                                            t.topics.map(p => (
                                                <div className="topic-items" key={p}>
                                                    <StopCircleIcon className="drop-icon bullet"/>
                                                    <li>{p}</li>
                                                </div>
                                            ))
                                        }
                                    </div>
                                )}
                            </div>
                        ))
                    } */}
                    {
                        data.theory.map(t => (
                            <Accordion key={t.unit} sx={{color: '#FFFFFF', opacity: '0.8'}} TransitionProps={{ unmountOnExit: true }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                            <Typography sx={{color: 'black', fontFamily: 'K2D', fontSize: '1.25rem'}} component={'span'}><h3>Unit - {t.unit}</h3></Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography sx={{color: 'black', fontFamily: 'K2D'}} component={'span'}>
                                <div className="topics">
                                        {
                                            t.topics.map(p => (
                                                <div className="topic-items" key={p}>
                                                    {/* <StopCircleIcon className="drop-icon bullet"/> */}
                                                    <h4>{p}</h4>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </Typography>
                            </AccordionDetails>
                            </Accordion>
                        ))
                    }
                </div>)) : (currentTab === 'Theory' && (<NoData />))}
        </div>
    );
}
 
export default SyllTheory;