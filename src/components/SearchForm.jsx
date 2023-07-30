import { SendHorizonal } from 'lucide-react';
import { useState } from 'react';
import { Form } from "react-router-dom";
import BranchButton from "./formFields/BranchButton";
import SemButton from "./formFields/SemButton";

const SearchForm = () => {
    const [sem, setSem] = useState('');
    const [semShow, setSemShow] = useState('Semester');
    const [branch, setBranch] = useState('');
    const [branchShow, setBranchShow] = useState('Branch');
    
    return (
        <Form method='post' className="btn-wrapper">
          <input type="hidden" name="semester" value={sem} />
          <input type="hidden" name="branch" value={branch} />
            <SemButton
              sem={sem}
              semShow={semShow}
              setSem={setSem}
              setSemShow={setSemShow}
            />
            <BranchButton
              branch={branch}
              setBranch={setBranch}
              branchShow={branchShow}
              setBranchShow={setBranchShow}
            />
            <button className='send-button' type="submit"><SendHorizonal /></button>
          </Form>
    );
}
 
export default SearchForm;