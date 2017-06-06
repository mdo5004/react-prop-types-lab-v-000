import React from 'react';
import PropTypes from 'prop-types';

class Product extends React.Component {
    render(){
        return (
            <div className="product">
                <ul>
                    <li>Name: {this.props.name}</li> 
                    <li>Producer: {this.props.producer}</li> 
                    <li>Watermark: {this.props.hasWatermark ? "Yes" : "None"}</li> 
                    <li>Color: {this.props.color}</li> 
                    <li>Weight: {this.props.weight}</li> 
                </ul>
            </div>

        );
    };
};

let weightCheck = createChainableTypeChecker(weightChecker);
debugger
function createChainableTypeChecker(validate) {
    function checkType(isRequired, props, propName, componentName, location) {
        
        if (props[propName] == null) {
            
            if(isRequired){
                return new Error(
                    ("Required `" + propName + "` was not specified in ") +
                    ("`" + componentName + "`.")
                );
            } else {
                return null;
            }
        } else {
            return validate(props, propName, componentName, location);
        }
    }

    let chainedTypeCheck = checkType.bind(null, false);
    chainedTypeCheck.isRequired = checkType.bind(null, true);

    return chainedTypeCheck;
}



function weightChecker(props, weight, componentName) {
    if (props[weight] < 80 || props[weight] > 300 ) {
        return new Error(
            'Invalid prop `' + weight + '` supplied to' +
            ' `' + componentName + '`. Must be a number between 80 and 300.'
        );
    }
}

Product.propTypes = {
    name: PropTypes.string.isRequired,
    producer: PropTypes.string,
    hasWatermark: PropTypes.bool,
    color: PropTypes.oneOf(['white', 'eggshewll-white', 'salmon']).isRequired,
    weight: weightCheck.isRequired
};

Product.defaultProps = {
    hasWatermark: false
}

export default Product;