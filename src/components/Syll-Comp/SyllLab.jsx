import { ChevronDownIcon, ChevronUpIcon, StopCircleIcon } from "@heroicons/react/24/solid";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NoData from "../NoData";

const SyllLab = ({
    currentTab,
    data,
    dropdown,
    down
}) => {
    return (
        <div>
            {currentTab === 'Lab' && (data.lab.length > 0) ? (data.lab && (<div className="syll-lab">
                {/* {
                    data.lab.map(l => (
                        <div key={l.experiment}>
                            <div className="lab-head" key={l.experiment} onClick={() => dropdown(l.experiment)}>
                                <div className="lab-heads">
                                    <h3>Experiment - {l.experiment}</h3>
                                    <h4><span>Objective</span> - {l.aim.objective}</h4>
                                </div>
                                {(l.aim.steps.length > 0 && (down == 0) && (l.experiment == window.clickedUnit)) ?
                                    <ChevronUpIcon className="drop-icon"/>: (l.aim.steps.length > 0 && <ChevronDownIcon className="drop-icon" />)
                                }
                            </div>
                            {((down == 0) && (l.experiment == window.clickedUnit)) && (l.aim.steps.length > 0) && (
                                <div className="steps">
                                    {
                                        l.aim.steps.map(s => (
                                            <div className="step-items" key={s}>
                                                <StopCircleIcon className="drop-icon bullet"/>
                                                <li>{s}</li>
                                            </div>
                                        ))
                                    }
                                </div>
                            )}
                        </div>
                    ))
                } */}
                {
                    data.lab.map(l => (
                        <Accordion key={l.experiment} sx={{color: '#FFFFFF', opacity: '0.8'}} TransitionProps={{ unmountOnExit: true }}>
                            <AccordionSummary
                            expandIcon={l.aim.steps.length > 0 && (<ExpandMoreIcon />)}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            <Typography sx={{color: 'black', fontFamily: 'K2D', fontSize: '1.25rem', textAlign: 'left'}} component={'span'}>
                                <h3>Experiment - {l.experiment}</h3>
                                <p><span>Objective</span> - {l.aim.objective}</p>
                            </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography sx={{color: 'black', fontFamily: 'K2D'}} component={'span'}>
                                <div className="topics">
                                    {
                                        l.aim.steps.map(s => (
                                            <div className="topic-items" key={s}>
                                                <h4>{s}</h4>
                                            </div>
                                        ))
                                    }
                                </div>
                            </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))
                }
            </div>)): (currentTab === 'Lab' && (<NoData />))}
        </div>
    );
}
 
export default SyllLab;