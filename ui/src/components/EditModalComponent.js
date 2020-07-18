import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditModalComponent = ( props ) => {

  const [ruleOneField, setRuleOneField] = useState();
  const [valueOneField, setValueOneField] = useState( props.currentRule.rules.Rule1.value );
  const [operatorOneField, setOperatorOneField] = useState();
  const [ruleTwoField, setRuleTwoField] = useState();
  const [valueTwoField, setValueTwoField] = useState( props.currentRule.rules.Rule2.value );
  const [operatorTwoField, setOperatorTwoField] = useState();
  const [mainOperatorField, setMainOperatorField] = useState();
  const [isValid, setIsValid] = useState( false );

  useEffect( () => {
    if ( valueOneField !== '' && valueTwoField !== '' ) {
      setIsValid( true );
    }

  }, [valueOneField, valueTwoField] )

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

  // const setDefaultValueRuleOne = () => {
  //   return ruleOptions.filter( ( option ) => {
  //     option.value === props.currentRule.rules.Rule1.value;
  //   } )
  // }

  const submitRules = () => {
    if ( isValid ) {
      let payload = {
        "rules": {
          "Rule1": {
            "rule": ruleOneField ? ruleOneField : props.currentRule.rules.Rule1.rule,
            "operator": operatorOneField ? operatorOneField : props.currentRule.rules.Rule1.operator,
            "value": valueOneField
          },
          "operator1": mainOperatorField ? mainOperatorField : props.currentRule.rules.operator1,
          "Rule2": {
            "rule": ruleTwoField ? ruleTwoField : props.currentRule.rules.Rule2.rule,
            "operator": operatorTwoField ? operatorTwoField : props.currentRule.rules.Rule2.operator,
            "value": valueTwoField
          }
        }
      }
      axios.put( `/api/rules/${ props.currentRule._id }`, payload )
        .then( ( res ) => {
          props.closeEditModal();
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
      <div className="modal-header">Edit Rule</div>
      <span className="modal-close" onClick={props.closeEditModal} >×</span >
      <div style={{ backgroundColor: '#ffffff', height: '100%', width: '100%' }}>

        <div className="flexCreate">
          <div className="createModalFields">
            <p className="ruleHeader">Rule 1</p>
            <Select ref={ruleOneRef}
              defaultValue={
                ruleOptions.filter( rule => rule.value === props.currentRule.rules.Rule1.rule )
                  ? ruleOptions.filter( rule => rule.value === props.currentRule.rules.Rule1.rule ) :
                  'Select Rule'
              }
              onChange={ruleOneSelection} options={ruleOptions} />
          </div>
          <div className="createModalFields">
            <p className="operatorHeader">Operator 1</p>
            <Select
              defaultValue={
                operatorOptions.filter( rule => rule.value === props.currentRule.rules.Rule1.operator )
                  ? operatorOptions.filter( rule => rule.value === props.currentRule.rules.Rule1.operator ) :
                  'Select Operator'
              }
              ref={operatorOneRef} options={operatorOptions} onChange={operatorOneSelection} />
          </div>
          <div className="createModalFields">
            <p className="ruleHeader">Value 1</p>
            <input defaultValue={valueOneField} onChange={valueOneHandel} type="text" className="inputText" />
          </div>
        </div>

        <div className="flexCreate" style={{ justifyContent: 'center' }}>
          <div className="createModalFields" style={{ textAlign: 'center' }}>
            <p className="operatorHeader">Rules Combine Operator</p>
            <Select ref={mainOperatorRef}
              defaultValue={
                mainOperatorOptions.filter( rule => rule.value === props.currentRule.rules.operator1 )
                  ? mainOperatorOptions.filter( rule => rule.value === props.currentRule.rules.operator1 ) :
                  'Select Rule'
              }
              options={mainOperatorOptions} onChange={mainOperatorSelection} />
          </div>
        </div>

        <div className="flexCreate">
          <div className="createModalFields">
            <p className="ruleHeader">Rule 2</p>
            <Select ref={ruleTwoRef}
              defaultValue={
                ruleOptions.filter( rule => rule.value === props.currentRule.rules.Rule2.rule )
                  ? ruleOptions.filter( rule => rule.value === props.currentRule.rules.Rule2.rule ) :
                  'Select Rule'
              }
              options={ruleOptions} onChange={ruleTwoSelection} />
          </div>
          <div className="createModalFields">
            <p className="operatorHeader">Operator 2</p>
            <Select ref={operatorTwoRef}
              defaultValue={
                operatorOptions.filter( rule => rule.value === props.currentRule.rules.Rule2.operator )
                  ? operatorOptions.filter( rule => rule.value === props.currentRule.rules.Rule2.operator ) :
                  'Select Operator'
              }
              options={operatorOptions} onChange={operatorTwoSelection} />
          </div>
          <div className="createModalFields">
            <p className="ruleHeader">Value 2</p>
            <input defaultValue={valueTwoField} onChange={valueTwoHandel} type="text" className="inputText" />
          </div>
        </div>
        <div className="flexCreate" style={{ justifyContent: 'center' }}>
          <div className="createModalFields" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <button className="btnCreate" onClick={submitRules}> Update Rule</button>
          </div>
        </div>

      </div>
    </div >
  </div > )
}
export default EditModalComponent;