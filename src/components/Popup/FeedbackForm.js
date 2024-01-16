import { Space, Rate, Modal } from 'antd';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import * as React from 'react';
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

export default function FeedbackForm({FeedbackFormOpen, lastOrderId, lastRiderId}){
    const [isModalOpen, setIsModalOpen] = React.useState(FeedbackFormOpen);
    const [value, setValue] = React.useState(3);
    const [feedback, setFeedback] = React.useState("");
    const dispatch = useDispatch();
    //console.log(lastOrderId)
    const handleOk = () => {
        setIsModalOpen(false);
        handleSubmit();
        dispatch({type:'CLEAR'});
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        dispatch({type:'CLEAR'});
    };
    const handleSubmit = async (e) => {
        try{
            let messageBody=JSON.stringify({
                orderID:localStorage.getItem('lastOrderId'),
                riderID:localStorage.getItem('lastRiderId'),
                delivered: true,
                feedback: feedback,
                stars: value
            });
            console.log(messageBody);
      
            let res = await fetch("http://localhost:8080/api/v1/setFeedback", {
                method: "POST",
                body: messageBody,
                mode:'cors',
                    headers:{
                        'Accept': 'application/json, text/plain',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin':'*'
                    }
                });
      
            let resJson = await res.json();
            console.log(messageBody)
        }catch(err){
            console.log(err)
        }
    }
    return (<>
        <Modal title="Please give us a feedback" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

          <form onSubmit={ handleSubmit }>
    
            <div className="row mt-3">
                <div className="col text-left">
                <label htmlFor="first" className="form-label">
                    your feedback
                </label>
                <input
                    id="feedback"
                    name="feedback"
                    value={feedback}
                    className="form-control"  
                    onChange={e => setFeedback(e.target.value)}
                    
                />
                
                </div>
            </div>
            <div className="row mt-3">
                <Space>
                    <Rate tooltips={desc} onChange={setValue} value={value} />
                    {value ? <span>{desc[value - 1]}</span> : ''}
                </Space>
            </div>
            {/* <div className="row mt-3">
                <div className="col text-right actionButtons">
                <Button
                    variant="secondary"
                    size="sm" style={{margin:'5px'}}
                    onClick={
                        handleCancel
                    }
                >
                    Cancel
                </Button>

                <Button
                    variant="primary"
                    size="sm" style={{margin:'5px'}}
                    type='submit'
                    onClick={ handleSubmit }
                >
                    Submit
                </Button>
                </div>
            </div> */}
            </form>
          
        </Modal>
    </>);
}