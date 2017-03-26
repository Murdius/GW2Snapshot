import {connect} from 'react-redux'
import Status from '../components/Status.jsx'

const mapStateToProps = (state, ownProps) => ({apiKey: state.apiKey, status: state.status})

const mapDispatchToProps = (dispatch) => ({})

const StatusContainer = connect(mapStateToProps, mapDispatchToProps)(Status)

export default StatusContainer
