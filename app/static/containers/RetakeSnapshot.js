import {connect} from 'react-redux'
import {changeApiKey, retakeSnapshot} from '../actions'
import RetakeButton from '../components/retakeButton.jsx'

const mapStateToProps = (state, ownProps) => ({apiKey: state.apiKey})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: (apiKey) => {
        dispatch(retakeSnapshot(apiKey))
    }
})

const RetakeSnapshot = connect(mapStateToProps, mapDispatchToProps)(RetakeButton)

export default RetakeSnapshot
