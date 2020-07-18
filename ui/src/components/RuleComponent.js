import React, { useEffect, useState } from 'react';
import axios from 'axios';



const RuleComponent = ( props ) => {
  const [rules, setRules] = useState( [] );
  useEffect( () => {
    console.log( 'Component mounted' )
    axios.get( '/api/rules' )
      .then( ( res ) => {
        setRules( res.data );
      } )
  }, [] )
  return ( <div>
    {rules.length > 0 &&
      rules.map( ( rule, index ) => {
        return ( <div key={index} className="ruleContainer">
          <h4>Rule number {index + 1}</h4>
          <div className="subRuleContainer">
            <div className="flex">
              <p>{rule.rules.Rule1.rule}</p>
              <p>{rule.rules.Rule1.operator}</p>
              <p>{rule.rules.Rule1.value}</p>
            </div>
            <div className="flex"><p>{rule.rules.operator1}</p></div>
            <div className="flex">
              <p>{rule.rules.Rule2.rule}</p>
              <p>{rule.rules.Rule2.operator}</p>
              <p>{rule.rules.Rule2.value}</p>
            </div>
          </div>
        </div> )
      } )
    }
  </div> )
}

export default RuleComponent;