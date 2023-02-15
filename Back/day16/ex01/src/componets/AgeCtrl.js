import { useDispatch, useSelector } from 'react-redux';

function AgeCtrl(props) {
    const dispatch = useDispatch();
    const age = useSelector((state)=>{
        return state.age;
    })
    return (
        <>
            <fieldset>
                <h3>age Controller</h3>
                <p>
                    <input type="text" value={age} onChange={(e) => {
                        dispatch({ type: "changeAge", age: e.target.value });
                    }} />
                </p>
                <button onClick={() => {
                    dispatch({ type: "age증가" });
                }}>증가</button>
                <button onClick={() => {
                    dispatch({ type: "age감소" });
                }}>감소</button>
            </fieldset>
        </>
    )
}

export default AgeCtrl;