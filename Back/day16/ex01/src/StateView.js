import { useDispatch, useSelector } from 'react-redux';

function StateView(props) {
        const count = useSelector((state)=> {
        return state.count;
    });
    const age = useSelector((state)=> {
        return state.age;
    });
    
    return (
        <>
            <p>count : {count}</p>
            <p>age : {age}</p>
        </>
    )
}

export default StateView;