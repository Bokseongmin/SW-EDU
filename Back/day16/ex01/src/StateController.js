import { useDispatch, useSelector } from 'react-redux';
import AgeCtrl from './componets/AgeCtrl';
import CntCtrl from './componets/CntCtrl';

function StateController(props) {
    const dispatch = useDispatch();
    return (
        <>
            <CntCtrl />
            <AgeCtrl />
        </>
    )
}

export default StateController;