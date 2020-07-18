import React, { useRef, useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalWrapperComponent = ( props ) => {

  const [ruleOneField, setRuleOneField] = useState();
  const [valueOneField, setValueOneField] = useState();
  const [operatorOneField, setOperatorOneField] = useState();
  const [ruleTwoField, setRuleTwoField] = useState();
  const [valueTwoField, setValueTwoField] = useState();
  const [operatorTwoField, setOperatorTwoField] = useState();
  const [mainOperatorField, setMainOperatorField] = useState();
  const [isValid, setIsValid] = useState( false );

  useEffect( () => {
    if ( ruleOneField && valueOneField && operatorOneField && ruleTwoField && valueTwoField && mainOperatorField ) {
      setIsValid( true );
    }

  }, [ruleOneField, valueOneField, operatorOneField, ruleTwoField, valueTwoField, mainOperatorField] )

  const ruleOptions = [
    { value: 'Rental Amount', label: 'Rental Amount' },
    { value: 'Customer Age', label: 'Customer Age' }
  ];

  const operatorOptions = [
    { value: '>', label: '>' },
    { value: '<', label: '<' },
    { value: '=', label: '=' },
    { value: '>=', label: '>=' },
    { value: '<=', label: '<=' }
  ];
  const mainOperatorOptions = [
    { value: 'AND', label: 'AND' },
    { value: 'OR', label: 'OR' },
  ]


  const valueOneHandel = ( e ) => {
    setValueOneField( e.target.value );
  }

  const valueTwoHandel = ( e ) => {
    setValueTwoField( e.target.value );
  }

  const ruleOneSelection = ( e ) => {
    setRuleOneField( e.value );
  }
  const ruleTwoSelection = ( e ) => {
    setRuleTwoField( e.value );
  }
  const operatorOneSelection = ( e ) => {
    setOperatorOneField( e.value );
  }
  const operatorTwoSelection = ( e ) => {
    setOperatorTwoField( e.value );
  }
  const mainOperatorSelection = ( e ) => {
    setMainOperatorField( e.value );
  }
  const ruleOneRef = useRef();
  const ruleTwoRef = useRef();
  const operatorOneRef = useRef();
  const operatorTwoRef = useRef();
  const mainOperatorRef = useRef();

  const submitRules = () => {
    if ( isValid ) {
      let payload = {
        "rules": {
          "Rule1": {
            "rule": ruleOneField,
            "operator": operatorOneField,
            "value": valueOneField
          },
          "operator1": mainOperatorField,
          "Rule2": {
            "rule": ruleTwoField,
            "operator": operatorTwoField,
            "value": valueTwoField
          }
        }
      }
      axios.post( '/api/rules', payload )
        .then( ( res ) => {
          props.closeCreateModal();
          props.ruleCreated();
        } );
    } else {

      toast.error( 'Please Define Every Rule!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      } );

    }

  }

  return ( <div className="modal-mask">
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
    <div className="modal-container">
      <div className="modal-header">Set New Rules</div>
      <span className="modal-close" onClick={props.closeCreateModal} >×</span >
      <div style={{ backgroundColor: '#ffffff', height: '100%', width: '100%' }}>

        <div className="flexCreate">
          <div className="createModalFields">
            <p className="ruleHeader">Rule 1</p>
            <Select ref={ruleOneRef} onChange={ruleOneSelection} options={ruleOptions} />
          </div>
          <div className="createModalFields">
            <p className="operatorHeader">Operator 1</p>
            <Select ref={operatorOneRef} options={operatorOptions} onChange={operatorOneSelection} />
          </div>
          <div className="createModalFields">
            <p className="ruleHeader">Value 1</p>
            <input defaultValue={valueOneField} onChange={valueOneHandel} type="text" className="inputText" />
          </div>
        </div>

        <div className="flexCreate" style={{ justifyContent: 'center' }}>
          <div className="createModalFields" style={{ textAlign: 'center' }}>
            <p className="operatorHeader">Rules Combine Operator</p>
            <Select ref={mainOperatorRef} options={mainOperatorOptions} onChange={mainOperatorSelection} />
          </div>
        </div>

        <div className="flexCreate">
          <div className="createModalFields">
            <p className="ruleHeader">Rule 2</p>
            <Select ref={ruleTwoRef} options={ruleOptions} onChange={ruleTwoSelection} />
          </div>
          <div className="createModalFields">
            <p className="operatorHeader">Operator 2</p>
            <Select ref={operatorTwoRef} options={operatorOptions} onChange={operatorTwoSelection} />
          </div>
          <div className="createModalFields">
            <p className="ruleHeader">Value 2</p>
            <input defaultValue={valueTwoField} onChange={valueTwoHandel} type="text" className="inputText" />
          </div>
        </div>
        <div className="flexCreate" style={{ justifyContent: 'center' }}>
          <div className="createModalFields" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <button className="btnCreate" onClick={submitRules}> Create Rule</button>
          </div>
        </div>

      </div>
    </div >
  </div > )
}

export default ModalWrapperComponent;