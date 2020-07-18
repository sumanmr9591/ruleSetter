import React, { useEffect, useState } from 'react';
import ModalWrapperComponent from './ModalWrappercomponent'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const RuleComponent = ( props ) => {
  const [rules, setRules] = useState( [] );
  const [createModal, setCreateModal] = useState( false );
  useEffect( () => {
    axios.get( '/api/rules' )
      .then( ( res ) => {
        setRules( res.data );
      } );
  } );
  const getRules = () => {

    toast.info( 'New Rule Created', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    } );
  }

  const deleteRule = ( rule ) => {
    let id = rule._id
    axios.delete( `/api/rules/${ id }` )
      .then( ( rule ) => {
        let temp = rules.filter( ( rule ) => rule._id !== id );
        setRules( temp );
      } )
    toast.error( 'Rule deleted successfully', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    } );
  }


  const closeCreateModal = () => {
    setCreateModal( false );
  }

  return ( <div>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    ></ToastContainer>
    <button className="btn" onClick={() => setCreateModal( true )}>Define Rule</button>
    {
      createModal && <ModalWrapperComponent ruleCreated={getRules} closeCreateModal={closeCreateModal} flag={createModal}>

      </ModalWrapperComponent>
    }
    {rules.length > 0 &&
      rules.map( ( rule, index ) => {
        return ( <div key={index} className="ruleContainer">
          <div style={{ position: 'relative' }}>
            <h4>Rule number {index + 1}</h4>
            <div className="actionContainer">
              <button className="editBtn">Edit</button>
              <div className="horBar"></div>
              <button className="deleteBtn" onClick={() => deleteRule( rule )}>Delete</button>
            </div>
          </div>

          <div className="subRuleContainer">
            <div className="flex">
              <p>{rule.rules.Rule1.rule}</p>
              <p className="operator">{rule.rules.Rule1.operator}</p>
              <p>{rule.rules.Rule1.value}</p>
            </div>
            <div className="flex mainOperator"><p>{rule.rules.operator1}</p></div>
            <div className="flex">
              <p>{rule.rules.Rule2.rule}</p>
              <p className="operator">{rule.rules.Rule2.operator}</p>
              <p>{rule.rules.Rule2.value}</p>
            </div>
          </div>
        </div> )
      } )
    }
  </div> )
}

export default RuleComponent;