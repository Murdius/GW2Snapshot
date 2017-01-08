import {connect} from 'react-redux'
import {changeApiKey} from '../actions'
import InputField from '../components/InputField.js'

const mapStateToProps = (state, ownProps) => ({apiKey: state.apiKey})

const mapDispatchToProps = (dispatch) => ({
    onChange: (text) => {
        dispatch(changeApiKey(text))
    }
})

const InputFieldContainer = connect(mapStateToProps, mapDispatchToProps)(InputField)

export default InputFieldContainer
