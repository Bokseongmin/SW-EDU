import { useDispatch, useSelector } from 'react-redux';

function CntCtrl(props) {
    const dispatch = useDispatch();
    const count = useSelector((state)=>{
        return state.count;
    })
    return (
        <>
            <fieldset>
                <h3>Count Controller</h3>
                <p>
                    <input type="text" value={count} onChange={(e)=>{
                        dispatch({type:"changeCnt", count:e.target.value});
                    }} />
                </p>
                <button onClick={()=>{
                    dispatch({type:"conunt증가"});
                }}>증가</button>
                <button onClick={()=>{
                    dispatch({type:"conunt감소"});
                }}>감소</button>
            </fieldset>
        </>
    )
}

export default CntCtrl;