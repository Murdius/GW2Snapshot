import React, {PropTypes} from 'react'

const InputField = ({onChange, apiKey}) => (
    <div className="form-group">
        <label className="control-label">
            API Key
        </label>
        <input type="text" autocomplete="on" className="form-control" name="apiKey" id="apiKey" value={apiKey} onChange= {(e)=>onChange(e.target.value)}/>
    </div>
)

InputField.propTypes = {
    onChange: PropTypes.func.isRequired,
    apiKey: PropTypes.string.isRequired
}

export default InputField
